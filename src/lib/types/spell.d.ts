type SpellLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type SpellSchool = 'abjuration' | 'conjuration' | 'divination' | 'enchantment' | 'evocation' | 'illusion' | 'necromancy' | 'transmutation';

interface Spell {
    id: string;
    name: string;
    level: SpellLevel;
    school: SpellSchool;
    description: string;

    // Can this character cast it?
    isPrepared: $state.raw<boolean>;
    canCast: $state.raw<boolean>;  // Enough spell slots?

    // Spell attack or save?
    saveDC?: $state.raw<number>;  // $derived from spellcasting ability + modifiers
    attackBonus?: number;         // $derived

    // Damage if applicable
    damageRoll?: string;           // e.g., "3d6", scales with level
    damageType?: DamageType;
}

interface SpellSlots {
    level: SpellLevel;
    current: $state.raw<number>;
    maximum: number;

    cast(): void;     // Consume a slot
    restore(): void;  // On long rest
}

interface Spellcasting {
    ability: AbilityKey;           // Intelligence, Wisdom, or Charisma

    // Spell DC and attack bonus computed from ability + modifiers
    get saveDC(): number;          // $derived: 8 + ability mod + spellcasting modifiers
    get attackBonus(): number;     // $derived: ability mod + proficiency (if any) + spellcasting modifiers

    slots: SpellSlots[];           // One for each spell level
    spells: Spell[];

    // Which spells are prepared?
    get preparedSpells(): Spell[]; // $derived

    // Can character cast a spell?
    canCast(spell: Spell): boolean; // $derived: prepared and has slots
}

export { Spell, SpellLevel, SpellSchool, Spellcasting };