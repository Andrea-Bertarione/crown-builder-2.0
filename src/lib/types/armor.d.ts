type ArmorType = 'light' | 'medium' | 'heavy' | 'shield' | 'none';

interface Armor {
    id: string;
    name: string;
    type: ArmorType;
    baseAC: number;

    // Does armor allow DEX bonus?
    allowsDexBonus: boolean;
    maxDexBonus?: number;  // Medium armor cap

    // Modifiers from magic armor, etc.
    modifiers: ModifierCollection;
}

interface ArmorClass {
    armor: $state.raw<Armor | null>;
    shield: $state.raw<Armor | null>;

    // Can add custom AC modifiers (Unarmored Defense, Dodge, etc.)
    customModifiers: ModifierCollection;

    // Computed AC
    get value(): number; // $derived: baseAC + dex (capped) + shield + modifiers

    // For UI: show what's being added
    getBreakdown(): { label: string; value: number }[]; // $derived

    equipArmor(armor: Armor): void;

    // Helper: Equip shield
    equipShield(shield: Armor): void;

    // Helper: Remove armor
    removeArmor(): void;

    // Helper: Remove shield
    removeShield(): void;
}

export { Armor, ArmorType, ArmorClass };