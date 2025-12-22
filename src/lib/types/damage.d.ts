type DamageType =
    | 'bludgeoning'
    | 'piercing'
    | 'slashing'
    | 'fire'
    | 'cold'
    | 'lightning'
    | 'thunder'
    | 'acid'
    | 'poison'
    | 'psychic'
    | 'radiant'
    | 'necrotic'
    | 'force';

interface DamageResistance {
    damageType: DamageType;
    resistanceType: 'resistance' | 'immunity' | 'vulnerability';  // immunity = 0x damage, vulnerability = 2x
}

// For tracking damage taken
interface DamageInstance {
    amount: number;
    type: DamageType;
    source: string;  // Who/what dealt it
}

// How damage is reduced/increased by resistances
interface DamageCalculation {
    original: number;
    resistances: DamageResistance[];

    // Computed final damage
    get final(): number; // $derived: apply resistances/immunities/vulnerabilities

    // For UI: show the breakdown
    getBreakdown(): string; // e.g., "12 fire damage (no resistance) = 12"
}

export { DamageType, DamageResistance, DamageInstance, DamageCalculation };