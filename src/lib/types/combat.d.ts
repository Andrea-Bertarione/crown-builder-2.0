// Incoming attack
interface IncomingAttack {
    attacker: Character;
    attack: Attack;
    attackRoll: $state.raw<number>;      // The d20 roll result
    isCritical: $state.raw<boolean>;     // $derived: attackRoll === 20
    hits: $derived<boolean>;             // attackRoll >= myAC
}

// Being damaged
interface IncomingDamage {
    source: string;
    damageRolls: DamageRollResult[];      // Multiple damage rolls (e.g., weapon + sneak attack)

    // Character calculates final damage based on resistances
    get totalDamage(): number;            // $derived: sum of all rolls with resistances applied

    // Reactions available in response
    get availableReactions(): Reaction[]; // $derived: reactions that trigger on taking damage
}

interface DamageRollResult {
    amount: number;
    type: DamageType;
    breakdown: { label: string; value: number }[];
}

export {IncomingAttack, IncomingDamage, DamageRollResult}