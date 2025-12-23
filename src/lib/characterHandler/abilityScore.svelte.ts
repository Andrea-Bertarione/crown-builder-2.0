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
    name: AbilityKey;
    score = $state(10);
    characterRef: Character;

    computed = $derived.by(() => {
        return this.score + getRaceModifier(this.characterRef, this.name) + getSubraceModifier(this.characterRef, this.name) + getAsiModifier(this.characterRef, this.name);
    });

    get computedModifier(): number {
        return Math.floor((this.computed - 10) / 2);
    }

    get modifier(): number {
        return Math.floor((this.score - 10) / 2);
    }

    constructor(name: AbilityKey, baseScore: number = 10, character: Character) {
        this.name = name;
        this.score = baseScore;
        this.characterRef = character;
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
