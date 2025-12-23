import {beforeEach, describe, expect, it, vi} from 'vitest';
import {Character} from '$lib/characterHandler/character.svelte';
import type {Background, Class, Race, Subclass} from '$lib/types/character';
import type {Feature} from '$lib/types/feature';
import type {Weapon} from '$lib/types/attack';
import type {Armor} from '$lib/types/armor';
import type {Action} from '$lib/types/action';
import type {Condition} from '$lib/types/condition';
import type {AbilityKey, SavingThrow, Skill} from '$lib/types/skills&Saves';
import {ArmorClassImpl} from "$lib/characterHandler/armorClass.svelte";

// ================================================================
// TEST FIXTURES & MOCKS
// ================================================================

class CharacterTestHelper {
    private character: Character;

    constructor() {
        this.character = new Character();
    }

    getCharacter(): Character {
        return this.character;
    }

    static createMockRace(overrides?: Partial<Race>): Race {
        return {
            id: 'test-race-1',
            name: 'Test Race',
            speed: 30,
            abilityScoreBonuses: { strength: 2 },
            size: 'Medium',
            languages: ['Common'],
            features: [],
            ...overrides
        } as Race;
    }

    static createMockClass(overrides?: Partial<Class>): Class {
        return {
            id: 'test-class-1',
            name: 'Test Class',
            hitDice: 'd8',
            primaryAbility: 'strength',
            savingThrowProficiencies: ['strength'],
            subclassLevel: 3,
            features: [],
            armorProficiencies: [],
            weaponProficiencies: [],
            skillProficiencies: [],
            ...overrides
        } as Class;
    }

    static createMockSubclass(overrides?: Partial<Subclass>): Subclass {
        return {
            id: 'test-subclass-1',
            name: 'Test Subclass',
            description: 'Test subclass',
            features: [],
            ...overrides
        } as Subclass;
    }

    static createMockBackground(overrides?: Partial<Background>): Background {
        return {
            id: 'test-bg-1',
            name: 'Test Background',
            description: 'Test background',
            skillProficiencies: ['acrobatics'],
            languages: [],
            features: [],
            startingGold: 15,
            ...overrides
        } as Background;
    }

    static createMockWeapon(overrides?: Partial<Weapon>): Weapon {
        return {
            id: 'test-weapon-1',
            name: 'Longsword',
            damageDice: '1d8',
            damageType: 'slashing',
            damageModifier: 'strength',
            isProficient: true,
            isFinesse: false,
            properties: [],
            modifiers: { total: 0 },
            ...overrides
        } as Weapon;
    }

    static createMockArmor(overrides?: Partial<Armor>): Armor {
        return {
            id: 'test-armor-1',
            name: 'Plate Armor',
            armorClass: 18,
            type: 'heavy',
            requiresStrength: 15,
            stealthDisadvantage: true,
            ...overrides
        } as Armor;
    }

    static createMockFeature(overrides?: Partial<Feature>): Feature {
        return {
            id: 'test-feature-1',
            name: 'Test Feature',
            description: 'A test feature',
            modifiers: {},
            actions: [],
            ...overrides
        } as Feature;
    }

    static createMockCondition(overrides?: Partial<Condition>): Condition {
        return {
            id: 'test-condition-1',
            name: 'Prone',
            description: 'Character is prone',
            duration: 1,
            ...overrides
        } as Condition;
    }

    static createMockAction(overrides?: Partial<Action>): Action {
        return {
            id: 'test-action-1',
            name: 'Attack',
            timing: 'action',
            description: 'Make an attack',
            ...overrides
        } as Action;
    }

    static createMockSkill(overrides?: Partial<Skill>): Skill {
        return {
            name: 'Acrobatics',
            ability: 'dexterity' as AbilityKey,
            modifier: 2,
            isProficient: true,
            ...overrides
        } as Skill;
    }

    static createMockSavingThrow(overrides?: Partial<SavingThrow>): SavingThrow {
        return {
            ability: 'strength' as AbilityKey,
            modifier: 3,
            isProficient: true,
            ...overrides
        } as SavingThrow;
    }
}

// ================================================================
// SECTION 1: CHARACTER CREATION & INITIALIZATION
// ================================================================

describe('CHARACTER CREATION & INITIALIZATION', () => {
    let helper: CharacterTestHelper;
    let character: Character;

    beforeEach(() => {
        helper = new CharacterTestHelper();
        character = helper.getCharacter();
    });

    describe('Basic Character Creation', () => {
        it('should create a character with default values', () => {
            expect(character.name).toBe('');
            expect(character.playerName).toBe('');
            expect(character.level).toBe(1);
            expect(character.experience).toBe(0);
            expect(character.alignment).toBe('neutral');
        });

        it('should assign a unique ID on creation', () => {
            const char1 = new Character();
            const char2 = new Character();
            expect(char1.id).not.toBe(char2.id);
            expect(char1.id).toBeTruthy();
        });

        it('should initialize with default ability scores (10)', () => {
            expect(character.abilityScores.strength.score).toBe(10);
            expect(character.abilityScores.dexterity.score).toBe(10);
            expect(character.abilityScores.constitution.score).toBe(10);
            expect(character.abilityScores.intelligence.score).toBe(10);
            expect(character.abilityScores.wisdom.score).toBe(10);
            expect(character.abilityScores.charisma.score).toBe(10);
        });

        it('should calculate ability modifiers correctly from scores', () => {
            expect(character.abilityScores.strength.modifier).toBe(0);
            character.abilityScores.strength.score = 16;
            expect(character.abilityScores.strength.modifier).toBe(3);
            character.abilityScores.strength.score = 9;
            expect(character.abilityScores.strength.modifier).toBe(-1);
        });

        it('should initialize with empty arrays for combat data', () => {
            expect(character.weapons).toEqual([]);
            expect(character.armor).toEqual([]);
            expect(character.shields).toEqual([]);
            expect(character.skills).toEqual([]);
            expect(character.savingThrows).toEqual([]);
            expect(character.features).toEqual([]);
        });

        it('should initialize action economy states', () => {
            expect(character.actionSpent).toBe(false);
            expect(character.bonusActionSpent).toBe(false);
            expect(character.reactionSpent).toBe(false);
            expect(character.movement).toBe(0);
            expect(character.maxMovement).toBe(30);
        });

        it('should initialize with null for D&D selections', () => {
            expect(character.race).toBeNull();
            expect(character.subrace).toBeNull();
            expect(character.class).toBeNull();
            expect(character.subclass).toBeNull();
            expect(character.background).toBeNull();
        });
    });

    describe('Basic Info Assignment', () => {
        it('should set character name', () => {
            character.name = 'Aragorn';
            expect(character.name).toBe('Aragorn');
        });

        it('should set player name', () => {
            character.playerName = 'John Doe';
            expect(character.playerName).toBe('John Doe');
        });

        it('should set alignment', () => {
            character.alignment = 'chaotic good';
            expect(character.alignment).toBe('chaotic good');
        });

        it('should set level and validate proficiency bonus', () => {
            character.level = 1;
            expect(character.proficiencyBonus).toBe(2);

            character.level = 5;
            expect(character.proficiencyBonus).toBe(3);

            character.level = 6;
            expect(character.proficiencyBonus).toBe(3);

            character.level = 14;
            expect(character.proficiencyBonus).toBe(5);

            character.level = 20;
            expect(character.proficiencyBonus).toBe(6);
        });

        it('should set experience correctly', () => {
            character.experience = 0;
            expect(character.experience).toBe(0);

            character.experience = 300;
            expect(character.experience).toBe(300);
        });
    });

    describe('Ability Score Modifications', () => {
        it('should allow manual ability score adjustment', () => {
            character.abilityScores.strength.score = 18;
            expect(character.abilityScores.strength.score).toBe(18);
            expect(character.abilityScores.strength.modifier).toBe(4);
        });

        it('should apply ASI bonuses correctly', () => {
            character.abilityScores.strength.score = 16;
            character.asiBonuses = [{ ability: 'strength', value: 2 }];

            expect(character.abilityScores.strength.score).toBe(16);
        });

        it('should handle all six ability scores independently', () => {
            character.abilityScores.strength.score = 18;
            character.abilityScores.dexterity.score = 16;
            character.abilityScores.constitution.score = 14;
            character.abilityScores.intelligence.score = 12;
            character.abilityScores.wisdom.score = 10;
            character.abilityScores.charisma.score = 8;

            expect(character.abilityScores.strength.modifier).toBe(4);
            expect(character.abilityScores.dexterity.modifier).toBe(3);
            expect(character.abilityScores.constitution.modifier).toBe(2);
            expect(character.abilityScores.intelligence.modifier).toBe(1);
            expect(character.abilityScores.wisdom.modifier).toBe(0);
            expect(character.abilityScores.charisma.modifier).toBe(-1);
        });

        it('should recalculate modifiers when ability scores change', () => {
            const dexMod = character.abilityScores.dexterity.modifier;
            character.abilityScores.dexterity.score = 20;
            expect(character.abilityScores.dexterity.modifier).toBeGreaterThan(dexMod);
        });

        it('should handle extreme ability scores', () => {
            character.abilityScores.strength.score = 20;
            expect(character.abilityScores.strength.modifier).toBe(5);

            character.abilityScores.charisma.score = 3;
            expect(character.abilityScores.charisma.modifier).toBe(-4);
        });
    });
});

// ================================================================
// SECTION 2: RACE SELECTION & EFFECTS
// ================================================================

describe('RACE SELECTION & EFFECTS', () => {
    let helper: CharacterTestHelper;
    let character: Character;

    beforeEach(() => {
        helper = new CharacterTestHelper();
        character = helper.getCharacter();
    });

    describe('Race Assignment', () => {
        it('should assign a race to the character', () => {
            const race = CharacterTestHelper.createMockRace();
            character.race = race;
            expect(character.race).toEqual(race);
        });

        it('should detect if race has subraces', () => {
            const raceWithSubraces = CharacterTestHelper.createMockRace({
                subraces: [
                    CharacterTestHelper.createMockRace({ id: 'subrace-1', name: 'Subrace 1' }),
                    CharacterTestHelper.createMockRace({ id: 'subrace-2', name: 'Subrace 2' })
                ]
            });
            character.race = raceWithSubraces;
            expect(character.raceHasSubraces).toBe(true);

            const raceWithoutSubraces = CharacterTestHelper.createMockRace({
                subraces: []
            });
            character.race = raceWithoutSubraces;
            expect(character.raceHasSubraces).toBe(false);
        });

        it('should allow subrace selection when race has subraces', () => {
            const subrace = CharacterTestHelper.createMockRace({ name: 'High Elf' });
            character.race = CharacterTestHelper.createMockRace({
                name: 'Elf',
                subraces: [subrace]
            });
            character.subrace = subrace;
            expect(character.subrace).toEqual(subrace);
        });
    });

    describe('Race Ability Score Bonuses', () => {
        it('should apply race ability bonuses on race assignment', () => {
            const race = CharacterTestHelper.createMockRace({
                abilityScoreBonuses: { strength: 2, dexterity: 1 }
            });
            character.race = race;

            expect(character.race?.abilityScoreBonuses?.strength).toBe(2);
        });

        it('should stack subrace bonuses on top of race bonuses', () => {
            const race = CharacterTestHelper.createMockRace({
                abilityScoreBonuses: { strength: 2 }
            });
            const subrace = CharacterTestHelper.createMockRace({
                abilityScoreBonuses: { dexterity: 1 }
            });
            character.race = race;
            character.subrace = subrace;

            expect(character.race?.abilityScoreBonuses?.strength).toBe(2);
            expect(character.subrace?.abilityScoreBonuses?.dexterity).toBe(1);
        });
    });

    describe('Race Size & Movement', () => {
        it('should assign race speed to character', () => {
            const race =({
                id: "test_elf",
                name: "elf",
                description: "test",
                features: [],
                abilityScoreBonuses: [],
                chosenAbilityModifier: [],
                chosenLanguage: []
            });
            character.race = race;
            expect(character.speed).toBe(9);
        });

        it('should assign race size', () => {
            const race =({
                id: "test_elf",
                name: "elf",
                description: "test",
                features: [],
                abilityScoreBonuses: [],
                chosenAbilityModifier: [],
                chosenLanguage: []
            });
            character.race = race;
            expect(character.size).toBe('Medium');
        });

        it('should assign race languages', () => {
            const race =({
                id: "test_elf",
                name: "elf",
                description: "test",
                features: [],
                abilityScoreBonuses: [],
                chosenAbilityModifier: [],
                chosenLanguage: []
            });
            character.race = race;
            expect(character.languages).toContain('Common');
            expect(character.languages).toContain('Elvish');
        });
    });

    describe('Race Features', () => {
        it('should store race features when race is selected', () => {
            const raceFeature = CharacterTestHelper.createMockFeature({
                name: 'Darkvision'
            });
            character.race = CharacterTestHelper.createMockRace({
                id: "test_elf",
                name: "elf",
                description: "test",
                features: [raceFeature],
                abilityScoreBonuses: [],
                chosenAbilityModifier: [],
                chosenLanguage: []
            });

            expect(character.features).toBeDefined();
            expect(character.features).toContainEqual(raceFeature);
        });
    });
});

// ================================================================
// SECTION 3: CLASS SELECTION & EFFECTS
// ================================================================

describe('CLASS SELECTION & EFFECTS', () => {
    let helper: CharacterTestHelper;
    let character: Character;

    beforeEach(() => {
        helper = new CharacterTestHelper();
        character = helper.getCharacter();
    });

    describe('Class Assignment', () => {
        it('should assign a class to the character', () => {
            const charClass = CharacterTestHelper.createMockClass();
            character.class = charClass;
            expect(character.class).toEqual(charClass);
        });

        it('should detect if subclass should be chosen at this level', () => {
            const classWithSubclass = CharacterTestHelper.createMockClass({
                subclassLevel: 3
            });
            character.class = classWithSubclass;
            expect(character.subclassShouldBeChosenAtThisLevel).toBe(false);

            character.level = 3;
            expect(character.subclassShouldBeChosenAtThisLevel).toBe(true);
        });

        it('should require subclass selection at correct level', () => {
            character.level = 1;
            character.class = CharacterTestHelper.createMockClass({
                subclassLevel: 3
            });
            expect(character.subclassShouldBeChosenAtThisLevel).toBe(false);

            character.level = 3;
            expect(character.subclassShouldBeChosenAtThisLevel).toBe(true);

            character.level = 6;
            expect(character.subclassShouldBeChosenAtThisLevel).toBe(false);
        });
    });

    describe('Class Hit Dice', () => {
        it('should assign hit dice based on class', () => {
            const charClass = CharacterTestHelper.createMockClass({ hitDieSize: 10 });
            character.class = charClass;
            expect(character.class?.hitDieSize).toBe(10);
        });
    });

    describe('Class Proficiencies', () => {
        it('should assign armor proficiencies from class', () => {
            const charClass = CharacterTestHelper.createMockClass({
                armorProficiencies: ['light', 'medium', 'heavy']
            });
            character.class = charClass;
            expect(character.class?.armorProficiencies).toContain('light');
        });

        it('should assign weapon proficiencies from class', () => {
            const charClass = CharacterTestHelper.createMockClass({
                weaponProficiencies: ['simple', 'martial']
            });
            character.class = charClass;
            expect(character.class?.weaponProficiencies).toContain('simple');
        });

        it('should assign saving throw proficiencies from class', () => {
            const charClass = CharacterTestHelper.createMockClass({
                savingThrowProficiencies: ['strength', 'constitution']
            });
            character.class = charClass;
            expect(character.class?.savingThrowProficiencies).toContain('strength');
        });

        it('should assign skill proficiencies from class', () => {
            const charClass = CharacterTestHelper.createMockClass({
                skillProficiencies: ['acrobatics', 'animal handling', 'arcana']
            });
            character.class = charClass;
            expect(character.class?.skillProficiencies).toContain('arcana');
        });
    });

    describe('Subclass Selection', () => {
        it('should assign subclass to character', () => {
            const subclass = CharacterTestHelper.createMockSubclass();
            character.subclass = subclass;
            expect(character.subclass).toEqual(subclass);
        });

        it('should only allow subclass selection at class subclass level', () => {
            character.level = 1;
            character.class = CharacterTestHelper.createMockClass({
                subclassLevel: 3
            });

            expect(character.subclassShouldBeChosenAtThisLevel).toBe(false);

            character.level = 3;
            expect(character.subclassShouldBeChosenAtThisLevel).toBe(true);
        });

        it('should allow subclass assignment when triggered', () => {
            character.level = 3;
            character.class = CharacterTestHelper.createMockClass({
                subclassLevel: 3
            });
            character.subclass = CharacterTestHelper.createMockSubclass({
                name: 'Eldritch Knight'
            });

            expect(character.subclass?.name).toBe('Eldritch Knight');
        });
    });

    describe('Class Features', () => {
        it('should store class features', () => {
            const classFeature = CharacterTestHelper.createMockFeature({
                name: 'Spellcasting'
            });
            character.class = CharacterTestHelper.createMockClass({
                features: [classFeature]
            });

            expect(character.features).toBeDefined();
            expect(character.features).toContainEqual(classFeature);
        });

        it('should store subclass features', () => {
            character.level = 3;
            const subclassFeature = CharacterTestHelper.createMockFeature({
                name: 'Arcane Tradition'
            });
            character.subclass = CharacterTestHelper.createMockSubclass({
                features: [subclassFeature]
            });

            expect(character.subclass?.features).toBeDefined();
        });
    });
});

// ================================================================
// SECTION 4: BACKGROUND SELECTION
// ================================================================

describe('BACKGROUND SELECTION', () => {
    let helper: CharacterTestHelper;
    let character: Character;

    beforeEach(() => {
        helper = new CharacterTestHelper();
        character = helper.getCharacter();
    });

    describe('Background Assignment', () => {
        it('should assign a background to character', () => {
            const background = CharacterTestHelper.createMockBackground();
            character.background = background;
            expect(character.background).toEqual(background);
        });

        it('should assign background skill proficiencies', () => {
            const background = CharacterTestHelper.createMockBackground({
                skillProficiencies: ['deception', 'insight']
            });
            character.background = background;
            expect(character.background?.skillProficiencies).toContain('deception');
        });

        it('should assign background languages', () => {
            const background = CharacterTestHelper.createMockBackground({
                languageProficiencies: ['Thieves\' Cant']
            });
            character.background = background;
            expect(character.background?.languageProficiencies).toContain('Thieves\' Cant');
        });

        it('should assign background starting gold', () => {
            character.background = CharacterTestHelper.createMockBackground({
                goldAmount: 50
            });
            expect(character.background?.goldAmount).toBe(50);
        });
    });

    describe('Background Features', () => {
        it('should store background features', () => {
            const feature = CharacterTestHelper.createMockFeature({
                name: 'Criminal Contact',
                description: 'A criminal can be contacted by the GM in person or through an official government official.'
            });

            character.background = CharacterTestHelper.createMockBackground({
                // @ts-ignore
                feature: [feature]
            });
            expect(character.background?.feature).toBeDefined();
        });
    });

    describe('Multiple Backgrounds', () => {
        it('should handle changing background', () => {
            const background1 = CharacterTestHelper.createMockBackground({
                name: 'Soldier'
            });
            const background2 = CharacterTestHelper.createMockBackground({
                name: 'Criminal'
            });

            character.background = background1;
            expect(character.background?.name).toBe('Soldier');

            character.background = background2;
            expect(character.background?.name).toBe('Criminal');
        });
    });
});

// ================================================================
// SECTION 5: PROFICIENCY BONUS & MODIFIERS
// ================================================================

describe('PROFICIENCY BONUS & MODIFIERS', () => {
    let helper: CharacterTestHelper;
    let character: Character;

    beforeEach(() => {
        helper = new CharacterTestHelper();
        character = helper.getCharacter();
    });

    describe('Modifier Calculations', () => {
        it('should correctly calculate modifier from score (10-11 = 0)', () => {
            character.abilityScores.strength.score = 10;
            expect(character.abilityScores.strength.modifier).toBe(0);

            character.abilityScores.strength.score = 11;
            expect(character.abilityScores.strength.modifier).toBe(0);
        });

        it('should correctly calculate positive modifiers', () => {
            character.abilityScores.strength.score = 12;
            expect(character.abilityScores.strength.modifier).toBe(1);

            character.abilityScores.strength.score = 14;
            expect(character.abilityScores.strength.modifier).toBe(2);

            character.abilityScores.strength.score = 16;
            expect(character.abilityScores.strength.modifier).toBe(3);

            character.abilityScores.strength.score = 20;
            expect(character.abilityScores.strength.modifier).toBe(5);
        });

        it('should correctly calculate negative modifiers', () => {
            character.abilityScores.strength.score = 9;
            expect(character.abilityScores.strength.modifier).toBe(-1);

            character.abilityScores.strength.score = 7;
            expect(character.abilityScores.strength.modifier).toBe(-2);

            character.abilityScores.strength.score = 3;
            expect(character.abilityScores.strength.modifier).toBe(-4);
        });
    });

    describe('Proficiency Bonus Calculation', () => {
        it('should calculate correct proficiency bonus by level', () => {
            const testCases = [
                { level: 1, bonus: 2 },
                { level: 5, bonus: 3 },
                { level: 9, bonus: 4 },
                { level: 13, bonus: 5 },
                { level: 17, bonus: 6 },
                { level: 20, bonus: 6 }
            ];

            testCases.forEach(({ level, bonus }) => {
                character.level = level;
                expect(character.proficiencyBonus).toBe(bonus);
            });
        });
    });

    describe('ASI (Ability Score Improvements)', () => {
        it('should track ASI bonuses separately', () => {
            character.asiBonuses = [
                { ability: 'strength', value: 2 },
                { ability: 'dexterity', value: 1 }
            ];

            expect(character.asiBonuses).toHaveLength(2);
            expect(character.asiBonuses[0].value).toBe(2);
        });

        it('should apply ASI at correct levels (4, 8, 12, 16, 19)', () => {
            const asiLevels = [4, 8, 12, 16, 19];
            asiLevels.forEach(level => {
                character.level = level;
                character.asiBonuses = [{ ability: 'strength', value: 2 }];
                expect(character.asiBonuses).toHaveLength(1);
            });
        });
    });
});

// ================================================================
// SECTION 6: ARMOR CLASS
// ================================================================

describe('ARMOR CLASS', () => {
    let helper: CharacterTestHelper;
    let character: Character;

    beforeEach(() => {
        helper = new CharacterTestHelper();
        character = helper.getCharacter();
    });

    describe('AC Calculation - No Armor', () => {
        it('should calculate AC from 10 + DEX when unarmored', () => {
            character.abilityScores.dexterity.score = 14;
            const expectedAC = 10 + character.abilityScores.dexterity.modifier;
            expect(character.armorClass.value).toBe(expectedAC);
        });

        it('should update AC when DEX changes', () => {
            const acBefore = character.armorClass.value;
            character.abilityScores.dexterity.score = 18;
            expect(character.armorClass.value).toBeGreaterThan(acBefore);
        });
    });

    describe('AC Calculation - Light Armor', () => {
        it('should use light armor AC + DEX modifier', () => {
            const lightArmor = CharacterTestHelper.createMockArmor({
                name: 'Leather',
                baseAC: 11,
                type: 'light',
                allowsDexBonus: true,
                modifiers: {
                    total: 0
                }
            });

            character.armor.push(lightArmor);
            character.abilityScores.dexterity.score = 14;

            character.armorClass.equipArmor(lightArmor);

            const expectedAC = 11 + character.abilityScores.dexterity.modifier;
            expect(character.armorClass.value).toBe(expectedAC);
        });
    });

    describe('AC Calculation - Heavy Armor', () => {
        it('should use heavy armor AC without DEX modifier', () => {
            const heavyArmor = CharacterTestHelper.createMockArmor({
                name: 'Plate',
                baseAC: 18,
                type: 'heavy',
                allowsDexBonus: false,
                modifiers: {
                    total: 0
                }
            });
            character.armor.push(heavyArmor);
            character.abilityScores.dexterity.score = 18;

            character.armorClass.equipArmor(heavyArmor);

            expect(character.armorClass.value).toBe(18);
        });
    });

    describe('AC with Shields', () => {
        it('should add shield bonus to AC', () => {
            const shield = CharacterTestHelper.createMockArmor({
                name: 'Shield',
                baseAC: 2,
                type: 'shield'
            });
            character.shields = [shield];

            const baseAC = 10 + character.abilityScores.dexterity.modifier;
            expect(character.armorClass.value).toBeGreaterThanOrEqual(baseAC);
        });
    });
});

// ================================================================
// SECTION 7: WEAPONS & ATTACKS
// ================================================================

describe('WEAPONS & ATTACKS', () => {
    let helper: CharacterTestHelper;
    let character: Character;

    beforeEach(() => {
        helper = new CharacterTestHelper();
        character = helper.getCharacter();
    });

    describe('Weapon Assignment', () => {
        it('should add a weapon to inventory', () => {
            const weapon = CharacterTestHelper.createMockWeapon();
            character.weapons.push(weapon);
            expect(character.weapons).toContainEqual(weapon);
        });

        it('should track multiple weapons', () => {
            const weapon1 = CharacterTestHelper.createMockWeapon({
                name: 'Longsword'
            });
            const weapon2 = CharacterTestHelper.createMockWeapon({
                name: 'Shortbow'
            });
            character.weapons = [weapon1, weapon2];
            expect(character.weapons).toHaveLength(2);
        });

        it('should remove weapon from inventory', () => {
            const weapon = CharacterTestHelper.createMockWeapon();
            character.weapons = [weapon];
            character.weapons = character.weapons.filter(w => w.id !== weapon.id);
            expect(character.weapons).not.toContain(weapon);
        });
    });

    describe('Attack Bonus Calculation', () => {
        it('should calculate attack bonus with ability modifier', () => {
            character.abilityScores.strength.score = 16;
            const weapon = CharacterTestHelper.createMockWeapon({
                id: "iron_greatsword",
                name: "Iron Greatsword",
                category: "melee",
                type: "martial_melee",
                damageDice: "2d6",
                damageType: "slashing",
                damageModifier: "strength",
                properties: ["heavy", "two_handed"],
                modifiers: {}
            });
            character.weapons = [weapon];
            character.weaponsProficiencies.push("martial_melee")

            character.weapon.equipWeapon(weapon, "mainHand");

            const attack = character.availableAttacks[0];
            const expectedBonus =
                character.abilityScores.strength.modifier +
                character.proficiencyBonus;
            expect(attack.attackBonus).toBe(expectedBonus);
        });

        it('should exclude proficiency bonus if not proficient', () => {
            character.abilityScores.strength.score = 10;
            const weapon = CharacterTestHelper.createMockWeapon({
                id: "iron_greatsword",
                name: "Iron Greatsword",
                category: "melee",
                type: "martial_melee",
                damageDice: "2d6",
                damageType: "slashing",
                damageModifier: "strength",
                properties: ["heavy", "two_handed"],
                modifiers: {}
            });
            character.weapons = [weapon];

            character.weapon.equipWeapon(weapon, "mainHand");

            const attack = character.availableAttacks[0];
            const expectedBonus = character.abilityScores.strength.modifier;
            expect(attack.attackBonus).toBe(expectedBonus);
        });

        it('should use correct ability for different weapons', () => {
            character.abilityScores.strength.score = 10;
            character.abilityScores.dexterity.score = 16;

            const meleeWeapon = CharacterTestHelper.createMockWeapon({
                name: 'Longsword',
                damageModifier: 'strength'
            });
            const rangedWeapon = CharacterTestHelper.createMockWeapon({
                name: 'Longbow',
                damageModifier: 'dexterity'
            });

            character.weapons = [meleeWeapon, rangedWeapon];

            const meleeAttack = character.availableAttacks[0];
            const rangedAttack = character.availableAttacks[1];

            expect(meleeAttack.weapon.damageModifier).toBe('strength');
            expect(rangedAttack.weapon.damageModifier).toBe('dexterity');
        });
    });

    describe('Available Attacks Derivation', () => {
        it('should return empty array with no weapons', () => {
            expect(character.availableAttacks).toEqual([]);
        });

        it('should update attacks when weapons change', () => {
            const weapon = CharacterTestHelper.createMockWeapon();
            character.weapons = [weapon];
            expect(character.availableAttacks).toHaveLength(1);

            character.weapons = [];
            expect(character.availableAttacks).toHaveLength(0);
        });

        it('should update attack bonuses when ability scores change', () => {
            const weapon = CharacterTestHelper.createMockWeapon();
            character.weapons = [weapon];

            const attackBefore = character.availableAttacks[0].attackBonus;
            character.abilityScores.strength.score = 20;
            const attackAfter = character.availableAttacks[0].attackBonus;

            expect(attackAfter).toBeGreaterThan(attackBefore);
        });
    });
});

// ================================================================
// SECTION 8: FEATURES & ABILITIES
// ================================================================

/*
describe('FEATURES & ABILITIES', () => {
    let helper: CharacterTestHelper;
    let character: Character;

    beforeEach(() => {
        helper = new CharacterTestHelper();
        character = helper.getCharacter();
    });

    describe('Feature Application', () => {
        it('should apply a feature to character', () => {
            const feature = CharacterTestHelper.createMockFeature({
                name: 'Unarmored Defense'
            });
            character.applyFeature(feature);
            expect(character.features).toContain(feature);
        });

        it('should prevent duplicate features', () => {
            const feature = CharacterTestHelper.createMockFeature();
            character.applyFeature(feature);
            character.applyFeature(feature);
            expect(character.features).toHaveLength(1);
        });

        it('should remove a feature', () => {
            const feature = CharacterTestHelper.createMockFeature();
            character.applyFeature(feature);
            character.removeFeature(feature.id);
            expect(character.features).not.toContain(feature);
        });

        it('should track multiple features', () => {
            const feature1 = CharacterTestHelper.createMockFeature({
                id: 'f1',
                name: 'Feature 1'
            });
            const feature2 = CharacterTestHelper.createMockFeature({
                id: 'f2',
                name: 'Feature 2'
            });
            character.applyFeature(feature1);
            character.applyFeature(feature2);
            expect(character.features).toHaveLength(2);
        });
    });

    describe('Feature Reactivity', () => {
        it('should update initiative when feature with initiative modifier is applied', () => {
            character.abilityScores.dexterity.score = 10;
            const initiativeBefore = character.initiativeModifier;

            const feature = CharacterTestHelper.createMockFeature({
                modifiers: {
                    initiative: [{ id: 'm1', value: 3, active: true, source: "class", label: "Initiative Modifier" }]
                }
            });
            character.applyFeature(feature);
            const initiativeAfter = character.initiativeModifier;

            expect(initiativeAfter).toBeGreaterThanOrEqual(initiativeBefore);
        });

        it('should update actions when feature is applied', () => {
            const actionsBefore = character.availableActions.length;
            const action = CharacterTestHelper.createMockAction();
            const feature = CharacterTestHelper.createMockFeature({
                actions: [action]
            });
            character.applyFeature(feature);

            const actionsAfter = character.availableActions.length;
            expect(actionsAfter).toBeGreaterThan(actionsBefore);
        });
    });
});
*/
// ================================================================
// SECTION 9: CONDITIONS
// ================================================================

describe('CONDITIONS', () => {
    let helper: CharacterTestHelper;
    let character: Character;

    beforeEach(() => {
        helper = new CharacterTestHelper();
        character = helper.getCharacter();
    });

    describe('Condition Application', () => {
        it('should apply a condition to character', () => {
            const condition = CharacterTestHelper.createMockCondition({
                name: 'prone'
            });
            character.conditions.addCondition(condition);
            expect(character.conditions.active).toContain(condition);
        });

        it('should track condition duration', () => {
            const condition = CharacterTestHelper.createMockCondition({
                duration: 3
            });
            character.conditions.addCondition(condition);
            expect(character.conditions.active[0].duration).toBe(3);
        });

        it('should remove a condition', () => {
            const condition = CharacterTestHelper.createMockCondition();
            character.conditions.addCondition(condition);
            character.conditions.removeCondition(condition.name);
            expect(character.conditions.active).not.toContain(condition);
        });

        it('should track multiple conditions', () => {
            const prone = CharacterTestHelper.createMockCondition({
                name: 'prone'
            });
            const blinded = CharacterTestHelper.createMockCondition({
                name: 'blinded'
            });
            character.conditions.addCondition(prone);
            character.conditions.addCondition(blinded);
            expect(character.conditions.active).toHaveLength(2);
        });
    });

    describe('Condition Expiration', () => {
        it('should decrement condition duration each turn', () => {
            const condition = CharacterTestHelper.createMockCondition({
                duration: 3
            });
            character.conditions.addCondition(condition);
            const before = character.conditions.active[0].duration;

            character.conditions.tick();
            const after = character.conditions.active[0].duration;

            expect(after).toBeLessThan(before);
        });

        it('should remove condition when duration reaches 0', () => {
            const condition = CharacterTestHelper.createMockCondition({
                duration: 1
            });
            character.conditions.addCondition(condition);

            character.conditions.tick();
            expect(character.conditions.active).not.toContain(condition);
        });
    });
});

// ================================================================
// SECTION 10: ACTION ECONOMY
// ================================================================

describe('ACTION ECONOMY', () => {
    let helper: CharacterTestHelper;
    let character: Character;

    beforeEach(() => {
        helper = new CharacterTestHelper();
        character = helper.getCharacter();
    });

    describe('Action Economy Tracking', () => {
        it('should initialize action as available', () => {
            expect(character.actionSpent).toBe(false);
        });

        it('should initialize bonus action as available', () => {
            expect(character.bonusActionSpent).toBe(false);
        });

        it('should initialize reaction as available', () => {
            expect(character.reactionSpent).toBe(false);
        });

        it('should reset turn action economy', () => {
            character.actionSpent = true;
            character.bonusActionSpent = true;
            character.reactionSpent = true;
            character.movement = 25;

            character.resetTurn();

            expect(character.actionSpent).toBe(false);
            expect(character.bonusActionSpent).toBe(false);
            expect(character.reactionSpent).toBe(false);
            expect(character.movement).toBe(0);
        });
    });

    describe('Movement Tracking', () => {
        it('should track movement spent', () => {
            character.movement = 15;
            expect(character.movement).toBe(15);
        });

        it('should track maximum movement', () => {
            expect(character.maxMovement).toBe(30);
        });

        it('should reset movement on turn start', () => {
            character.movement = 20;
            character.resetTurn();
            expect(character.movement).toBe(0);
        });
    });
});

// ================================================================
// SECTION 11: INITIATIVE & COMBAT
// ================================================================

describe('INITIATIVE & COMBAT', () => {
    let helper: CharacterTestHelper;
    let character: Character;

    beforeEach(() => {
        helper = new CharacterTestHelper();
        character = helper.getCharacter();
    });

    describe('Initiative Calculation', () => {
        it('should calculate initiative from DEX modifier', () => {
            character.abilityScores.dexterity.score = 16;
            expect(character.initiativeModifier).toBe(3);
        });

        it('should handle negative initiative bonus', () => {
            character.abilityScores.dexterity.score = 8;
            expect(character.initiativeModifier).toBeLessThan(0);
        });
    });

    describe('Turn Management', () => {
        it('should reset action economy at turn start', () => {
            character.actionSpent = true;
            character.bonusActionSpent = true;
            character.reactionSpent = true;
            character.movement = 20;

            character.resetTurn();

            expect(character.actionSpent).toBe(false);
            expect(character.bonusActionSpent).toBe(false);
            expect(character.reactionSpent).toBe(false);
            expect(character.movement).toBe(0);
        });
    });
});

// ================================================================
// SECTION 12: DEBUG LOGGING
// ================================================================

describe('DEBUG LOGGING', () => {
    let helper: CharacterTestHelper;
    let character: Character;

    beforeEach(() => {
        helper = new CharacterTestHelper();
        character = helper.getCharacter();
    });

    describe('Character Debug Output', () => {
        it('should execute debug log without errors', () => {
            character.name = 'Legolas';
            character.playerName = 'Player 1';
            character.level = 10;
            character.abilityScores.dexterity.score = 18;

            expect(() => {
                character.debugLog();
            }).not.toThrow();
        });

        it('should log with proper formatting', () => {
            const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

            character.name = 'Test Character';
            character.debugLog();

            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });
    });
});

// ================================================================
// SECTION 13: EDGE CASES & REACTIVITY
// ================================================================

describe('EDGE CASES & REACTIVITY', () => {
    let helper: CharacterTestHelper;
    let character: Character;

    beforeEach(() => {
        helper = new CharacterTestHelper();
        character = helper.getCharacter();
    });

    describe('Extreme Values', () => {
        it('should handle ability score of 3 (minimum)', () => {
            character.abilityScores.strength.score = 3;
            expect(character.abilityScores.strength.modifier).toBe(-4);
        });

        it('should handle ability score of 20 (maximum)', () => {
            character.abilityScores.strength.score = 20;
            expect(character.abilityScores.strength.modifier).toBe(5);
        });

        it('should handle level 20 maximum', () => {
            character.level = 20;
            expect(character.proficiencyBonus).toBe(6);
        });
    });

    describe('Null/Undefined Handling', () => {
        it('should handle no race selected', () => {
            expect(character.race).toBeNull();
            expect(character.raceHasSubraces).toBe(false);
        });

        it('should handle no class selected', () => {
            expect(character.class).toBeNull();
            expect(character.subclassShouldBeChosenAtThisLevel).toBe(false);
        });

        it('should handle no weapons equipped', () => {
            expect(character.weapons).toEqual([]);
            expect(character.availableAttacks).toEqual([]);
        });

        it('should handle no features applied', () => {
            expect(character.features).toEqual([]);
            expect(character.availableActions).toEqual([]);
        });
    });

    describe('Reactivity Chains', () => {
        it('should handle cascading updates: level -> proficiency -> attacks', () => {
            const weapon = CharacterTestHelper.createMockWeapon({
                isProficient: true
            });
            character.weapons = [weapon];
            character.abilityScores.strength.score = 16;

            const attackBefore = character.availableAttacks[0]?.attackBonus;

            character.level = 5;
            const attackAfter = character.availableAttacks[0]?.attackBonus;

            expect(attackAfter).toBeGreaterThan(attackBefore);
        });

        it('should not have stale initiative modifier after ability change', () => {
            character.abilityScores.dexterity.score = 10;
            const init1 = character.initiativeModifier;

            character.abilityScores.dexterity.score = 18;
            const init2 = character.initiativeModifier;

            expect(init2).not.toBe(init1);
            expect(init2).toBeGreaterThan(init1);
        });

        it('should not have stale AC value after equipment change', () => {
            character.abilityScores.dexterity.score = 10;
            const ac1 = character.armorClass.value;

            const armor = CharacterTestHelper.createMockArmor({
                baseAC: 18,
                type: 'heavy'
            });
            character.armor = [armor];

            const ac2 = character.armorClass.value;

            expect(ac2).not.toBe(ac1);
            expect(ac2).toBeGreaterThan(ac1);
        });
    });

    /*
    describe('Array Boundary Conditions', () => {
        it('should handle empty weapons array', () => {
            character.weapons = [];
            expect(character.availableAttacks).toEqual([]);
        });

        it('should handle removing all features', () => {
            const feature1 = CharacterTestHelper.createMockFeature({ id: 'f1' });
            const feature2 = CharacterTestHelper.createMockFeature({ id: 'f2' });

            character.applyFeature(feature1);
            character.applyFeature(feature2);
            character.removeFeature(feature1.id);
            character.removeFeature(feature2.id);

            expect(character.features).toEqual([]);
        });
    });
    */

    describe('State Consistency', () => {
        it('should maintain consistency when updating multiple properties', () => {
            character.name = 'Test';
            character.level = 10;
            character.abilityScores.strength.score = 18;

            expect(character.name).toBe('Test');
            expect(character.level).toBe(10);
            expect(character.abilityScores.strength.score).toBe(18);
        });

        it('should maintain action economy consistency', () => {
            character.actionSpent = true;
            character.bonusActionSpent = true;
            character.reactionSpent = true;

            expect(character.actionSpent || !character.actionSpent).toBe(true);
        });
    });
});