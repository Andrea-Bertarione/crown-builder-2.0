import type {Condition, ConditionName, ConditionTracker} from "$lib/types/condition";

export class ConditionTrackerImpl implements ConditionTracker {
    conditions: Condition[];

    constructor() {
        this.conditions = $state([]);
    }

    addCondition(cond: Condition): void {
        this.conditions.push(cond);
    }

    removeCondition(name: ConditionName): void {
        this.conditions = this.conditions.filter(c => c.name !== name);
    }

    hasCondition(name: ConditionName) {
        return this.conditions.some(c => c.name === name);
    }

    tick(): void {
        this.conditions = this.conditions.map(c => c ? {...c, duration: c.duration - 1} : c);
    }

    get active() {
        return this.conditions.filter(c => {
            // Filter expired conditions
            if (typeof c.duration === 'number' && Date.now() > c.appliedAt + (c.duration * 1000)) {
                return false;
            }
            return true;
        });
    }
}
