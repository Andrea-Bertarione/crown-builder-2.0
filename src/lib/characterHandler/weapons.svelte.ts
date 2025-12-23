import type {Attack, Weapon} from "$lib/types/attack";
import type {Character} from "$lib/characterHandler/character.svelte";
import type {AbilityKey} from "$lib/types/skills&Saves";

export class WeaponsImp {
    mainHand: Weapon | null = $state(null);
    secondHand: Weapon | null = $state(null);

    private character: Character | null = $state(null);

    weaponsAttacks: Attack[] = $derived.by(() => {
        if (!this.character) return [];
        const attacks: Attack[] = [];

        if (this.mainHand) {
            const abilityMod = this.character.abilityScores[this.mainHand.damageModifier as AbilityKey].modifier;

            // Collect all modifiers on this weapon
            const weaponBonuses = this.mainHand.modifiers?.total ?? 0;
            const profBonus = this.character.weaponsProficiencies.includes(this.mainHand.type) || this.character.weaponsProficiencies.includes(this.mainHand.prototype) ? this.character.proficiencyBonus : 0;

            // Total attack bonus
            const attackBonus = abilityMod + profBonus + weaponBonuses;

            attacks.push({
                id: `attack-${this.mainHand.id}`,
                weapon: this.mainHand,
                attackBonus,
                rollInfo: {
                    dice: '1d20',
                    modifier: attackBonus,
                    label: `${this.mainHand.name}: 1d20 + ${attackBonus}`,
                    breakdown: [
                        { label: `${this.mainHand.damageModifier} modifier`, value: abilityMod },
                        { label: 'Proficiency bonus', value: profBonus },
                        { label: 'Weapon modifiers', value: weaponBonuses }
                    ]
                },
                damageRoll: {
                    dice: this.mainHand.damageDice,
                    modifier: abilityMod,
                    label: `${this.mainHand.damageDice} + ${abilityMod}`,
                    breakdown: [
                        { label: `${this.mainHand.damageModifier} modifier`, value: abilityMod }
                    ]
                }
            });
        }

        if (this.secondHand) {
            const abilityMod = this.character.abilityScores[this.secondHand.damageModifier as AbilityKey].modifier;

            // Collect all modifiers on this weapon
            const weaponBonuses = this.secondHand.modifiers?.total ?? 0;
            const profBonus = this.character.weaponsProficiencies.includes(this.secondHand.type) || this.character.weaponsProficiencies.includes(this.secondHand.prototype) ? this.character.proficiencyBonus : 0;

            // Total attack bonus
            const attackBonus = abilityMod + profBonus + weaponBonuses;

            attacks.push({
                id: `attack-${this.secondHand.id}`,
                weapon: this.secondHand,
                attackBonus,
                rollInfo: {
                    dice: '1d20',
                    modifier: attackBonus,
                    label: `${this.secondHand.name}: 1d20 + ${attackBonus}`,
                    breakdown: [
                        { label: `${this.secondHand.damageModifier} modifier`, value: abilityMod },
                        { label: 'Proficiency bonus', value: profBonus },
                        { label: 'Weapon modifiers', value: weaponBonuses }
                    ]
                },
                damageRoll: {
                    dice: this.secondHand.damageDice,
                    modifier: this.character.features.some(v => v.id === "dual_wielder") ? abilityMod : 0,
                    label: `${this.secondHand.damageDice} + ${this.character.features.some(v => v.id === "dual_wielder") ? abilityMod : 0}`,
                    breakdown: [
                        { label: `${this.secondHand.damageModifier} modifier`, value: this.character.features.some(v => v.id === "dual_wielder") ? abilityMod : 0 }
                    ]
                }
            });
        }

        return attacks
    })

    constructor(character: Character) {
        this.character = character;
    }

    // Helper: Equip weapon
    equipWeapon(weapon: Weapon, hand: "mainHand" | "secondHand"): void {
        if (!this.character) return console.warn('Cannot equip weapon: character not set');
        if (!this.character.weapons.some(a => a.id === weapon.id)) { return console.warn(`Cannot equip ${weapon.name}: not in character's weapons list`);}
        if (weapon.properties.includes("two_handed") && this.character.armorClass.shield) { this.character.armorClass.removeShield() }
        if (weapon.properties.includes("two_handed") && this.secondHand) { this.removeWeapon("secondHand")}

        this[hand] = weapon;
    }

    // Helper: Remove weapon
    removeWeapon(hand: "mainHand" | "secondHand"): void {
        this[hand] = null;
    }
}