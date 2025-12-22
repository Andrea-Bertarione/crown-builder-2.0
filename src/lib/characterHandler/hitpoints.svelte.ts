import type { HitPoints } from '$lib/types/health';
import type {DamageType} from "$lib/types/damage";

export class HitPointsImpl implements HitPoints {
    current = $state(0);
    temporary = $state(0);
    isConscious = $state(true);

    deathSaveSuccesses = $state(0);
    deathSaveFailures = $state(0);

    // One entry per character level, including level 1
    hitDiceRolls = $state<number[]>([]);

    private character: any;

    constructor(character: any) {
        this.character = character;

        // Initialize hit dice array up to current level if empty
        if (this.hitDiceRolls.length === 0 && this.character.level > 0) {
            this.initializeHitDice();
        }

        // Start at max HP
        this.current = this.maximum;
    }

    // Hit die size from class, default d6
    private get hitDieSize(): number {
        return this.character.class?.hitDieSize ?? 6;
    }

    // Level 1: max die; later levels: store each rolled/assigned value in hitDiceRolls
    private initializeHitDice(): void {
        const level = this.character.level;
        if (level <= 0) return;

        // Level 1: max value of hit die
        this.hitDiceRolls.push(this.hitDieSize);

        // Higher levels: default to average (optional rule) — you can replace with actual rolls
        const average = Math.ceil(this.hitDieSize / 2); // e.g. d10 => 5
        for (let i = 2; i <= level; i++) {
            this.hitDiceRolls.push(average);
        }
    }

    // Call this when the character gains a level
    addLevelHitDie(roll: number | null = null): void {
        const dieSize = this.hitDieSize;
        const value = roll ?? Math.ceil(dieSize / 2); // average if no roll provided
        this.hitDiceRolls.push(value);
        // current and maximum both increase by (value + CON mod)
        this.current += value + this.character.abilityScores.constitution.modifier;
    }

    get maximum(): number {
        const conMod = this.character.abilityScores.constitution.modifier;
        const levels = this.hitDiceRolls.length;

        if (levels === 0) return 0;

        // Sum of all hit dice rolls
        const baseFromDice = this.hitDiceRolls.reduce((sum, v) => sum + v, 0);

        // Add CON per level
        return baseFromDice + (conMod * levels);
    }

    // --- rest of your existing methods (unchanged) ---

    get isStable(): boolean {
        if (this.isConscious) return true;
        if (this.current > 0) return true;
        return this.deathSaveFailures < 3;
    }

    get isDead(): boolean {
        return this.current === 0 && this.deathSaveFailures >= 3;
    }

    takeDamage(amount: number, damageType: DamageType, source?: string): void {
        let finalDamage = amount;

        // Check for resistances from features
        const resistances = this.character.features
            .flatMap((f: any) => f.passiveEffects?.flatMap((e: any) => e.affects?.resistances) ?? [])
            .filter((r: any) => r.damageType === damageType);

        const hasResistance = resistances.some((r: any) => r.resistanceType === 'resistance');
        const hasImmunity = resistances.some((r: any) => r.resistanceType === 'immunity');
        const hasVulnerability = resistances.some((r: any) => r.resistanceType === 'vulnerability');

        if (hasImmunity) {
            finalDamage = 0;
        } else {
            if (hasResistance) finalDamage = Math.floor(finalDamage / 2);
            if (hasVulnerability) finalDamage = finalDamage * 2;
        }

        // Apply damage to temporary HP first
        if (this.temporary > 0) {
            const tempDamage = Math.min(this.temporary, finalDamage);
            this.temporary -= tempDamage;
            finalDamage -= tempDamage;
        }

        // Apply remaining damage to current HP
        this.current = Math.max(0, this.current - finalDamage);

        // Check death saves if dropped to 0
        if (this.current === 0) {
            this.isConscious = false;
        }
    }

    heal(amount: number): void {
        this.current = Math.min(this.maximum, this.current + amount);
        if (this.current > 0) {
            this.isConscious = true;
            this.deathSaveSuccesses = 0;
            this.deathSaveFailures = 0;
        }
    }

    addTemporaryHP(amount: number): void {
        this.temporary = Math.max(this.temporary, amount);
    }

    resetHealth(): void {
        this.current = this.maximum;
        this.temporary = 0;
        this.isConscious = true;
        this.deathSaveSuccesses = 0;
        this.deathSaveFailures = 0;
    }
}
