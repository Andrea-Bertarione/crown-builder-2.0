import type { ArmorClass, Armor } from '$lib/types/armor';
import { ModifierCollection } from '$lib/characterHandler/modifiers.svelte';

export class ArmorClassImpl implements ArmorClass {
    armor = $state<Armor | null>(null);
    shield = $state<Armor | null>(null);
    customModifiers: ModifierCollection;

    // Reference to character for DEX modifier
    private character: any;

    constructor(character: any, baseAC: number = 10) {
        this.character = character;
        this.customModifiers = new ModifierCollection();

        // Initialize with default armor (no armor = 10 + DEX)
        this.armor = {
            id: 'unarmored',
            name: 'Unarmored',
            type: 'none',
            baseAC: baseAC,
            allowsDexBonus: true,
            modifiers: new ModifierCollection()
        };
    }

    get value(): number {
        let ac = 0;

        if (this.armor) {
            // Start with armor's base AC
            ac = this.armor.baseAC;

            // Add DEX modifier (if allowed and not capped)
            if (this.armor.allowsDexBonus) {
                const dexModifier = this.character.abilityScores.dexterity.modifier;

                if (this.armor.maxDexBonus !== undefined) {
                    // Medium armor: cap DEX bonus
                    ac += Math.min(dexModifier, this.armor.maxDexBonus);
                } else {
                    // Light armor or unarmored: full DEX bonus
                    ac += dexModifier;
                }
            }

            // Add armor modifiers (magic armor, etc.)
            ac += this.armor.modifiers.total;
        } else {
            // No armor equipped - shouldn't happen but fallback to 10
            ac = 10 + this.character.abilityScores.dexterity.modifier;
        }

        // Add shield AC
        if (this.shield) {
            ac += this.shield.baseAC;
            ac += this.shield.modifiers.total;
        }

        // Add custom AC modifiers (Dodge, Blessing, Ring of Protection, etc.)
        ac += this.customModifiers.total;

        return ac;
    }

    getBreakdown(): { label: string; value: number }[] {
        const breakdown: { label: string; value: number }[] = [];

        if (this.armor) {
            breakdown.push({
                label: this.armor.name,
                value: this.armor.baseAC
            });

            // DEX bonus
            if (this.armor.allowsDexBonus) {
                const dexModifier = this.character.abilityScores.dexterity.modifier;

                if (this.armor.maxDexBonus !== undefined) {
                    const cappedDex = Math.min(dexModifier, this.armor.maxDexBonus);
                    breakdown.push({
                        label: `DEX Modifier (capped +${this.armor.maxDexBonus})`,
                        value: cappedDex
                    });
                } else {
                    breakdown.push({
                        label: 'DEX Modifier',
                        value: dexModifier
                    });
                }
            }

            // Armor modifiers
            for (const mod of this.armor.modifiers.active) {
                breakdown.push({
                    label: mod.label,
                    value: mod.value
                });
            }
        }

        // Shield
        if (this.shield) {
            breakdown.push({
                label: `${this.shield.name}`,
                value: this.shield.baseAC
            });

            for (const mod of this.shield.modifiers.active) {
                breakdown.push({
                    label: mod.label,
                    value: mod.value
                });
            }
        }

        // Custom modifiers
        for (const mod of this.customModifiers.active) {
            breakdown.push({
                label: mod.label,
                value: mod.value
            });
        }

        return breakdown;
    }

    // Helper: Equip armor
    equipArmor(armor: Armor): void {
        this.armor = armor;
    }

    // Helper: Equip shield
    equipShield(shield: Armor): void {
        this.shield = shield;
    }

    // Helper: Remove armor
    removeArmor(): void {
        this.armor = null;
    }

    // Helper: Remove shield
    removeShield(): void {
        this.shield = null;
    }
}