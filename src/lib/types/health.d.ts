interface HitPoints {
    current: $state.raw<number>;
    maximum: number;
    temporary: $state.raw<number>;  // Temporary HP

    // Damage application
    takeDamage(amount: number, damageType: DamageType, source?: string): void;
    heal(amount: number): void;
    addTemporaryHP(amount: number): void;

    // State
    get isStable(): boolean;      // $derived: conscious or stabilized
    get isConscious(): boolean;   // $derived
    get isDead(): boolean;        // $derived: at 0 HP for too long

    // Death saves tracking
    deathSaveSuccesses: $state.raw<number>;
    deathSaveFailures: $state.raw<number>;
}

export { HitPoints };