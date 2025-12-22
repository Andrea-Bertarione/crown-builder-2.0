type ConditionName =
    | 'blinded'
    | 'charmed'
    | 'deafened'
    | 'fatigued'
    | 'frightened'
    | 'grappled'
    | 'incapacitated'
    | 'invisible'
    | 'paralyzed'
    | 'petrified'
    | 'poisoned'
    | 'prone'
    | 'restrained'
    | 'stunned'
    | 'unconscious'
    | 'exhaustion';

interface Condition {
    name: ConditionName;
    duration: $state.raw<number | 'permanent'>;  // rounds, or permanent
    appliedAt: $state.raw<number>;               // Timestamp
    source?: string;                             // Who applied it

    // Effects of this condition
    effects: ConditionEffect[];
}

// Track active conditions
interface ConditionTracker {
    conditions: $state.raw<Condition[]>;

    addCondition(cond: Condition): void;
    removeCondition(id: string): void;

    // Is character affected by this condition?
    hasCondition(name: ConditionName): $derived<boolean>;

    // All active conditions
    get active(): Condition[]; // $derived
}

export { Condition, ConditionName, ConditionTracker };