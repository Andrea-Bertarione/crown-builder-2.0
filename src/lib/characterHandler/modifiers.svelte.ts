// ✅ ADD THIS
import type {Modifier} from "$lib/types/modifier";

class ModifierCollection {
    modifiers: Modifier[] = $state([]);

    addModifier(mod: Modifier): void {
        this.modifiers.push(mod);
    }

    removeModifier(id: string): void {
        this.modifiers = this.modifiers.filter(m => m.id !== id);
    }

    get total(): number {
        return this.modifiers
            .filter(m => m.active)
            .reduce((sum, m) => sum + m.value, 0);
    }

    get active(): Modifier[] {
        return this.modifiers.filter(m => m.active);
    }

    getBreakdown() {
        return this.active.map(m => ({
            label: m.label,
            value: m.value
        }));
    }
}

export { ModifierCollection };