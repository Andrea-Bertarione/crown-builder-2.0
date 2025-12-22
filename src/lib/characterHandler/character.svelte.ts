import type {CharacterType, Race, Class, Background, Subclass} from "$lib/types/character";
import { v4 } from 'uuid';
import type {Armor, ArmorClass} from "$lib/types/armor";
import type {AbilityKey, SavingThrow, Skill} from "$lib/types/skills&Saves";
import type {Weapon} from "$lib/types/attack";
import type {Action, Reaction} from "$lib/types/action";
import type {Spellcasting} from "$lib/types/spell";
import type {Feature} from "$lib/types/feature";

import {ConditionTrackerImpl} from "$lib/characterHandler/condition.svelte";
import {AbilityScore} from "$lib/characterHandler/abilityScore.svelte";
import {HitPointsImpl} from "$lib/characterHandler/hitpoints.svelte";
import {ArmorClassImpl} from "$lib/characterHandler/armorClass.svelte";

export class Character implements CharacterType {
    // Basic info
    id = v4();
    name = $state("");
    playerName = $state("");
    level = $state(1);
    experience = $state(0);

    // D&D data
    race: Race | null = $state(null);
    subrace: Race | null = $state(null);
    class: Class | null = $state(null);
    subclass: Subclass | null = $state(null);
    background: Background | null = $state(null);
    alignment = $state("neutral");
    spellcasting: Spellcasting | null  = $state(null);

    // Extra informations
    subclassShouldBeChosenAtThisLevel = $derived(this.class?.subclassLevel === this.level);
    raceHasSubraces = $derived(this.race?.subraces !== null && (this.race?.subraces?.length || 0) > 0);
    hasSpellcasting = $derived(this.spellcasting !== null);

    // Core stats
    abilityScores: Record<AbilityKey, AbilityScore> = $state.raw({
        strength: new AbilityScore(10),
        dexterity: new AbilityScore(10),
        constitution: new AbilityScore(10),
        intelligence: new AbilityScore(10),
        wisdom: new AbilityScore(10),
        charisma: new AbilityScore(10)
    });
    asiBonuses: {
        ability: AbilityKey;
        value: number;
    }[] = $state([]);

    proficiencyBonus = $derived(Math.floor((this.level - 1) / 4) + 2);

    // Health
    hitPoints = new HitPointsImpl(this);

    // AC
    armorClass: ArmorClass = new ArmorClassImpl(this);

    // Skills and saves
    skills: Skill[] = $state([]);
    savingThrows: SavingThrow[] = $state([]);

    // Combat
    weapons: Weapon[] = $state([]);
    armor: Armor[] = $state([]);
    shields: Armor[] = $state([]);
    actions: Action[] = $state([]);
    reactions: Reaction[] = $state([]);

    // Status
    conditions = new ConditionTrackerImpl();

    // Features applied to character (race, class, feats, etc.)
    features: Feature[] = $state([]);

    // Initiative
    initiativeModifier = $derived.by(() => {
        const dexMod = this.abilityScores.dexterity.modifier;

        // Collect initiative modifiers from features
        const featureModifiers = this.features
            .flatMap(f => f.modifiers?.initiative ?? [])
            .filter(m => m.active)
            .reduce((sum, mod) => sum + mod.value, 0);

        return dexMod + featureModifiers;
    });

    // Adding features dynamically
    applyFeature(feature: Feature): void {
        this.features.push(feature);

        // If feature modifies ability scores, update them
        if (feature.modifiers?.abilityScores) {
            Object.entries(feature.modifiers.abilityScores).forEach(([ability, bonus]) => {
                const ability_key = ability as AbilityKey;
                const currentScore = this.abilityScores[ability_key].score;
                this.abilityScores[ability_key].score = currentScore + (bonus as number);
            });
        }

        // If feature has actions, add them
        if (feature.actions) {
            this.actions.push(...feature.actions);
        }

        // If feature has reactions, add them
        if (feature.reactions) {
            this.reactions.push(...feature.reactions);
        }
    }
    removeFeature(featureId: string) {
        this.features = this.features.filter(f => f.id !== featureId);
    }

    // Getting attacks available now
    availableAttacks = $derived.by(() => {
        if (!this.weapons.length) return [];

        return this.weapons.map(weapon => {
            // Get ability modifier for this weapon
            const abilityMod = this.abilityScores[weapon.damageModifier as AbilityKey].modifier;

            // Collect all modifiers on this weapon
            const weaponBonuses = weapon.modifiers?.total ?? 0;
            const profBonus = weapon.isProficient ? this.proficiencyBonus : 0;

            // Total attack bonus
            const attackBonus = abilityMod + profBonus + weaponBonuses;

            return {
                id: `attack-${weapon.id}`,
                weapon,
                attackBonus,
                rollInfo: {
                    dice: '1d20',
                    modifier: attackBonus,
                    label: `${weapon.name}: 1d20 + ${attackBonus}`,
                    breakdown: [
                        { label: `${weapon.damageModifier} modifier`, value: abilityMod },
                        { label: 'Proficiency bonus', value: profBonus },
                        { label: 'Weapon modifiers', value: weaponBonuses }
                    ]
                },
                damageRoll: {
                    dice: weapon.damageDice,
                    modifier: abilityMod,
                    label: `${weapon.damageDice} + ${abilityMod}`,
                    breakdown: [
                        { label: `${weapon.damageModifier} modifier`, value: abilityMod }
                    ]
                }
            };
        });
    });

    // Track action economy this turn
    actionSpent = $state(false);
    bonusActionSpent = $state(false);
    reactionSpent = $state(false);
    movement = $state(0);
    maxMovement = $derived(30); // Varies by race/class

    // Reset on turn start
    resetTurn() {
        this.actionSpent = false;
        this.bonusActionSpent = false;
        this.reactionSpent = false;
        this.movement = 0;
    }

    // Now availableActions can check this
    availableActions = $derived.by(() => {
        return this.actions.filter(a => {
            if (a.timing === 'action' && this.actionSpent) return false;
            if (a.timing === 'bonus_action' && this.bonusActionSpent) return false;
            return !(a.timing === 'reaction' && this.reactionSpent);

        });
    });

    debugLog(): void {
        console.group(`%c⚔️ CHARACTER: ${this.name || 'Unnamed'}`, 'color: #00d4ff; font-size: 16px; font-weight: bold;');

        // Basic Info
        console.group('%c📋 Basic Information', 'color: #ffa500; font-weight: bold;');
        console.log(`Name: ${this.name || '(no name)'} | Player: ${this.playerName || '(no player)'}`);
        console.log(`Level: ${this.level} | Experience: ${this.experience}`);
        console.log(`ID: ${this.id}`);
        console.log(`Alignment: ${this.alignment}`);
        console.groupEnd();

        // D&D Profile
        console.group('%c🐉 D&D Profile', 'color: #ff6b6b; font-weight: bold;');
        console.log(`Race: ${this.race?.name ?? '(not selected)'}${this.subrace ? ` → ${this.subrace.name}` : ''}`);
        console.log(`Class: ${this.class?.name ?? '(not selected)'}${this.subclass ? ` → ${this.subclass.name}` : ''}`);
        console.log(`Background: ${this.background?.name ?? '(not selected)'}`);
        console.groupEnd();

        // Ability Scores
        console.group('%c💪 Ability Scores', 'color: #51cf66; font-weight: bold;');
        Object.entries(this.abilityScores).forEach(([ability, score]) => {
            const mod = score.modifier > 0 ? `+${score.modifier}` : score.modifier;
            console.log(`${ability.toUpperCase().padEnd(11)} ${String(score.score).padEnd(2)} (${mod})`);
        });
        console.log(`Proficiency Bonus: +${this.proficiencyBonus}`);
        console.groupEnd();

        // Health
        console.group('%c❤️ Health & Status', 'color: #ff1744; font-weight: bold;');
        const hpPercent = Math.round((this.hitPoints.current / this.hitPoints.maximum) * 100);
        console.log(`HP: ${this.hitPoints.current}/${this.hitPoints.maximum} (${hpPercent}%)${this.hitPoints.temporary ? ` + ${this.hitPoints.temporary} temp` : ''}`);
        console.log(`Status: ${
            this.hitPoints.isDead ? '💀 DEAD' :
                !this.hitPoints.isConscious ? '😴 UNCONSCIOUS' :
                    this.hitPoints.isStable ? '✓ Stable' :
                        '✓ Conscious'
        }`);
        console.groupEnd();

        // AC & Defense
        console.group('%c🛡️ Armor & Defense', 'color: #9c27b0; font-weight: bold;');
        console.log(`AC: ${this.armorClass.value}`);
        console.groupEnd();

        // Skills & Saves
        if (this.skills.length > 0) {
            console.group('%c📊 Skills', 'color: #00bcd4; font-weight: bold;');
            this.skills.forEach(skill => {
                const bonus = skill.isProficient ? `+${skill.modifier + this.proficiencyBonus}*` : `+${skill.modifier}`;
                console.log(`${skill.name.padEnd(16)} ${bonus}`);
            });
            console.groupEnd();
        }

        if (this.savingThrows.length > 0) {
            console.group('%c🛡️ Saving Throws', 'color: #ff9800; font-weight: bold;');
            this.savingThrows.forEach(save => {
                const bonus = save.isProficient ? `+${save.modifier + this.proficiencyBonus}*` : `+${save.modifier}`;
                console.log(`${save.ability.padEnd(11)} ${bonus}`);
            });
            console.groupEnd();
        }

        // Combat
        console.group('%c⚔️ Combat', 'color: #ff6f00; font-weight: bold;');
        console.log(`Initiative: ${this.initiativeModifier > 0 ? '+' : ''}${this.initiativeModifier}`);

        if (this.weapons.length > 0) {
            console.group('Weapons:');
            this.availableAttacks.forEach(attack => {
                console.log(`${attack.weapon.name}: ${attack.rollInfo.label}`);
                if (attack.rollInfo.breakdown) {
                    attack.rollInfo.breakdown.forEach(bd => {
                        console.log(`  • ${bd.label}: ${bd.value}`);
                    });
                }
            });
            console.groupEnd();
        }

        if (this.armor.length > 0) {
            console.log(`Armor: ${this.armor.map(a => a.name).join(', ')}`);
        }

        if (this.shields.length > 0) {
            console.log(`Shields: ${this.shields.map(s => s.name).join(', ')}`);
        }

        console.groupEnd();

        // Action Economy
        console.group('%c🎯 Action Economy', 'color: #2196f3; font-weight: bold;');
        console.log(`Action:       ${this.actionSpent ? '❌ Spent' : '✅ Available'}`);
        console.log(`Bonus Action: ${this.bonusActionSpent ? '❌ Spent' : '✅ Available'}`);
        console.log(`Reaction:     ${this.reactionSpent ? '❌ Spent' : '✅ Available'}`);
        console.log(`Movement:     ${this.movement}/${this.maxMovement} ft`);
        console.groupEnd();

        // Actions & Reactions
        if (this.actions.length > 0) {
            console.group('%c🔧 Actions', 'color: #4caf50; font-weight: bold;');
            this.actions.forEach(a => {
                console.log(`${a.name} (${a.timing})`);
            });
            console.groupEnd();
        }

        if (this.reactions.length > 0) {
            console.group('%c⚡ Reactions', 'color: #4caf50; font-weight: bold;');
            this.reactions.forEach(r => {
                console.log(`${r.name}: ${r.description ?? '(no description)'}`);
            });
            console.groupEnd();
        }

        // Features
        if (this.features.length > 0) {
            console.group('%c✨ Features', 'color: #ffd700; font-weight: bold;');
            this.features.forEach(f => {
                console.log(`${f.name}: ${f.description ?? '(no description)'}`);
            });
            console.groupEnd();
        }

        // Conditions
        if (this.conditions.active.length > 0) {
            console.group('%c⚠️ Active Conditions', 'color: #ff5722; font-weight: bold;');
            this.conditions.active.forEach(c => {
                console.log(`${c.name}${c.duration ? ` (${c.duration} rounds)` : ' (indefinite)'}`);
            });
            console.groupEnd();
        }

        // Spellcasting
        if (this.spellcasting) {
            console.group('%c📚 Spellcasting', 'color: #673ab7; font-weight: bold;');
            console.log(`Ability: ${this.spellcasting.ability}`);
            console.log(`Spell Save DC: ${this.spellcasting.saveDC}`);
            console.log(`Spell Attack Bonus: ${this.spellcasting.attackBonus}`);
            console.groupEnd();
        }

        console.groupEnd();
    }
}