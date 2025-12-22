// src/lib/data/features.ts
import type {Feature, FeatureType} from '$lib/types/feature.d.ts';

// ============================================================================
// RACE FEATURES
// ============================================================================

export const raceFeatures: Record<string, Feature> = {
    // Human
    'human-ability-increase': {
        id: 'human-ability-increase',
        name: 'Ability Score Increase',
        type: 'race',
        description: 'Your ability scores each increase by 1.',
        active: true,
        // Note: Handled separately in race transformation since it's +1 to all
    },

    'human-extra-language': {
        id: 'human-extra-language',
        name: 'Extra Language',
        type: 'race',
        description: 'You can speak, read, and write one extra language of your choice.',
        active: true,
    },

    // Half-Orc
    'half-orc-str-bonus': {
        id: 'half-orc-str-bonus',
        name: 'Ability Score Increase',
        type: 'race',
        description: 'Your Strength score increases by 2, and your Constitution score increases by 1.',
        active: true,
        modifiers: {
            abilityScores: {
                STR: 2,
                CON: 1,
            },
        },
    },

    'half-orc-darkvision': {
        id: 'half-orc-darkvision',
        name: 'Darkvision',
        type: 'race',
        description: 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.',
        active: true,
        passiveEffects: [
            {
                id: 'half-orc-darkvision-effect',
                description: 'See 60 feet in dim light as bright light',
                affects: {},
            },
        ],
    },

    'half-orc-menacing': {
        id: 'half-orc-menacing',
        name: 'Menacing',
        type: 'race',
        description: 'You gain proficiency in the Intimidation skill.',
        active: true,
    },

    'half-orc-relentless-endurance': {
        id: 'half-orc-relentless-endurance',
        name: 'Relentless Endurance',
        type: 'race',
        description: 'When you are reduced to 0 hit points but not killed outright, you can choose to drop to 1 hit point instead. You can\'t use this feature again until you finish a long rest.',
        active: true,
        uses: {
            current: 1,
            maximum: 1,
            rechargeType: 'long_rest',
        },
    },

    'half-orc-savage-attacks': {
        id: 'half-orc-savage-attacks',
        name: 'Savage Attacks',
        type: 'race',
        description: 'When you score a critical hit with a weapon attack, you can roll one of the weapon\'s damage dice one additional time and add it to the extra damage of the critical hit.',
        active: true,
        rollModifiers: {
            damageRolls: [
                {
                    id: 'savage-attacks-crit-bonus',
                    label: 'Savage Attacks Critical Bonus',
                    description: 'Add one additional weapon damage die on critical hits',
                    value: 1,
                    source: "race",
                    active: false
                },
            ],
        },
    },

    // Elf
    'elf-dex-bonus': {
        id: 'elf-dex-bonus',
        name: 'Ability Score Increase',
        type: 'race',
        description: 'Your Dexterity score increases by 2.',
        active: true,
        modifiers: {
            abilityScores: {
                DEX: 2,
            },
        },
    },

    'elf-darkvision': {
        id: 'elf-darkvision',
        name: 'Darkvision',
        type: 'race',
        description: 'Accustomed to twilit forests and the night sky, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.',
        active: true,
    },

    'elf-keen-senses': {
        id: 'elf-keen-senses',
        name: 'Keen Senses',
        type: 'race',
        description: 'You have proficiency in the Perception skill.',
        active: true,
    },

    'elf-fey-ancestry': {
        id: 'elf-fey-ancestry',
        name: 'Fey Ancestry',
        type: 'race',
        description: 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.',
        active: true,
        passiveEffects: [
            {
                id: 'elf-fey-ancestry-effect',
                description: 'Advantage on charmed saves, immune to magical sleep',
                affects: {},
            },
        ],
    },

    'elf-trance': {
        id: 'elf-trance',
        name: 'Trance',
        type: 'race',
        description: 'Elves don\'t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice.',
        active: true,
    },

    // Dwarf
    'dwarf-con-bonus': {
        id: 'dwarf-con-bonus',
        name: 'Ability Score Increase',
        type: 'race',
        description: 'Your Constitution score increases by 2.',
        active: true,
        modifiers: {
            abilityScores: {
                CON: 2,
            },
        },
    },

    'dwarf-darkvision': {
        id: 'dwarf-darkvision',
        name: 'Darkvision',
        type: 'race',
        description: 'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.',
        active: true,
    },

    'dwarf-dwarven-resilience': {
        id: 'dwarf-dwarven-resilience',
        name: 'Dwarven Resilience',
        type: 'race',
        description: 'You have advantage on saving throws against poison, and you have resistance against poison damage.',
        active: true,
        passiveEffects: [
            {
                id: 'dwarf-poison-resistance',
                description: 'Resistance to poison damage',
                affects: {
                    resistances: [{ damageType: 'poison', resistanceType: "resistance" }],
                },
            },
        ],
    },

    'dwarf-dwarven-combat-training': {
        id: 'dwarf-dwarven-combat-training',
        name: 'Dwarven Combat Training',
        type: 'race',
        description: 'You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.',
        active: true,
    },

    'dwarf-tool-proficiency': {
        id: 'dwarf-tool-proficiency',
        name: 'Tool Proficiency',
        type: 'race',
        description: 'You gain proficiency with the artisan\'s tools of your choice: smith\'s tools, brewer\'s supplies, or mason\'s tools.',
        active: true,
    },

    'dwarf-stonecunning': {
        id: 'dwarf-stonecunning',
        name: 'Stonecunning',
        type: 'race',
        description: 'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.',
        active: true,
    },
};

// ============================================================================
// CLASS FEATURES
// ============================================================================

export const classFeatures: Record<string, Feature> = {
    // Barbarian
    'barbarian-rage': {
        id: 'barbarian-rage',
        name: 'Rage',
        type: 'class',
        description: 'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. While raging, you gain the following benefits:\n• You have advantage on Strength checks and Strength saving throws.\n• When you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you level up.\n• You have resistance to bludgeoning, piercing, and slashing damage.',
        active: true,
        uses: {
            current: 2,
            maximum: 2,
            rechargeType: 'long_rest',
        },
        passiveEffects: [
            {
                id: 'barbarian-rage-effect',
                description: 'Advantage on STR checks/saves, bonus damage on melee attacks, resistance to physical damage',
                affects: {
                    resistances: [
                        { damageType: 'bludgeoning', resistanceType: "resistance" },
                        { damageType: 'piercing', resistanceType: "resistance" },
                        { damageType: 'slashing', resistanceType: "resistance" },
                    ],
                },
            },
        ],
    },

    'barbarian-unarmored-defense': {
        id: 'barbarian-unarmored-defense',
        name: 'Unarmored Defense',
        type: 'class',
        description: 'While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.',
        active: true,
        passiveEffects: [
            {
                id: 'barbarian-unarmored-defense-effect',
                description: 'AC = 10 + DEX + CON',
                affects: {
                    ac: 0, // Dynamic calculation needed
                },
            },
        ],
    },

    'barbarian-reckless-attack': {
        id: 'barbarian-reckless-attack',
        name: 'Reckless Attack',
        type: 'class',
        description: 'Starting at 2nd level, you can throw aside all concern for defense to attack with fierce desperation. When you make your first attack roll on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn.',
        active: true,
    },

    // Fighter
    'fighter-fighting-style': {
        id: 'fighter-fighting-style',
        name: 'Fighting Style',
        type: 'class',
        description: 'You adopt a particular style of fighting as your specialty.',
        active: true,
    },

    'fighter-second-wind': {
        id: 'fighter-second-wind',
        name: 'Second Wind',
        type: 'class',
        description: 'You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
        active: true,
        uses: {
            current: 1,
            maximum: 1,
            rechargeType: 'short_rest',
        },
    },

    'fighter-action-surge': {
        id: 'fighter-action-surge',
        name: 'Action Surge',
        type: 'class',
        description: 'Starting at 2nd level, you can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action on top of your regular action and a possible bonus action.',
        active: true,
        uses: {
            current: 1,
            maximum: 1,
            rechargeType: 'short_rest',
        },
    },

    // Wizard
    'wizard-spellcasting': {
        id: 'wizard-spellcasting',
        name: 'Spellcasting',
        type: 'class',
        description: 'As a student of arcane magic, you have a spellbook containing spells that show the first glimmerings of your true power.',
        active: true,
    },

    'wizard-arcane-recovery': {
        id: 'wizard-arcane-recovery',
        name: 'Arcane Recovery',
        type: 'class',
        description: 'You have learned to regain some of your magical energy by studying your spellbook. Once per day when you finish a short rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your wizard level (rounded up), and none of the slots you choose can be 6th level or higher.',
        active: true,
        uses: {
            current: 1,
            maximum: 1,
            rechargeType: 'short_rest',
        },
    },
};

// ============================================================================
// FEAT FEATURES
// ============================================================================

export const featFeatures: Record<string, Feature> = {
    'feat-alert': {
        id: 'feat-alert',
        name: 'Alert',
        type: 'feat',
        description: 'Always vigilant, you gain the following benefits:\n• You gain a +5 bonus to initiative.\n• You can\'t be surprised while you are conscious.\n• Other creatures don\'t gain advantage on attack rolls against you as a result of being unseen by you.',
        active: true,
        modifiers: {
            initiative: [
                {
                    id: 'alert-initiative-bonus',
                    label: 'Alert Initiative Bonus',
                    value: 5,
                    description: '+5 to initiative',
                    source: "feat",
                    active: false
                },
            ],
        },
        passiveEffects: [
            {
                id: 'alert-cant-surprise',
                description: 'Cannot be surprised while conscious',
                affects: {},
            },
        ],
    },

    'feat-great-weapon-master': {
        id: 'feat-great-weapon-master',
        name: 'Great Weapon Master',
        type: 'feat',
        description: 'You\'ve learned to put the weight of a weapon to your advantage, letting its momentum empower your strikes. You gain the following benefits:\n• On your turn, when you score a critical hit with a melee weapon attack, you can immediately make an additional melee weapon attack using the same weapon against a target in range.',
        active: true,
    },

    'feat-lucky': {
        id: 'feat-lucky',
        name: 'Lucky',
        type: 'feat',
        description: 'You have inexplicable luck that seems to kick in when you need it most. You have 3 luck points. Whenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20. You can choose to spend one of your luck points after you roll the die, but before the outcome is determined.',
        active: true,
        uses: {
            current: 3,
            maximum: 3,
            rechargeType: 'long_rest',
        },
    },

    'feat-magic-initiate': {
        id: 'feat-magic-initiate',
        name: 'Magic Initiate',
        type: 'feat',
        description: 'Choose a class: bard, cleric, druid, sorcerer, warlock, or wizard. You learn two cantrips of your choice from that class\'s spell list. In addition, choose one 1st-level spell from that same list. You learn that spell and can cast it at its lowest level. Once you finish a long rest, you can change your list of prepared spells.',
        active: true,
    },
};

// ============================================================================
// BACKGROUND FEATURES
// ============================================================================

export const backgroundFeatures: Record<string, Feature> = {
    'background-soldier-military-rank': {
        id: 'background-soldier-military-rank',
        name: 'Military Rank',
        type: 'background',
        description: 'You have the respect of your fellow soldiers. Soldiers loyal to your former military organization still recognize your authority and influence, and they defer to you if they are of a lower rank. You can invoke your rank to exert influence over other soldiers and requisition simple equipment or horses for temporary use. However, you can\'t requisition arms or horses for anyone else, nor can you use your influence in a way that is directly against the interests of your military organization.',
        active: true,
    },

    'background-criminal-criminal-contact': {
        id: 'background-criminal-criminal-contact',
        name: 'Criminal Contact',
        type: 'background',
        description: 'You have a reliable and trustworthy contact who acts as your liaison to the criminal underworld. This contact is a person who provides information when you offer adequate coin and favors to gather information and fences goods you steal. Your contact won\'t risk their life for you or risk revealing their true identity.',
        active: true,
    },

    'background-acolyte-shelter-of-the-faithful': {
        id: 'background-acolyte-shelter-of-the-faithful',
        name: 'Shelter of the Faithful',
        type: 'background',
        description: 'As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith, though you must provide any material components needed for spells cast on your behalf. Those who share your religion will support you (but only you) at a modest lifestyle. You might also have ties to a specific temple dedicated to your chosen deity or pantheon, and you have a residence there. This could be the source of support and reward-granting tasks. You aren\'t necessarily bound to that temple, but it\'s a good place to start when looking for one.',
        active: true,
    },
};

// ============================================================================
// UTILITY FUNCTION
// ============================================================================

/**
 * Get a feature by ID from all feature categories
 */
export function getFeatureById(id: string): Feature | undefined {
    return (
        raceFeatures[id] ||
        classFeatures[id] ||
        featFeatures[id] ||
        backgroundFeatures[id]
    );
}

/**
 * Get all features of a specific type
 */
export function getFeaturesByType(type: FeatureType): Feature[] {
    const allFeatures = {
        ...raceFeatures,
        ...classFeatures,
        ...featFeatures,
        ...backgroundFeatures,
    };

    return Object.values(allFeatures).filter(feature => feature.type === type);
}
