import type { AbilityKey } from "$lib/types/skills&Saves";
import type {Class, Subclass} from "$lib/types/character";
import type {Feature} from "$lib/types/feature";
import {getFeatureById} from "$lib/data/features.data";
import type {Character} from "$lib/characterHandler/character.svelte";

export type HitDieSize = 6 | 8 | 10 | 12;
export type SpellcastingAbility = 'intelligence' | 'wisdom' | 'charisma';

// Level-specific class data
export interface ClassLevelData {
    level: number;
    features?: string[];
    spellcastingAbility?: SpellcastingAbility;
    additionalFeatures?: {
        skillProficiencies?: string[];
        armorProficiencies?: string[];
        weaponProficiencies?: string[];
        toolProficiencies?: string[];
    };
}

// Main class data structure with levels
export interface ClassData {
    name: string;
    description: string;
    hitDieSize: HitDieSize;
    primaryAbility: AbilityKey;
    savingThrowProficiencies?: AbilityKey[];

    // Level 1 base proficiencies
    skillProficiencies?: string[];
    skillChoices?: number;
    armorProficiencies?: string[];
    weaponProficiencies?: string[];
    toolProficiencies?: string[];

    // Level progression
    levels: Record<number, ClassLevelData>;

    subclassLevel?: number;
    subclasses?: ClassData[];
}

const classesData: Record<string, ClassData> = {
    barbarian: {
        name: 'Barbarian',
        description: 'A fierce warrior of primitive background who can enter a battle rage, channeling bestial power into violent attacks and fortitude.',
        hitDieSize: 12,
        primaryAbility: 'strength',
        savingThrowProficiencies: ['strength', 'constitution'],
        skillChoices: 2,
        skillProficiencies: ['Animal Handling', 'Intimidation', 'Nature', 'Perception', 'Survival'],
        armorProficiencies: ['Simple weapons', 'Martial weapons'],
        subclassLevel: 3,

        levels: {
            1: {
                level: 1,
                features: ['Rage', 'Unarmored Defense']
            },
            2: {
                level: 2,
                features: ['Reckless Attack', 'Danger Sense']
            },
            3: {
                level: 3,
                features: ['Primal Path']
            },
            4: {
                level: 4,
                features: ['Ability Score Improvement']
            },
            5: {
                level: 5,
                features: ['Extra Attack', 'Fast Movement']
            },
            6: {
                level: 6,
                features: ['Path Feature']
            },
            7: {
                level: 7,
                features: ['Feral Instinct']
            },
            8: {
                level: 8,
                features: ['Ability Score Improvement']
            },
            9: {
                level: 9,
                features: ['Brutal Critical 1d8']
            },
            10: {
                level: 10,
                features: ['Path Feature']
            },
            11: {
                level: 11,
                features: ['Relentless Rage']
            },
            12: {
                level: 12,
                features: ['Ability Score Improvement']
            },
            13: {
                level: 13,
                features: ['Brutal Critical 1d10']
            },
            14: {
                level: 14,
                features: ['Path Feature']
            },
            15: {
                level: 15,
                features: ['Persistent Rage']
            },
            16: {
                level: 16,
                features: ['Ability Score Improvement']
            },
            17: {
                level: 17,
                features: ['Brutal Critical 1d12']
            },
            18: {
                level: 18,
                features: ['Indomitable Might']
            },
            19: {
                level: 19,
                features: ['Ability Score Improvement']
            },
            20: {
                level: 20,
                features: ['Primal Champion']
            }
        },

        subclasses: [
            {
                name: 'Berserker',
                description: 'A barbarian driven by the fury of battle, able to enter a frenzy for devastating attacks.',
                hitDieSize: 12,
                primaryAbility: 'strength',
                savingThrowProficiencies: ['strength', 'constitution'],
                skillChoices: 2,
                skillProficiencies: ['Animal Handling', 'Intimidation', 'Nature', 'Perception', 'Survival'],
                armorProficiencies: ['Simple weapons', 'Martial weapons'],
                levels: {
                    3: { level: 3, features: ['Frenzy'] },
                    6: { level: 6, features: ['Mindless Rage'] },
                    10: { level: 10, features: ['Intimidating Presence'] },
                    14: { level: 14, features: ['Retaliation'] }
                }
            },
            {
                name: 'Totem Warrior',
                description: 'A barbarian who exudes the primal power of animals, drawing strength from a totem spirit.',
                hitDieSize: 12,
                primaryAbility: 'strength',
                savingThrowProficiencies: ['strength', 'constitution'],
                skillChoices: 2,
                skillProficiencies: ['Animal Handling', 'Intimidation', 'Nature', 'Perception', 'Survival'],
                armorProficiencies: ['Simple weapons', 'Martial weapons'],
                levels: {
                    3: { level: 3, features: ['Totem Spirit'] },
                    6: { level: 6, features: ['Aspect of the Beast'] },
                    10: { level: 10, features: ['Spirit Walker'] },
                    14: { level: 14, features: ['Totemic Attunement'] }
                }
            },
            {
                name: 'Ancestral Guardian',
                description: 'A barbarian protected and guided by the ancestral spirits of their lineage.',
                hitDieSize: 12,
                primaryAbility: 'strength',
                savingThrowProficiencies: ['strength', 'constitution'],
                skillChoices: 2,
                skillProficiencies: ['Animal Handling', 'Intimidation', 'Nature', 'Perception', 'Survival'],
                armorProficiencies: ['Simple weapons', 'Martial weapons'],
                levels: {
                    3: { level: 3, features: ['Ancestral Protectors'] },
                    6: { level: 6, features: ['Spirit Shield'] },
                    10: { level: 10, features: ['Consult the Spirits'] },
                    14: { level: 14, features: ['Vengeful Ancestors'] }
                }
            }
        ]
    },

    bard: {
        name: 'Bard',
        description: 'An inspiring magician whose power echoes the music of creation itself. A master of lore and illusion, the bard knows every secret worth telling.',
        hitDieSize: 8,
        primaryAbility: 'charisma',
        savingThrowProficiencies: ['charisma'],
        skillChoices: 4,
        skillProficiencies: ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth'],
        weaponProficiencies: ['Simple weapons', 'Hand crossbows', 'Longswords', 'Rapiers', 'Shortswords'],
        subclassLevel: 3,

        levels: {
            1: {
                level: 1,
                spellcastingAbility: 'charisma',
                features: ['Spellcasting', 'Bardic Inspiration']
            },
            2: {
                level: 2,
                features: ['Jack of All Trades', 'Song of Rest']
            },
            3: {
                level: 3,
                features: ['Bard College', 'Expertise']
            },
            4: {
                level: 4,
                features: ['Ability Score Improvement']
            },
            5: {
                level: 5,
                features: ['Bardic Inspiration Improvements', 'Font of Inspiration']
            },
            6: {
                level: 6,
                features: ['College Feature']
            },
            7: {
                level: 7,
                features: ['Countercharm']
            },
            8: {
                level: 8,
                features: ['Ability Score Improvement']
            },
            9: {
                level: 9,
                features: ['Magical Secrets']
            },
            10: {
                level: 10,
                features: ['College Feature', 'Bardic Inspiration Improvements']
            },
            11: {
                level: 11,
                features: ['Added Magical Secrets']
            },
            12: {
                level: 12,
                features: ['Ability Score Improvement']
            },
            13: {
                level: 13,
                features: ['Peerless Skill']
            },
            14: {
                level: 14,
                features: ['College Feature']
            },
            15: {
                level: 15,
                features: ['Bardic Inspiration Improvements']
            },
            16: {
                level: 16,
                features: ['Ability Score Improvement']
            },
            17: {
                level: 17,
                features: ['Master\'s Expertise']
            },
            18: {
                level: 18,
                features: ['College Feature']
            },
            19: {
                level: 19,
                features: ['Ability Score Improvement']
            },
            20: {
                level: 20,
                features: ['Superior Inspiration']
            }
        },

        subclasses: [
            {
                name: 'Lore',
                description: 'A bard who focuses on gathering knowledge, secrets, and powerful words of magic.',
                hitDieSize: 8,
                primaryAbility: 'charisma',
                savingThrowProficiencies: ['charisma'],
                skillChoices: 4,
                skillProficiencies: ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth'],
                weaponProficiencies: ['Simple weapons', 'Hand crossbows', 'Longswords', 'Rapiers', 'Shortswords'],
                levels: {
                    3: { level: 3, features: ['Additional Magical Secrets', 'Bonus Proficiencies'] },
                    6: { level: 6, features: ['Peerless Skill'] },
                    14: { level: 14, features: ['Peerless Skill Improvement'] }
                }
            },
            {
                name: 'Glamour',
                description: 'A bard whose magic is infused with enchantment and charm, influencing minds with ease.',
                hitDieSize: 8,
                primaryAbility: 'charisma',
                savingThrowProficiencies: ['charisma'],
                skillChoices: 4,
                skillProficiencies: ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth'],
                weaponProficiencies: ['Simple weapons', 'Hand crossbows', 'Longswords', 'Rapiers', 'Shortswords'],
                levels: {
                    3: { level: 3, features: ['Mantle of Inspiration'] },
                    6: { level: 6, features: ['Enthralling Performance'] },
                    14: { level: 14, features: ['Unflappable Performance'] }
                }
            },
            {
                name: 'Whispers',
                description: 'A bard who learned their magic in shadows, using it to gather secrets and control others.',
                hitDieSize: 8,
                primaryAbility: 'charisma',
                savingThrowProficiencies: ['charisma'],
                skillChoices: 4,
                skillProficiencies: ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth'],
                weaponProficiencies: ['Simple weapons', 'Hand crossbows', 'Longswords', 'Rapiers', 'Shortswords'],
                levels: {
                    3: { level: 3, features: ['Psychic Blades'] },
                    6: { level: 6, features: ['Words of Terror'] },
                    14: { level: 14, features: ['Mask of Many Faces'] }
                }
            }
        ]
    },

    cleric: {
        name: 'Cleric',
        description: 'Divine magic, as the name suggests, is the power of the gods flowing from some higher plane to the Material Plane. Clerics are conduits for that power.',
        hitDieSize: 8,
        primaryAbility: 'wisdom',
        savingThrowProficiencies: ['wisdom'],
        skillChoices: 2,
        skillProficiencies: ['Insight', 'Medicine', 'Persuasion', 'Religion'],
        armorProficiencies: ['All armor', 'Shields'],
        weaponProficiencies: ['All simple weapons'],
        subclassLevel: 1,

        levels: {
            1: {
                level: 1,
                spellcastingAbility: 'wisdom',
                features: ['Spellcasting', 'Channel Divinity']
            },
            2: {
                level: 2,
                features: ['Channel Divinity Improvements']
            },
            3: {
                level: 3,
                features: ['Divine Domain Feature']
            },
            4: {
                level: 4,
                features: ['Ability Score Improvement']
            },
            5: {
                level: 5,
                features: ['Destroy Undead', 'Channel Divinity Improvements']
            },
            6: {
                level: 6,
                features: ['Divine Domain Feature']
            },
            7: {
                level: 7,
                features: ['Channel Divinity Uses']
            },
            8: {
                level: 8,
                features: ['Ability Score Improvement', 'Divine Strike']
            },
            9: {
                level: 9,
                features: ['Divine Domain Feature']
            },
            10: {
                level: 10,
                features: ['Divine Intervention']
            },
            11: {
                level: 11,
                features: ['Destroy Undead Improvements']
            },
            12: {
                level: 12,
                features: ['Ability Score Improvement']
            },
            13: {
                level: 13,
                features: ['Divine Domain Feature']
            },
            14: {
                level: 14,
                features: ['Divine Strike Improvements', 'Restore Life and Limb']
            },
            15: {
                level: 15,
                features: ['Divine Intervention Improvements']
            },
            16: {
                level: 16,
                features: ['Ability Score Improvement']
            },
            17: {
                level: 17,
                features: ['Divine Domain Feature', 'Improved Fluff']
            },
            18: {
                level: 18,
                features: ['Channel Divinity Frequency']
            },
            19: {
                level: 19,
                features: ['Ability Score Improvement']
            },
            20: {
                level: 20,
                features: ['Divine Intervention Mastery']
            }
        },

        subclasses: [
            {
                name: 'Knowledge',
                description: 'A cleric devoted to gods of knowledge, history, and prophecy.',
                hitDieSize: 8,
                primaryAbility: 'wisdom',
                savingThrowProficiencies: ['wisdom'],
                skillChoices: 2,
                skillProficiencies: ['Insight', 'Medicine', 'Persuasion', 'Religion'],
                armorProficiencies: ['All armor', 'Shields'],
                weaponProficiencies: ['All simple weapons'],
                levels: {
                    1: { level: 1, features: ['Blessing of Knowledge', 'Channel Divinity: Turn Undead'] },
                    2: { level: 2, features: ['Improved Casting'] },
                    6: { level: 6, features: ['Visions of the Past'] },
                    8: { level: 8, features: ['Potent Spellcasting'] },
                    17: { level: 17, features: ['Read Thoughts'] }
                }
            },
            {
                name: 'Life',
                description: 'A cleric devoted to gods of vitality and healing.',
                hitDieSize: 8,
                primaryAbility: 'wisdom',
                savingThrowProficiencies: ['wisdom'],
                skillChoices: 2,
                skillProficiencies: ['Insight', 'Medicine', 'Persuasion', 'Religion'],
                armorProficiencies: ['All armor', 'Shields'],
                weaponProficiencies: ['All simple weapons'],
                levels: {
                    1: { level: 1, features: ['Bonus Proficiencies', 'Disciple of Life'] },
                    6: { level: 6, features: ['Blessed Healer'] },
                    8: { level: 8, features: ['Divine Strike Necrotic'] },
                    17: { level: 17, features: ['Supreme Healing'] }
                }
            },
            {
                name: 'Tempest',
                description: 'A cleric devoted to gods of storms, sea, and sky.',
                hitDieSize: 8,
                primaryAbility: 'wisdom',
                savingThrowProficiencies: ['wisdom'],
                skillChoices: 2,
                skillProficiencies: ['Insight', 'Medicine', 'Persuasion', 'Religion'],
                armorProficiencies: ['All armor', 'Shields'],
                weaponProficiencies: ['All simple weapons'],
                levels: {
                    1: { level: 1, features: ['Bonus Proficiencies', 'Wrath of the Storm'] },
                    6: { level: 6, features: ['Thunderbolt Strike'] },
                    8: { level: 8, features: ['Divine Strike Thunder'] },
                    17: { level: 17, features: ['Stormborn'] }
                }
            },
            {
                name: 'Trickery',
                description: 'A cleric devoted to gods of trickery and deception.',
                hitDieSize: 8,
                primaryAbility: 'wisdom',
                savingThrowProficiencies: ['wisdom'],
                skillChoices: 2,
                skillProficiencies: ['Insight', 'Medicine', 'Persuasion', 'Religion'],
                armorProficiencies: ['All armor', 'Shields'],
                weaponProficiencies: ['All simple weapons'],
                levels: {
                    1: { level: 1, features: ['Blessing of the Trickster', 'Invoke Duplicity'] },
                    6: { level: 6, features: ['Cloak of Shadows'] },
                    8: { level: 8, features: ['Divine Strike Poison'] },
                    17: { level: 17, features: ['Improved Duplicity'] }
                }
            },
            {
                name: 'War',
                description: 'A cleric devoted to gods of battle and conflict.',
                hitDieSize: 8,
                primaryAbility: 'wisdom',
                savingThrowProficiencies: ['wisdom'],
                skillChoices: 2,
                skillProficiencies: ['Insight', 'Medicine', 'Persuasion', 'Religion'],
                armorProficiencies: ['All armor', 'Shields'],
                weaponProficiencies: ['All simple weapons'],
                levels: {
                    1: { level: 1, features: ['Bonus Proficiencies', 'War Priest'] },
                    6: { level: 6, features: ['Guided Strike'] },
                    8: { level: 8, features: ['Divine Strike Weapon'] },
                    17: { level: 17, features: ['Avatar of Battle'] }
                }
            }
        ]
    },

    druid: {
        name: 'Druid',
        description: 'Whether calling on the elemental forces of nature or emulating the creatures of the animal world, druids are an embodiment of nature\'s power.',
        hitDieSize: 8,
        primaryAbility: 'wisdom',
        savingThrowProficiencies: ['intelligence', 'wisdom'],
        skillChoices: 2,
        skillProficiencies: ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival'],
        armorProficiencies: ['Light armor', 'Medium armor'],
        weaponProficiencies: ['Simple melee weapons'],
        subclassLevel: 2,

        levels: {
            1: {
                level: 1,
                spellcastingAbility: 'wisdom',
                features: ['Spellcasting', 'Druidic']
            },
            2: {
                level: 2,
                features: ['Wild Shape']
            },
            3: {
                level: 3,
                features: ['Druid Circle']
            },
            4: {
                level: 4,
                features: ['Ability Score Improvement', 'Wild Shape Improvements']
            },
            5: {
                level: 5,
                features: ['Wild Shape Flying']
            },
            6: {
                level: 6,
                features: ['Circle Feature']
            },
            7: {
                level: 7,
                features: ['Wild Shape Swimming']
            },
            8: {
                level: 8,
                features: ['Ability Score Improvement', 'Wild Shape Improvements']
            },
            9: {
                level: 9,
                features: ['Timeless Body']
            },
            10: {
                level: 10,
                features: ['Circle Feature']
            },
            11: {
                level: 11,
                features: ['Beast Spells']
            },
            12: {
                level: 12,
                features: ['Ability Score Improvement']
            },
            13: {
                level: 13,
                features: ['Wild Shape Improvements']
            },
            14: {
                level: 14,
                features: ['Circle Feature']
            },
            15: {
                level: 15,
                features: ['Thousand Forms']
            },
            16: {
                level: 16,
                features: ['Ability Score Improvement']
            },
            17: {
                level: 17,
                features: ['Wild Shape Improvements']
            },
            18: {
                level: 18,
                features: ['Timeless Body Improvements', 'Beast Spells Improvements']
            },
            19: {
                level: 19,
                features: ['Ability Score Improvement']
            },
            20: {
                level: 20,
                features: ['Archdruid']
            }
        },

        subclasses: [
            {
                name: 'Land',
                description: 'A druid devoted to the wildlands, gaining magic tied to a specific terrain.',
                hitDieSize: 8,
                primaryAbility: 'wisdom',
                savingThrowProficiencies: ['intelligence', 'wisdom'],
                skillChoices: 2,
                skillProficiencies: ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival'],
                armorProficiencies: ['Light armor', 'Medium armor'],
                weaponProficiencies: ['Simple melee weapons'],
                levels: {
                    2: { level: 2, features: ['Bonus Cantrips', 'Natural Recovery'] },
                    6: { level: 6, features: ['Land\'s Stride'] },
                    10: { level: 10, features: ['Nature\'s Sanctuary'] },
                    14: { level: 14, features: ['Nature\'s Wrath'] }
                }
            },
            {
                name: 'Moon',
                description: 'A druid who harnesses the power of the moon for combat and survival.',
                hitDieSize: 8,
                primaryAbility: 'wisdom',
                savingThrowProficiencies: ['intelligence', 'wisdom'],
                skillChoices: 2,
                skillProficiencies: ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival'],
                armorProficiencies: ['Light armor', 'Medium armor'],
                weaponProficiencies: ['Simple melee weapons'],
                levels: {
                    2: { level: 2, features: ['Combat Wild Shape'] },
                    6: { level: 6, features: ['Primal Strike'] },
                    10: { level: 10, features: ['Elemental Wild Shape'] },
                    14: { level: 14, features: ['Thousand Forms'] }
                }
            },
            {
                name: 'Spore',
                description: 'A druid touched by the power of fungi, merging with them for strength.',
                hitDieSize: 8,
                primaryAbility: 'wisdom',
                savingThrowProficiencies: ['intelligence', 'wisdom'],
                skillChoices: 2,
                skillProficiencies: ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival'],
                armorProficiencies: ['Light armor', 'Medium armor'],
                weaponProficiencies: ['Simple melee weapons'],
                levels: {
                    2: { level: 2, features: ['Symbiotic Entity'] },
                    6: { level: 6, features: ['Spore Expansion'] },
                    10: { level: 10, features: ['Fungal Body'] },
                    14: { level: 14, features: ['Infinite Infestation'] }
                }
            }
        ]
    },

    fighter: {
        name: 'Fighter',
        description: 'Fighters share an unparalleled mastery with weapons and armor, and a thorough knowledge of the skills of combat. You fight with unmatched discipline and training.',
        hitDieSize: 10,
        primaryAbility: 'strength',
        savingThrowProficiencies: ['strength', 'constitution'],
        skillChoices: 2,
        skillProficiencies: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival'],
        armorProficiencies: ['All armor', 'Shields'],
        weaponProficiencies: ['All simple and martial weapons'],
        subclassLevel: 3,

        levels: {
            1: {
                level: 1,
                features: ['Fighting Style', 'Second Wind']
            },
            2: {
                level: 2,
                features: ['Action Surge']
            },
            3: {
                level: 3,
                features: ['Martial Archetype']
            },
            4: {
                level: 4,
                features: ['Ability Score Improvement']
            },
            5: {
                level: 5,
                features: ['Extra Attack']
            },
            6: {
                level: 6,
                features: ['Ability Score Improvement']
            },
            7: {
                level: 7,
                features: ['Archetype Feature']
            },
            8: {
                level: 8,
                features: ['Ability Score Improvement']
            },
            9: {
                level: 9,
                features: ['Indomitable']
            },
            10: {
                level: 10,
                features: ['Archetype Feature']
            },
            11: {
                level: 11,
                features: ['Extra Attack Improvements']
            },
            12: {
                level: 12,
                features: ['Ability Score Improvement']
            },
            13: {
                level: 13,
                features: ['Indomitable Improvements']
            },
            14: {
                level: 14,
                features: ['Ability Score Improvement']
            },
            15: {
                level: 15,
                features: ['Archetype Feature']
            },
            16: {
                level: 16,
                features: ['Ability Score Improvement']
            },
            17: {
                level: 17,
                features: ['Action Surge Improvements']
            },
            18: {
                level: 18,
                features: ['Archetype Feature']
            },
            19: {
                level: 19,
                features: ['Ability Score Improvement']
            },
            20: {
                level: 20,
                features: ['Extra Attack 3']
            }
        },

        subclasses: [
            {
                name: 'Champion',
                description: 'A fighter who focuses on martial prowess and enhanced physical capabilities.',
                hitDieSize: 10,
                primaryAbility: 'strength',
                savingThrowProficiencies: ['strength', 'constitution'],
                skillChoices: 2,
                skillProficiencies: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival'],
                armorProficiencies: ['All armor', 'Shields'],
                weaponProficiencies: ['All simple and martial weapons'],
                levels: {
                    3: { level: 3, features: ['Improved Critical'] },
                    7: { level: 7, features: ['Remarkable Athlete'] },
                    10: { level: 10, features: ['Additional Fighting Style'] },
                    15: { level: 15, features: ['Superior Critical'] },
                    18: { level: 18, features: ['Survivor'] }
                }
            },
            {
                name: 'Battle Master',
                description: 'A fighter who uses tactical knowledge and maneuvers to outthink and outmaneuver opponents.',
                hitDieSize: 10,
                primaryAbility: 'strength',
                savingThrowProficiencies: ['strength', 'constitution'],
                skillChoices: 2,
                skillProficiencies: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival'],
                armorProficiencies: ['All armor', 'Shields'],
                weaponProficiencies: ['All simple and martial weapons'],
                levels: {
                    3: { level: 3, features: ['Combat Superiority', 'Know Your Enemy'] },
                    7: { level: 7, features: ['Additional Maneuvers'] },
                    10: { level: 10, features: ['Improved Combat Superiority'] },
                    15: { level: 15, features: ['Relentless', 'Additional Maneuvers'] },
                    18: { level: 18, features: ['Master of Combat'] }
                }
            },
            {
                name: 'Eldritch Knight',
                description: 'A fighter who blends martial mastery with spellcasting.',
                hitDieSize: 10,
                primaryAbility: 'strength',
                savingThrowProficiencies: ['strength', 'constitution'],
                skillChoices: 2,
                skillProficiencies: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival'],
                armorProficiencies: ['All armor', 'Shields'],
                weaponProficiencies: ['All simple and martial weapons'],
                levels: {
                    3: { level: 3, spellcastingAbility: 'intelligence', features: ['Spellcasting', 'Weapon Bond'] },
                    7: { level: 7, features: ['War Magic'] },
                    10: { level: 10, features: ['Improved War Magic'] },
                    15: { level: 15, features: ['Eldritch Strike'] },
                    18: { level: 18, features: ['Arcane Charge'] }
                }
            },
            {
                name: 'Rune Knight',
                description: 'A fighter who channels the power of runes for magical effects.',
                hitDieSize: 10,
                primaryAbility: 'strength',
                savingThrowProficiencies: ['strength', 'constitution'],
                skillChoices: 2,
                skillProficiencies: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival'],
                armorProficiencies: ['All armor', 'Shields'],
                weaponProficiencies: ['All simple and martial weapons'],
                levels: {
                    3: { level: 3, features: ['Rune Carver'] },
                    7: { level: 7, features: ['Giant Might'] },
                    10: { level: 10, features: ['Rune Magic'] },
                    15: { level: 15, features: ['Rune Mastery'] },
                    18: { level: 18, features: ['Runic Juggernaut'] }
                }
            }
        ]
    },

    monk: {
        name: 'Monk',
        description: 'Monks are united in their ability to magically harness the energy that flows in their bodies. Whether channeled as a striking display of combat prowess or a subtler focus of defensive ability and speed, this energy infuses all that a monk does.',
        hitDieSize: 8,
        primaryAbility: 'dexterity',
        savingThrowProficiencies: ['strength', 'dexterity'],
        skillChoices: 1,
        skillProficiencies: ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth'],
        weaponProficiencies: ['Simple melee weapons', 'Shortswords'],
        subclassLevel: 3,

        levels: {
            1: {
                level: 1,
                features: ['Unarmored Defense', 'Martial Arts']
            },
            2: {
                level: 2,
                features: ['Ki', 'Unarmored Movement']
            },
            3: {
                level: 3,
                features: ['Monastic Tradition']
            },
            4: {
                level: 4,
                features: ['Ability Score Improvement', 'Slow Fall']
            },
            5: {
                level: 5,
                features: ['Extra Attack', 'Stunning Strike']
            },
            6: {
                level: 6,
                features: ['Ki-Empowered Strikes', 'Tradition Feature']
            },
            7: {
                level: 7,
                features: ['Evasion', 'Stillness of Mind']
            },
            8: {
                level: 8,
                features: ['Ability Score Improvement']
            },
            9: {
                level: 9,
                features: ['Unarmored Movement Improvements']
            },
            10: {
                level: 10,
                features: ['Purity of Body', 'Tradition Feature']
            },
            11: {
                level: 11,
                features: ['Diamond Soul']
            },
            12: {
                level: 12,
                features: ['Ability Score Improvement']
            },
            13: {
                level: 13,
                features: ['Tongue of the Sun and Moon']
            },
            14: {
                level: 14,
                features: ['Diamond Soul Improvements', 'Tradition Feature']
            },
            15: {
                level: 15,
                features: ['Timeless Body']
            },
            16: {
                level: 16,
                features: ['Ability Score Improvement']
            },
            17: {
                level: 17,
                features: ['Empty Body']
            },
            18: {
                level: 18,
                features: ['Unarmored Movement Improvements', 'Tradition Feature']
            },
            19: {
                level: 19,
                features: ['Ability Score Improvement']
            },
            20: {
                level: 20,
                features: ['Perfect Self']
            }
        },

        subclasses: [
            {
                name: 'Open Hand',
                description: 'A monk who masters combat with empty hands and body.',
                hitDieSize: 8,
                primaryAbility: 'dexterity',
                savingThrowProficiencies: ['strength', 'dexterity'],
                skillChoices: 1,
                skillProficiencies: ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth'],
                weaponProficiencies: ['Simple melee weapons', 'Shortswords'],
                levels: {
                    3: { level: 3, features: ['Open Hand Technique'] },
                    6: { level: 6, features: ['Wholeness of Body'] },
                    11: { level: 11, features: ['Tranquility'] },
                    17: { level: 17, features: ['Quivering Palm'] }
                }
            },
            {
                name: 'Shadow',
                description: 'A monk trained in the ways of stealth and shadow magic.',
                hitDieSize: 8,
                primaryAbility: 'dexterity',
                savingThrowProficiencies: ['strength', 'dexterity'],
                skillChoices: 1,
                skillProficiencies: ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth'],
                weaponProficiencies: ['Simple melee weapons', 'Shortswords'],
                levels: {
                    3: { level: 3, features: ['Shadow Arts'] },
                    6: { level: 6, features: ['Shadow Step'] },
                    11: { level: 11, features: ['Cloak of Shadows'] },
                    17: { level: 17, features: ['Shadow Magic'] }
                }
            },
            {
                name: 'Four Elements',
                description: 'A monk who channels the elemental forces of the world.',
                hitDieSize: 8,
                primaryAbility: 'dexterity',
                savingThrowProficiencies: ['strength', 'dexterity'],
                skillChoices: 1,
                skillProficiencies: ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth'],
                weaponProficiencies: ['Simple melee weapons', 'Shortswords'],
                levels: {
                    3: { level: 3, features: ['Discipline of the Elements'] },
                    6: { level: 6, features: ['Elemental Attunement'] },
                    11: { level: 11, features: ['Improved Attunement'] },
                    17: { level: 17, features: ['Master of the Elements'] }
                }
            }
        ]
    },

    paladin: {
        name: 'Paladin',
        description: 'Whatever their origin and their mission, paladins are united by their oaths that grant them power to do more than a mundane warrior could ever accomplish.',
        hitDieSize: 10,
        primaryAbility: 'strength',
        savingThrowProficiencies: ['wisdom', 'charisma'],
        skillChoices: 2,
        skillProficiencies: ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion'],
        armorProficiencies: ['All armor', 'Shields'],
        weaponProficiencies: ['All simple and martial weapons'],
        subclassLevel: 3,

        levels: {
            1: {
                level: 1,
                features: ['Divine Sense', 'Lay on Hands']
            },
            2: {
                level: 2,
                spellcastingAbility: 'charisma',
                features: ['Fighting Style', 'Spellcasting']
            },
            3: {
                level: 3,
                features: ['Divine Smite', 'Sacred Oath']
            },
            4: {
                level: 4,
                features: ['Ability Score Improvement']
            },
            5: {
                level: 5,
                features: ['Extra Attack']
            },
            6: {
                level: 6,
                features: ['Aura of Protection']
            },
            7: {
                level: 7,
                features: ['Oath Feature']
            },
            8: {
                level: 8,
                features: ['Ability Score Improvement']
            },
            9: {
                level: 9,
                features: ['Improved Divine Smite']
            },
            10: {
                level: 10,
                features: ['Aura of Courage']
            },
            11: {
                level: 11,
                features: ['Improved Divine Smite']
            },
            12: {
                level: 12,
                features: ['Ability Score Improvement']
            },
            13: {
                level: 13,
                features: ['Oath Feature']
            },
            14: {
                level: 14,
                features: ['Cleansing Touch']
            },
            15: {
                level: 15,
                features: ['Improved Auras']
            },
            16: {
                level: 16,
                features: ['Ability Score Improvement']
            },
            17: {
                level: 17,
                features: ['Oath Feature']
            },
            18: {
                level: 18,
                features: ['Aura Improvements']
            },
            19: {
                level: 19,
                features: ['Ability Score Improvement']
            },
            20: {
                level: 20,
                features: ['Holy Nimbus']
            }
        },

        subclasses: [
            {
                name: 'Devotion',
                description: 'A paladin devoted to law and justice.',
                hitDieSize: 10,
                primaryAbility: 'strength',
                savingThrowProficiencies: ['wisdom', 'charisma'],
                skillChoices: 2,
                skillProficiencies: ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion'],
                armorProficiencies: ['All armor', 'Shields'],
                weaponProficiencies: ['All simple and martial weapons'],
                levels: {
                    3: { level: 3, features: ['Oath Spells', 'Channel Divinity'] },
                    7: { level: 7, features: ['Aura of Devotion'] },
                    15: { level: 15, features: ['Purity of Spirit'] },
                    20: { level: 20, features: ['Holy Nimbus'] }
                }
            },
            {
                name: 'Ancients',
                description: 'A paladin devoted to the old ways of nature.',
                hitDieSize: 10,
                primaryAbility: 'strength',
                savingThrowProficiencies: ['wisdom', 'charisma'],
                skillChoices: 2,
                skillProficiencies: ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion'],
                armorProficiencies: ['All armor', 'Shields'],
                weaponProficiencies: ['All simple and martial weapons'],
                levels: {
                    3: { level: 3, features: ['Oath Spells', 'Channel Divinity'] },
                    7: { level: 7, features: ['Undying Sentinel'] },
                    15: { level: 15, features: ['Elder Champion'] },
                    20: { level: 20, features: ['Timeless Body'] }
                }
            },
            {
                name: 'Vengeance',
                description: 'A paladin devoted to the pursuit of vengeance.',
                hitDieSize: 10,
                primaryAbility: 'strength',
                savingThrowProficiencies: ['wisdom', 'charisma'],
                skillChoices: 2,
                skillProficiencies: ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion'],
                armorProficiencies: ['All armor', 'Shields'],
                weaponProficiencies: ['All simple and martial weapons'],
                levels: {
                    3: { level: 3, features: ['Oath Spells', 'Abjure Enemy'] },
                    7: { level: 7, features: ['Vow of Enmity'] },
                    15: { level: 15, features: ['Soul of Vengeance'] },
                    20: { level: 20, features: ['Avenging Angel'] }
                }
            }
        ]
    },

    ranger: {
        name: 'Ranger',
        description: 'Rangers are skilled hunters and trackers, at home in the wilderness and deadly in a fight. Cunning and ruthless, they are at their best on the edge of civilization, where their talents are equally useful in a reasonably settled place.',
        hitDieSize: 10,
        primaryAbility: 'dexterity',
        savingThrowProficiencies: ['strength', 'dexterity'],
        skillChoices: 3,
        skillProficiencies: ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival'],
        armorProficiencies: ['Light armor', 'Medium armor'],
        weaponProficiencies: ['All simple and martial weapons'],
        subclassLevel: 3,

        levels: {
            1: {
                level: 1,
                features: ['Favored Enemy', 'Natural Explorer']
            },
            2: {
                level: 2,
                spellcastingAbility: 'wisdom',
                features: ['Fighting Style', 'Spellcasting']
            },
            3: {
                level: 3,
                features: ['Ranger Archetype', 'Primeval Awareness']
            },
            4: {
                level: 4,
                features: ['Ability Score Improvement']
            },
            5: {
                level: 5,
                features: ['Extra Attack']
            },
            6: {
                level: 6,
                features: ['Favored Enemy Improvements']
            },
            7: {
                level: 7,
                features: ['Wanderer']
            },
            8: {
                level: 8,
                features: ['Ability Score Improvement']
            },
            9: {
                level: 9,
                features: ['Ranger Archetype Feature']
            },
            10: {
                level: 10,
                features: ['Natural Explorer Improvements']
            },
            11: {
                level: 11,
                features: ['Greater Favored Enemy']
            },
            12: {
                level: 12,
                features: ['Ability Score Improvement']
            },
            13: {
                level: 13,
                features: ['Ranger Archetype Feature']
            },
            14: {
                level: 14,
                features: ['Vanish']
            },
            15: {
                level: 15,
                features: ['Superior Explorer']
            },
            16: {
                level: 16,
                features: ['Ability Score Improvement']
            },
            17: {
                level: 17,
                features: ['Ranger Archetype Feature']
            },
            18: {
                level: 18,
                features: ['Feral Senses']
            },
            19: {
                level: 19,
                features: ['Ability Score Improvement']
            },
            20: {
                level: 20,
                features: ['Foe Slayer']
            }
        },

        subclasses: [
            {
                name: 'Hunter',
                description: 'A ranger who specializes in hunting down prey.',
                hitDieSize: 10,
                primaryAbility: 'dexterity',
                savingThrowProficiencies: ['strength', 'dexterity'],
                skillChoices: 3,
                skillProficiencies: ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival'],
                armorProficiencies: ['Light armor', 'Medium armor'],
                weaponProficiencies: ['All simple and martial weapons'],
                levels: {
                    3: { level: 3, features: ['Hunter\'s Prey'] },
                    7: { level: 7, features: ['Defensive Tactics'] },
                    11: { level: 11, features: ['Multiattack'] },
                    15: { level: 15, features: ['Superior Hunter\'s Defense'] }
                }
            },
            {
                name: 'Beast Master',
                description: 'A ranger bonded with an animal companion.',
                hitDieSize: 10,
                primaryAbility: 'dexterity',
                savingThrowProficiencies: ['strength', 'dexterity'],
                skillChoices: 3,
                skillProficiencies: ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival'],
                armorProficiencies: ['Light armor', 'Medium armor'],
                weaponProficiencies: ['All simple and martial weapons'],
                levels: {
                    3: { level: 3, features: ['Ranger\'s Companion'] },
                    7: { level: 7, features: ['Exceptional Training'] },
                    11: { level: 11, features: ['Bestial Fury'] },
                    15: { level: 15, features: ['Share Spells'] }
                }
            },
            {
                name: 'Gloom Stalker',
                description: 'A ranger adapted to life in underground darkness.',
                hitDieSize: 10,
                primaryAbility: 'dexterity',
                savingThrowProficiencies: ['strength', 'dexterity'],
                skillChoices: 3,
                skillProficiencies: ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival'],
                armorProficiencies: ['Light armor', 'Medium armor'],
                weaponProficiencies: ['All simple and martial weapons'],
                levels: {
                    3: { level: 3, features: ['Dread Ambusher', 'Umbral Sight'] },
                    7: { level: 7, features: ['Iron Mind'] },
                    11: { level: 11, features: ['Shadow Stalker'] },
                    15: { level: 15, features: ['Shadowy Dodge'] }
                }
            }
        ]
    },

    rogue: {
        name: 'Rogue',
        description: 'Rogues rely on skill, stealth, and their deadly sneak attacks to even the odds in any fight. They have no code of honor, and rightly fear neither the law nor the forces of organized order.',
        hitDieSize: 8,
        primaryAbility: 'dexterity',
        savingThrowProficiencies: ['dexterity', 'intelligence'],
        skillChoices: 4,
        skillProficiencies: ['Acrobatics', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth'],
        weaponProficiencies: ['Simple melee weapons', 'Hand crossbows', 'Longswords', 'Rapiers', 'Shortswords'],
        subclassLevel: 3,

        levels: {
            1: {
                level: 1,
                features: ['Expertise', 'Sneak Attack']
            },
            2: {
                level: 2,
                features: ['Cunning Action']
            },
            3: {
                level: 3,
                features: ['Roguish Archetype']
            },
            4: {
                level: 4,
                features: ['Ability Score Improvement']
            },
            5: {
                level: 5,
                features: ['Uncanny Dodge']
            },
            6: {
                level: 6,
                features: ['Expertise Improvements']
            },
            7: {
                level: 7,
                features: ['Evasion']
            },
            8: {
                level: 8,
                features: ['Ability Score Improvement']
            },
            9: {
                level: 9,
                features: ['Roguish Archetype Feature']
            },
            10: {
                level: 10,
                features: ['Ability Score Improvement']
            },
            11: {
                level: 11,
                features: ['Reliable Talent']
            },
            12: {
                level: 12,
                features: ['Ability Score Improvement']
            },
            13: {
                level: 13,
                features: ['Roguish Archetype Feature']
            },
            14: {
                level: 14,
                features: ['Blindsense']
            },
            15: {
                level: 15,
                features: ['Slippery Mind']
            },
            16: {
                level: 16,
                features: ['Ability Score Improvement']
            },
            17: {
                level: 17,
                features: ['Roguish Archetype Feature']
            },
            18: {
                level: 18,
                features: ['Elusive']
            },
            19: {
                level: 19,
                features: ['Ability Score Improvement']
            },
            20: {
                level: 20,
                features: ['Stroke of Luck']
            }
        },

        subclasses: [
            {
                name: 'Thief',
                description: 'A rogue who specializes in theft and sleight of hand.',
                hitDieSize: 8,
                primaryAbility: 'dexterity',
                savingThrowProficiencies: ['dexterity', 'intelligence'],
                skillChoices: 4,
                skillProficiencies: ['Acrobatics', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth'],
                weaponProficiencies: ['Simple melee weapons', 'Hand crossbows', 'Longswords', 'Rapiers', 'Shortswords'],
                levels: {
                    3: { level: 3, features: ['Fast Hands'] },
                    9: { level: 9, features: ['Second-Story Work'] },
                    13: { level: 13, features: ['Supreme Sneak'] },
                    17: { level: 17, features: ['Use Magic Device'] }
                }
            },
            {
                name: 'Assassin',
                description: 'A rogue trained in the art of murder and deception.',
                hitDieSize: 8,
                primaryAbility: 'dexterity',
                savingThrowProficiencies: ['dexterity', 'intelligence'],
                skillChoices: 4,
                skillProficiencies: ['Acrobatics', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth'],
                weaponProficiencies: ['Simple melee weapons', 'Hand crossbows', 'Longswords', 'Rapiers', 'Shortswords'],
                levels: {
                    3: { level: 3, features: ['Assassinate'] },
                    9: { level: 9, features: ['Assassinate Improvements'] },
                    13: { level: 13, features: ['Sudden Strike'] },
                    17: { level: 17, features: ['Death Strike'] }
                }
            },
            {
                name: 'Arcane Trickster',
                description: 'A rogue who blends spellcasting with trickery.',
                hitDieSize: 8,
                primaryAbility: 'dexterity',
                savingThrowProficiencies: ['dexterity', 'intelligence'],
                skillChoices: 4,
                skillProficiencies: ['Acrobatics', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth'],
                weaponProficiencies: ['Simple melee weapons', 'Hand crossbows', 'Longswords', 'Rapiers', 'Shortswords'],
                levels: {
                    3: { level: 3, spellcastingAbility: 'intelligence', features: ['Spellcasting', 'Mage Hand Legerdemain'] },
                    9: { level: 9, features: ['Magical Ambush'] },
                    13: { level: 13, features: ['Versatile Trickster'] },
                    17: { level: 17, features: ['Spell Thief'] }
                }
            },
            {
                name: 'Inquisitive',
                description: 'A rogue who uses keen insight and detection to outwit enemies.',
                hitDieSize: 8,
                primaryAbility: 'dexterity',
                savingThrowProficiencies: ['dexterity', 'intelligence'],
                skillChoices: 4,
                skillProficiencies: ['Acrobatics', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth'],
                weaponProficiencies: ['Simple melee weapons', 'Hand crossbows', 'Longswords', 'Rapiers', 'Shortswords'],
                levels: {
                    3: { level: 3, features: ['Ear for Deceit'] },
                    9: { level: 9, features: ['Insightful Fighting'] },
                    13: { level: 13, features: ['Steady Eye'] },
                    17: { level: 17, features: ['Unerring Eye'] }
                }
            }
        ]
    },

    sorcerer: {
        name: 'Sorcerer',
        description: 'Sorcerers carry a magical birthright conferred upon them by an exotic bloodline, some otherworldly influence, or exposure to unknown cosmic forces. Nobody chooses sorcery; the power chooses the sorcerer.',
        hitDieSize: 6,
        primaryAbility: 'charisma',
        savingThrowProficiencies: ['charisma'],
        skillChoices: 2,
        skillProficiencies: ['Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion'],
        weaponProficiencies: ['Daggers', 'Darts', 'Slings', 'Quarterstaffs', 'Light crossbows'],
        subclassLevel: 1,

        levels: {
            1: {
                level: 1,
                spellcastingAbility: 'charisma',
                features: ['Spellcasting', 'Sorcerous Origin']
            },
            2: {
                level: 2,
                features: ['Font of Magic']
            },
            3: {
                level: 3,
                features: ['Metamagic']
            },
            4: {
                level: 4,
                features: ['Ability Score Improvement']
            },
            5: {
                level: 5,
                features: ['Sorcerous Restoration']
            },
            6: {
                level: 6,
                features: ['Origin Feature']
            },
            7: {
                level: 7,
                features: ['Metamagic Options']
            },
            8: {
                level: 8,
                features: ['Ability Score Improvement']
            },
            9: {
                level: 9,
                features: ['Origin Feature']
            },
            10: {
                level: 10,
                features: ['Metamagic Mastery']
            },
            11: {
                level: 11,
                features: ['Font of Magic Improvements']
            },
            12: {
                level: 12,
                features: ['Ability Score Improvement']
            },
            13: {
                level: 13,
                features: ['Origin Feature']
            },
            14: {
                level: 14,
                features: ['Sorcerous Restoration Improvements']
            },
            15: {
                level: 15,
                features: ['Metamagic Flexibility']
            },
            16: {
                level: 16,
                features: ['Ability Score Improvement']
            },
            17: {
                level: 17,
                features: ['Origin Feature']
            },
            18: {
                level: 18,
                features: ['Font of Magic Improvements']
            },
            19: {
                level: 19,
                features: ['Ability Score Improvement']
            },
            20: {
                level: 20,
                features: ['Sorcerous Restoration Mastery']
            }
        },

        subclasses: [
            {
                name: 'Draconic Bloodline',
                description: 'A sorcerer descended from dragons.',
                hitDieSize: 6,
                primaryAbility: 'charisma',
                savingThrowProficiencies: ['charisma'],
                skillChoices: 2,
                skillProficiencies: ['Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion'],
                weaponProficiencies: ['Daggers', 'Darts', 'Slings', 'Quarterstaffs', 'Light crossbows'],
                levels: {
                    1: { level: 1, features: ['Dragon Ancestor', 'Draconic Resilience'] },
                    6: { level: 6, features: ['Elemental Affinity'] },
                    14: { level: 14, features: ['Dragon Wings'] },
                    18: { level: 18, features: ['Draconic Presence'] }
                }
            },
            {
                name: 'Wild Magic',
                description: 'A sorcerer touched by wild, unpredictable magic.',
                hitDieSize: 6,
                primaryAbility: 'charisma',
                savingThrowProficiencies: ['charisma'],
                skillChoices: 2,
                skillProficiencies: ['Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion'],
                weaponProficiencies: ['Daggers', 'Darts', 'Slings', 'Quarterstaffs', 'Light crossbows'],
                levels: {
                    1: { level: 1, features: ['Wild Magic Surge', 'Tides of Chaos'] },
                    6: { level: 6, features: ['Bend Luck'] },
                    14: { level: 14, features: ['Controlled Chaos'] },
                    18: { level: 18, features: ['Spell Bombardment'] }
                }
            },
            {
                name: 'Shadow Magic',
                description: 'A sorcerer descended from the Shadowfell.',
                hitDieSize: 6,
                primaryAbility: 'charisma',
                savingThrowProficiencies: ['charisma'],
                skillChoices: 2,
                skillProficiencies: ['Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion'],
                weaponProficiencies: ['Daggers', 'Darts', 'Slings', 'Quarterstaffs', 'Light crossbows'],
                levels: {
                    1: { level: 1, features: ['Eyes of the Dark', 'Strength of the Grave'] },
                    6: { level: 6, features: ['Hound of Ill Omen'] },
                    14: { level: 14, features: ['Shadow Walk'] },
                    18: { level: 18, features: ['Improved Shadow Magic'] }
                }
            }
        ]
    },

    warlock: {
        name: 'Warlock',
        description: 'Warlocks are seekers of the knowledge that lies hidden in the fabric of the multiverse. Through pacts made with mysterious beings of incredible power, warlocks unlock magical effects both subtle and spectacular.',
        hitDieSize: 8,
        primaryAbility: 'charisma',
        savingThrowProficiencies: ['wisdom'],
        skillChoices: 2,
        skillProficiencies: ['Arcana', 'Deception', 'History', 'Insight', 'Investigation', 'Nature', 'Religion'],
        weaponProficiencies: ['Simple weapons'],
        subclassLevel: 1,

        levels: {
            1: {
                level: 1,
                spellcastingAbility: 'charisma',
                features: ['Otherworldly Patron', 'Pact Magic']
            },
            2: {
                level: 2,
                features: ['Eldritch Invocations']
            },
            3: {
                level: 3,
                features: ['Pact Boon']
            },
            4: {
                level: 4,
                features: ['Ability Score Improvement']
            },
            5: {
                level: 5,
                features: ['Eldritch Invocations Improvements']
            },
            6: {
                level: 6,
                features: ['Patron Feature']
            },
            7: {
                level: 7,
                features: ['One with Shadows']
            },
            8: {
                level: 8,
                features: ['Ability Score Improvement']
            },
            9: {
                level: 9,
                features: ['Eldritch Master']
            },
            10: {
                level: 10,
                features: ['Patron Feature', 'Eldritch Invocations Improvements']
            },
            11: {
                level: 11,
                features: ['Mystic Arcanum 6']
            },
            12: {
                level: 12,
                features: ['Ability Score Improvement']
            },
            13: {
                level: 13,
                features: ['Mystic Arcanum 7']
            },
            14: {
                level: 14,
                features: ['Patron Feature']
            },
            15: {
                level: 15,
                features: ['Mystic Arcanum 8']
            },
            16: {
                level: 16,
                features: ['Ability Score Improvement']
            },
            17: {
                level: 17,
                features: ['Mystic Arcanum 9', 'Eldritch Invocations Improvements']
            },
            18: {
                level: 18,
                features: ['Patron Feature']
            },
            19: {
                level: 19,
                features: ['Ability Score Improvement']
            },
            20: {
                level: 20,
                features: ['Eldritch Master Mastery']
            }
        },

        subclasses: [
            {
                name: 'Fiend',
                description: 'A warlock bound to a fiendish patron.',
                hitDieSize: 8,
                primaryAbility: 'charisma',
                savingThrowProficiencies: ['wisdom'],
                skillChoices: 2,
                skillProficiencies: ['Arcana', 'Deception', 'History', 'Insight', 'Investigation', 'Nature', 'Religion'],
                weaponProficiencies: ['Simple weapons'],
                levels: {
                    1: { level: 1, features: ['Dark One\'s Blessing'] },
                    6: { level: 6, features: ['Dark One\'s Own Luck'] },
                    10: { level: 10, features: ['Fiendish Resilience'] },
                    14: { level: 14, features: ['Hurl Through Hell'] }
                }
            },
            {
                name: 'Great Old One',
                description: 'A warlock bound to an ancient cosmic entity.',
                hitDieSize: 8,
                primaryAbility: 'charisma',
                savingThrowProficiencies: ['wisdom'],
                skillChoices: 2,
                skillProficiencies: ['Arcana', 'Deception', 'History', 'Insight', 'Investigation', 'Nature', 'Religion'],
                weaponProficiencies: ['Simple weapons'],
                levels: {
                    1: { level: 1, features: ['Awakened Mind'] },
                    6: { level: 6, features: ['Entropic Ward'] },
                    10: { level: 10, features: ['Thought Shield'] },
                    14: { level: 14, features: ['Create Thrall'] }
                }
            },
            {
                name: 'Hexblade',
                description: 'A warlock bound to a sentient weapon or its creator.',
                hitDieSize: 8,
                primaryAbility: 'charisma',
                savingThrowProficiencies: ['wisdom'],
                skillChoices: 2,
                skillProficiencies: ['Arcana', 'Deception', 'History', 'Insight', 'Investigation', 'Nature', 'Religion'],
                weaponProficiencies: ['Simple weapons'],
                levels: {
                    1: { level: 1, features: ['Hexblade\'s Curse'] },
                    6: { level: 6, features: ['Accursed Specter'] },
                    10: { level: 10, features: ['Armor of Hexes'] },
                    14: { level: 14, features: ['Master of Hexes'] }
                }
            }
        ]
    },

    wizard: {
        name: 'Wizard',
        description: 'Wizards are supreme magic-users, defined and united as a class by the spells they cast. Drawing on the book learning of the arcane magic, wizards cast spells of explosive power and subtle deception.',
        hitDieSize: 6,
        primaryAbility: 'intelligence',
        savingThrowProficiencies: ['intelligence', 'wisdom'],
        skillChoices: 2,
        skillProficiencies: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'],
        weaponProficiencies: ['Daggers', 'Darts', 'Slings', 'Quarterstaffs', 'Light crossbows'],
        subclassLevel: 2,

        levels: {
            1: {
                level: 1,
                spellcastingAbility: 'intelligence',
                features: ['Spellcasting', 'Arcane Recovery']
            },
            2: {
                level: 2,
                features: ['Arcane Tradition']
            },
            3: {
                level: 3,
                features: ['Tradition Feature']
            },
            4: {
                level: 4,
                features: ['Ability Score Improvement']
            },
            5: {
                level: 5,
                features: ['Tradition Feature']
            },
            6: {
                level: 6,
                features: ['Arcane Tradition Features']
            },
            7: {
                level: 7,
                features: ['Tradition Feature']
            },
            8: {
                level: 8,
                features: ['Ability Score Improvement']
            },
            9: {
                level: 9,
                features: ['Tradition Feature']
            },
            10: {
                level: 10,
                features: ['Spell Mastery']
            },
            11: {
                level: 11,
                features: ['Tradition Feature']
            },
            12: {
                level: 12,
                features: ['Ability Score Improvement']
            },
            13: {
                level: 13,
                features: ['Tradition Feature']
            },
            14: {
                level: 14,
                features: ['One with Shadows']
            },
            15: {
                level: 15,
                features: ['Tradition Feature']
            },
            16: {
                level: 16,
                features: ['Ability Score Improvement']
            },
            17: {
                level: 17,
                features: ['Tradition Feature']
            },
            18: {
                level: 18,
                features: ['Spell Mastery Improvements']
            },
            19: {
                level: 19,
                features: ['Ability Score Improvement']
            },
            20: {
                level: 20,
                features: ['Signature Spells']
            }
        },

        subclasses: [
            {
                name: 'Evocation',
                description: 'A wizard specializing in destructive magic.',
                hitDieSize: 6,
                primaryAbility: 'intelligence',
                savingThrowProficiencies: ['intelligence', 'wisdom'],
                skillChoices: 2,
                skillProficiencies: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'],
                weaponProficiencies: ['Daggers', 'Darts', 'Slings', 'Quarterstaffs', 'Light crossbows'],
                levels: {
                    2: { level: 2, features: ['Evocation Savant', 'Sculpt Spells'] },
                    6: { level: 6, features: ['Potent Cantrip'] },
                    10: { level: 10, features: ['Empowered Evocation'] },
                    14: { level: 14, features: ['Overchannel'] }
                }
            },
            {
                name: 'Abjuration',
                description: 'A wizard specializing in protective magic.',
                hitDieSize: 6,
                primaryAbility: 'intelligence',
                savingThrowProficiencies: ['intelligence', 'wisdom'],
                skillChoices: 2,
                skillProficiencies: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'],
                weaponProficiencies: ['Daggers', 'Darts', 'Slings', 'Quarterstaffs', 'Light crossbows'],
                levels: {
                    2: { level: 2, features: ['Abjuration Savant', 'Arcane Ward'] },
                    6: { level: 6, features: ['Projected Ward'] },
                    10: { level: 10, features: ['Improved Abjuration'] },
                    14: { level: 14, features: ['Spell Resistance'] }
                }
            },
            {
                name: 'Enchantment',
                description: 'A wizard specializing in mind-affecting magic.',
                hitDieSize: 6,
                primaryAbility: 'intelligence',
                savingThrowProficiencies: ['intelligence', 'wisdom'],
                skillChoices: 2,
                skillProficiencies: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'],
                weaponProficiencies: ['Daggers', 'Darts', 'Slings', 'Quarterstaffs', 'Light crossbows'],
                levels: {
                    2: { level: 2, features: ['Enchantment Savant', 'Hypnotic Gaze'] },
                    6: { level: 6, features: ['Instinctive Charm'] },
                    10: { level: 10, features: ['Split Enchantment'] },
                    14: { level: 14, features: ['Alter Memories'] }
                }
            },
            {
                name: 'Divination',
                description: 'A wizard specializing in magic of sight and knowledge.',
                hitDieSize: 6,
                primaryAbility: 'intelligence',
                savingThrowProficiencies: ['intelligence', 'wisdom'],
                skillChoices: 2,
                skillProficiencies: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'],
                weaponProficiencies: ['Daggers', 'Darts', 'Slings', 'Quarterstaffs', 'Light crossbows'],
                levels: {
                    2: { level: 2, features: ['Divination Savant', 'Portent'] },
                    6: { level: 6, features: ['Expert Divination'] },
                    10: { level: 10, features: ['Magnificent Mind'] },
                    14: { level: 14, features: ['Vision'] }
                }
            },
            {
                name: 'Necromancy',
                description: 'A wizard specializing in magic of death and undeath.',
                hitDieSize: 6,
                primaryAbility: 'intelligence',
                savingThrowProficiencies: ['intelligence', 'wisdom'],
                skillChoices: 2,
                skillProficiencies: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'],
                weaponProficiencies: ['Daggers', 'Darts', 'Slings', 'Quarterstaffs', 'Light crossbows'],
                levels: {
                    2: { level: 2, features: ['Necromancy Savant', 'Grim Harvest'] },
                    6: { level: 6, features: ['Undead Thralls'] },
                    10: { level: 10, features: ['Inured to Undeath'] },
                    14: { level: 14, features: ['Command Undead'] }
                }
            },
            {
                name: 'Transmutation',
                description: 'A wizard specializing in magic of transformation.',
                hitDieSize: 6,
                primaryAbility: 'intelligence',
                savingThrowProficiencies: ['intelligence', 'wisdom'],
                skillChoices: 2,
                skillProficiencies: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'],
                weaponProficiencies: ['Daggers', 'Darts', 'Slings', 'Quarterstaffs', 'Light crossbows'],
                levels: {
                    2: { level: 2, features: ['Transmutation Savant', 'Minor Alchemy'] },
                    6: { level: 6, features: ['Magical Experiment'] },
                    10: { level: 10, features: ['Transmuter\'s Stone'] },
                    14: { level: 14, features: ['Master Transmuter'] }
                }
            }
        ]
    }
};

// Get features for a specific level
export function getFeaturesForLevel(classData: ClassData, level: number): string[] {
    const levelData = classData.levels[level];
    return levelData?.features ?? [];
}

// Check if spellcasting is unlocked at a given level
export function getSpellcastingAbilityAtLevel(
    classData: ClassData,
    level: number
): SpellcastingAbility | null {
    // Check from level 1 up to the requested level
    for (let i = level; i >= 1; i--) {
        if (classData.levels[i]?.spellcastingAbility) {
            return classData.levels[i].spellcastingAbility || null;
        }
    }
    return null;
}

export type ClassKey = keyof typeof classesData;
export const classList = Object.keys(classesData) as ClassKey[];

export function buildFullClass(classData: ClassData, character: Character, level: number = 1, subclassData?: ClassData): Class {
    // Get features accumulated up to this level
    const features: Feature[] = [];
    const featureNames = new Set<string>();

    // Base class features
    for (let i = 1; i <= level; i++) {
        (classData.levels[i]?.features ?? []).forEach(f => featureNames.add(f));
    }

    // Subclass features if applicable
    if (subclassData && level >= (classData.subclassLevel ?? 1)) {
        for (let i = classData.subclassLevel ?? 1; i <= level; i++) {
            (subclassData.levels[i]?.features ?? []).forEach(f => featureNames.add(f));
        }
    }

    // Resolve feature names to Feature objects
    featureNames.forEach(featureName => {
        const feature = getFeatureById(featureName);
        if (feature) {
            features.push(feature);
        }
    });

    // Get spellcasting ability at this level
    const spellcastingAbility = getSpellcastingAbilityAtLevel(classData, level)
        ?? (subclassData ? getSpellcastingAbilityAtLevel(subclassData, level) : null);

    // Build subclasses
    const subclasses: Subclass[] | undefined = !subclassData && classData.subclasses
        ? classData.subclasses.map(subclassData => buildSubclassFromData(subclassData, character))
        : undefined;

    return {
        id: classData.name.toLowerCase().replace(/\s+/g, '-'),
        name: classData.name,
        description: classData.description,
        hitDieSize: classData.hitDieSize,
        primaryAbility: classData.primaryAbility,
        savingThrowProficiencies: classData.savingThrowProficiencies,
        skillProficiencies: classData.skillProficiencies,
        skillChoices: classData.skillChoices,
        armorProficiencies: classData.armorProficiencies,
        weaponProficiencies: classData.weaponProficiencies,
        toolProficiencies: classData.toolProficiencies,
        features,
        spellcastingAbility: spellcastingAbility || undefined,
        subclassLevel: classData.subclassLevel,
        subclasses
    };
}

export function buildSubclassFromData(subclassData: ClassData, character: Character): Subclass {
    const features: Feature[] = [];
    if (subclassData.levels[3]?.features) {
        subclassData.levels[3].features.forEach(featureName => {
            const feature = getFeatureById(featureName);
            if (feature) {
                features.push(feature);
            }
        });
    }

    return {
        id: subclassData.name.toLowerCase().replace(/\s+/g, '-'),
        name: subclassData.name,
        description: subclassData.description,
        features,
        parentClass: character.class!
    };
}

export default classesData;