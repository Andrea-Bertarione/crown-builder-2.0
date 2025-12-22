import type {AbilityWithModifier} from "$lib/types/abilityScore";
import type {Character} from "$lib/characterHandler/character.svelte";
import type {AbilityKey} from "$lib/types/skills&Saves";

const ABILITIES: AbilityKey[] = [
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'wisdom',
    'charisma'
];

// @ts-ignore
export class AbilityScore implements AbilityWithModifier {
    score = $state(10);

    get modifier(): number {
        return Math.floor((this.score - 10) / 2);
    }

    constructor(baseScore: number = 10) {
        this.score = baseScore;
    }
}

function getRaceModifier(character: Character, ability: AbilityKey): number {
    const race = character.race;
    if (!race) return 0;

    const fixed = race.abilityScoreBonuses?.[ability] ?? 0;

    // e.g. race.chosenAbilityBonuses: { ability: AbilityKey; value: number }[]
    const choices = race.chosenAbilityModifier ?? [];
    const choiceBonus = choices
        .filter(c => c.ability === ability)
        .reduce((sum, c) => sum + c.value, 0);

    return fixed + choiceBonus;
}

function getSubraceModifier(character: Character, ability: AbilityKey): number {
    const subrace = character.subrace;
    if (!subrace) return 0;

    const fixed = subrace.abilityScoreBonuses?.[ability] ?? 0;
    const choices = subrace.chosenAbilityModifier ?? [];
    const choiceBonus = choices
        .filter(c => c.ability === ability)
        .reduce((sum, c) => sum + c.value, 0);

    return fixed + choiceBonus;
}

function getAsiModifier(character: Character, ability: AbilityKey): number {
    // e.g. character.asiBonuses: { ability: AbilityKey; value: number }[]
    const asi = character.asiBonuses ?? [];
    return asi
        .filter(b => b.ability === ability)
        .reduce((sum, b) => sum + b.value, 0);
}

// Main computed map
export function createComputedAbilities(character: Character) {
    const computed = $derived.by(() => {
        return ABILITIES.reduce((acc, ability) => {
            const base = character.abilityScores[ability].score;
            const race = getRaceModifier(character, ability);
            const subrace = getSubraceModifier(character, ability);
            const asi = getAsiModifier(character, ability);

            const total = base + race + subrace + asi;
            const modifier = Math.floor((total - 10) / 2);

            acc[ability] = {
                base,
                race,
                subrace,
                asi,
                total,
                modifier
            };

            return acc;
        }, {} as Record<AbilityKey, {
            base: number;
            race: number;
            subrace: number;
            asi: number;
            total: number;
            modifier: number;
        }>);
    });

    return computed;
}
