type ActionType = 'attack' | 'spell' | 'ability' | 'movement';
type ActionTiming = 'action' | 'bonus_action' | 'reaction' | 'movement' | 'free';

interface Action {
    id: string;
    name: string;
    description: string;
    type: ActionType;
    timing: ActionTiming;

    // What happens when used?
    effect: {
        rolls?: RollEffect[];
        damageRolls?: DamageRollEffect[];
        conditions?: ConditionEffect[];
    };

    // Can the character use this right now?
    isAvailable: $state.raw<boolean>; // $derived: has action points, not used yet, etc.
}

interface RollEffect {
    rollType: 'attack' | 'save' | 'skill_check';
    description: string;
}

interface DamageRollEffect {
    damageRoll: string;
    damageType: DamageType;
    scaling?: 'spell_level' | 'character_level' | 'none';
}

interface ConditionEffect {
    condition: Condition;
    duration: number | 'until_dispelled';
}

// Reactions are Actions with an additional trigger
interface Reaction extends Action {
    trigger: string;  // "When a creature you can see moves...", "When you're hit by an attack..."
}

export { Action, ActionType, ActionTiming, RollEffect, DamageRollEffect, ConditionEffect, Reaction };