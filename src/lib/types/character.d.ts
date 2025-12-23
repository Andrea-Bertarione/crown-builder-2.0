import type {AbilityKey} from "$lib/types/skills&Saves";
import type {SpellcastingAbility} from "$lib/data/classes.data";
import type {WeaponsImp} from "$lib/characterHandler/weapons.svelte";

interface CharacterType {
    // Basic info
    id: string;
    name: $state.raw<string>;
    playerName: $state.raw<string>;
    level: $state.raw<number>;
    experience: $state.raw<number>;

    // D&D data
    race: $state.raw<Race>;
    subrace: $state.raw<Race>;
    class: $state.raw<Class>;
    subclass: $state.raw<Subclass | null>;
    background: $state.raw<Background>;
    alignment: $state.raw<string>;

    // Derived extra informations
    subclassShouldBeChosenAtThisLevel: boolean;
    raceHasSubraces: boolean;
    hasSpellcasting: boolean;

    // Core stats
    abilityScores: Record<AbilityKey, AbilityWithModifier>;  // 6 scores
    asiBonuses: $state<{
        ability: AbilityKey;
        value: number;
    }[]>

    // Derived from level
    get proficiencyBonus(): number; // $derived

    //Speed
    speed: number; // $derived: 9 for most races

    //Size
    size: string; // $derived: Medium for most races

    //languages
    languages: string[];

    // Health
    hitPoints: HitPoints;

    // AC
    armorClass: ArmorClass;

    // Weapon
    weapon: WeaponsImp;

    // Skills and saves
    skills: Skill[];
    savingThrows: SavingThrow[];

    // Combat
    weapons: Weapon[];
    armor: Armor[];
    shields: Armor[];
    actions: Action[];
    reactions: Reaction[];
    spellcasting: Spellcasting | null;

    // Status
    conditions: ConditionTracker;

    // Features applied to character (race, class, feats, etc.)
    features: $state.raw<Feature[]>;

    // Initiative
    get initiativeModifier(): number; // $derived: DEX mod + initiative modifiers from features

    // Getting attacks available now
    get availableAttacks(): Attack[]; // $derived

    // Getting actions available now
    get availableActions(): Action[]; // $derived
}

interface Race {
    id: string;
    name: string;
    description: string;
    features: Feature[];
    subraces?: Race[];
    abilityScoreBonuses: Partial<AbilityScores>;
    chosenAbilityModifier: {
        ability: AbilityKey;
        value: number;
    }[];
    chosenLanguage: string[];
}

interface Class {
    id: string;
    name: string;
    description: string;
    hitDieSize: number;  // d6, d8, d10, d12
    savingThrowProficiencies?: AbilityKey[];
    primaryAbility: AbilityKey
    skillProficiencies?: string[];
    skillChoices?: number;
    armorProficiencies?: string[];
    weaponProficiencies?: string[];
    toolProficiencies?: string[];
    spellcastingAbility?: SpellcastingAbility;
    features: Feature[];  // Class features by level
    subclasses?: Subclass[];
    subclassLevel?: number;
    spellcasting?: Spellcasting;
}

interface Subclass {
    id: string;
    name: string;
    parentClass: Class;
    description: string;
    features: Feature[];
}

interface Background {
    name: string;
    description: string;
    skillProficiencies?: string[];
    toolProficiencies?: string[];
    languageProficiencies?: string[];
    equipment?: string[];
    goldAmount?: number;
    personality?: string;
    ideals?: string;
    bonds?: string;
    flaws?: string;
    feature?: {
        name: string;
        description: string;
    };
}

export { CharacterType, Race, Class, Subclass, Background };
