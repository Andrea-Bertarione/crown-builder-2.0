export type AbilityScore = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

export interface Subrace {
    name: string;
    description: string;
    fixedModifiers?: Partial<Record<AbilityScore, number>>;
    choiceModifiers?: number[];
    features?: string[];
    languages?: string[];
    languageChoices?: number;
}

export interface CharacterRaceData {
    name: string;
    description: string;
    fixedModifiers?: Partial<Record<AbilityScore, number>>;
    choiceModifiers?: number[];
    languages?: string[];
    languageChoices?: number;
    size?: string;
    speed?: number;
    features?: string[];
    subraces?: Subrace[];
}

const racesData: Record<string, CharacterRaceData> = {
    dwarf: {
        name: 'Dwarf',
        description: 'Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal. Though they stand well under 5 feet tall, dwarves are so broad and compact that they can weigh as much as a human standing nearly two feet taller.',
        fixedModifiers: {
            constitution: 2,
        },
        languages: ['Common', 'Dwarvish'],
        size: 'Medium',
        speed: 25,
        features: ['Darkvision', 'Dwarven Resilience', 'Dwarven Combat Training', 'Tool Proficiencies'],
        subraces: [
            {
                name: 'Mountain Dwarf',
                description: 'As a mountain dwarf, you are strong and hardy, accustomed to a difficult life in rugged terrain.',
                fixedModifiers: {
                    strength: 2,
                    constitution: 2,
                },
                features: ['Light and Medium Armor Proficiency', 'Martial Weapon Proficiency'],
            },
            {
                name: 'Hill Dwarf',
                description: 'As a hill dwarf, you have keen intuition and remarkable resilience.',
                fixedModifiers: {
                    wisdom: 1,
                    constitution: 2,
                },
                features: ['Dwarven Toughness'],
            },
        ],
    },

    elf: {
        name: 'Elf',
        description: 'Elves are a magical people of otherworldly grace, living in the world but not entirely part of it. They live in places of ethereal beauty, in the midst of ancient forests or in silvery spires glowing with faerie light.',
        fixedModifiers: {
            dexterity: 2,
        },
        languages: ['Common', 'Elvish'],
        size: 'Medium',
        speed: 30,
        features: ['Darkvision', 'Keen Senses', 'Fey Ancestry', 'Trance'],
        subraces: [
            {
                name: 'High Elf',
                description: 'As a high elf, you are descended from the most noble and martial of elvenkind.',
                fixedModifiers: {
                    dexterity: 2,
                    intelligence: 1,
                },
                features: ['Elf Weapon Training', 'Cantrip', 'Extra Language'],
                languageChoices: 1,
            },
            {
                name: 'Wood Elf',
                description: 'As a wood elf, you have keen senses and intuition, and your fleet feet carry you quickly and stealthily through your native forests.',
                fixedModifiers: {
                    dexterity: 2,
                    wisdom: 1,
                },
                features: ['Elf Weapon Training', 'Fleet of Foot', 'Mask of the Wild'],
            },
            {
                name: 'Dark Elf (Drow)',
                description: 'Descended from an earlier subrace of dark-skinned elves, the drow were banished from the surface world for practicing dark magic.',
                fixedModifiers: {
                    dexterity: 2,
                    charisma: 1,
                },
                features: ['Superior Darkvision', 'Keen Senses', 'Fey Ancestry', 'Trance', 'Drow Magic', 'Drow Weapon Training'],
                languages: ['Common', 'Elvish'],
            },
        ],
    },

    halfling: {
        name: 'Halfling',
        description: 'The diminutive halflings have more than earned their place in the world, but would rather not have to fight for it. They are inquisitive and quite wonderful company.',
        fixedModifiers: {
            dexterity: 2,
        },
        languages: ['Common', 'Halfling'],
        size: 'Small',
        speed: 25,
        features: ['Lucky', 'Brave', 'Halfling Nimbleness'],
        subraces: [
            {
                name: 'Lightfoot Halfling',
                description: 'As a lightfoot halfling, you can easily hide from notice, even using other people as cover.',
                fixedModifiers: {
                    dexterity: 2,
                    charisma: 1,
                },
                features: ['Naturally Stealthy'],
            },
            {
                name: 'Stout Halfling',
                description: 'As a stout halfling, you are hardier than average and have some resistance to poison.',
                fixedModifiers: {
                    dexterity: 2,
                    constitution: 1,
                },
                features: ['Stout Resilience'],
            },
        ],
    },

    human: {
        name: 'Human',
        description: 'Humans are the most adaptable and ambitious people of the known world. They are innovative and expansionist among other cultures.',
        fixedModifiers: {
            strength: 1,
            dexterity: 1,
            constitution: 1,
            intelligence: 1,
            wisdom: 1,
            charisma: 1,
        },
        languages: ['Common'],
        size: 'Medium',
        speed: 30,
        features: ['Extra Language'],
        languageChoices: 1,
    },

    dragonborn: {
        name: 'Dragonborn',
        description: 'Dragonborn look mostly draconic. Most have high cheekbones with flabs of skin between them and their ears, framing a blunt snout in the same way a human\'s ears frame their face. Behind the nostrils flared into forward-facing horns grow from the back of their skulls.',
        fixedModifiers: {
            strength: 2,
            charisma: 1,
        },
        languages: ['Common', 'Draconic'],
        size: 'Medium',
        speed: 30,
        features: ['Draconic Ancestry', 'Breath Weapon', 'Damage Resistance'],
        subraces: [
            {
                name: 'Chromatic Dragon',
                description: 'Dragonborn descended from chromatic dragons, with breath weapons of damaging energy.',
                features: ['Draconic Ancestry (Chromatic)', 'Chromatic Breath Weapon'],
            },
            {
                name: 'Metallic Dragon',
                description: 'Dragonborn descended from metallic dragons, with healing or protective abilities.',
                features: ['Draconic Ancestry (Metallic)', 'Metallic Breath Weapon'],
            },
            {
                name: 'Gem Dragon',
                description: 'Dragonborn descended from gem dragons, with psionic abilities.',
                fixedModifiers: {
                    intelligence: 1,
                },
                features: ['Draconic Ancestry (Gem)', 'Gem Dragon Breath'],
            },
        ],
    },

    gnome: {
        name: 'Gnome',
        description: 'A gnome\'s energy and enthusiasm for living shines through every inch of his or her tiny body. Gnomes average slightly over 3 feet tall and weigh 40-45 pounds.',
        fixedModifiers: {
            intelligence: 2,
        },
        languages: ['Common', 'Gnomish'],
        size: 'Small',
        speed: 25,
        features: ['Darkvision', 'Gnome Cunning'],
        subraces: [
            {
                name: 'Forest Gnome',
                description: 'As a forest gnome, you are apt to be a sly prankster with a keen sense of direction.',
                fixedModifiers: {
                    intelligence: 2,
                    dexterity: 1,
                },
                features: ['Natural Illusionist', 'Speak with Small Beasts'],
            },
            {
                name: 'Rock Gnome',
                description: 'As a rock gnome, you are known for mechanical ingenuity, with a natural knack for tinkering.',
                fixedModifiers: {
                    intelligence: 2,
                    constitution: 1,
                },
                features: ['Artificers Lore', 'Tinker'],
            },
        ],
    },

    'half-elf': {
        name: 'Half-Elf',
        description: 'Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of their elf and human parents: the curiosity, ambition, and adaptability of humans with the refined senses, love of nature, and artistic tastes of the elves.',
        fixedModifiers: {
            charisma: 2,
        },
        choiceModifiers: [1, 1],
        languages: ['Common', 'Elvish'],
        size: 'Medium',
        speed: 30,
        features: ['Darkvision', 'Keen Senses', 'Fey Ancestry', 'Versatility'],
        languageChoices: 1,
    },

    'half-orc': {
        name: 'Half-Orc',
        description: 'Half-orcs grayish pigmentation, sloping foreheads, jutting jaws, prominent teeth, and towering builds make their orcish heritage plain for all to see. Half-orcs are often shunned and despised out of racism and prejudice.',
        fixedModifiers: {
            strength: 2,
            constitution: 1,
        },
        languages: ['Common', 'Orc'],
        size: 'Medium',
        speed: 30,
        features: ['Darkvision', 'Menacing', 'Relentless Endurance'],
    },

    tiefling: {
        name: 'Tiefling',
        description: 'To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling. Half-elves and half-orcs can pass for human. But tieflings cannot.',
        fixedModifiers: {
            charisma: 2,
        },
        choiceModifiers: [1],
        languages: ['Common', 'Infernal'],
        size: 'Medium',
        speed: 30,
        features: ['Darkvision', 'Hellish Resistance', 'Infernal Legacy'],
        subraces: [
            {
                name: 'Asmodeus Tiefling',
                description: 'Tieflings connected to Asmodeus, the lord of all devils.',
                fixedModifiers: {
                    intelligence: 1,
                    charisma: 2,
                },
                features: ['Infernal Legacy (Asmodeus)'],
            },
            {
                name: 'Mephistopheles Tiefling',
                description: 'Tieflings bearing the mark of Mephistopheles, the archdevil of hellfire.',
                fixedModifiers: {
                    intelligence: 1,
                    charisma: 2,
                },
                features: ['Infernal Legacy (Mephistopheles)'],
            },
            {
                name: 'Zariel Tiefling',
                description: 'Tieflings descended from Zariel, the angel fallen into darkness.',
                fixedModifiers: {
                    strength: 1,
                    charisma: 2,
                },
                features: ['Infernal Legacy (Zariel)'],
            },
        ],
    },

    aasimar: {
        name: 'Aasimar',
        description: 'Aasimar are born to serve as champions of the gods. Aasimar are placed in the world to serve as champions of the gods, and their influence radiates from them.',
        fixedModifiers: {
            charisma: 2,
        },
        choiceModifiers: [1],
        languages: ['Common', 'Celestial'],
        size: 'Medium',
        speed: 30,
        features: ['Darkvision', 'Celestial Resistance', 'Light Bearer'],
        subraces: [
            {
                name: 'Protector Aasimar',
                description: 'Protector aasimar are imbued with celestial power that is used to protect the weak.',
                fixedModifiers: {
                    wisdom: 1,
                    charisma: 2,
                },
                features: ['Protector Wings'],
            },
            {
                name: 'Scourge Aasimar',
                description: 'Scourge aasimar are imbued with a fiery soul, burning with purpose.',
                fixedModifiers: {
                    constitution: 1,
                    charisma: 2,
                },
                features: ['Scourge Wings'],
            },
            {
                name: 'Fallen Aasimar',
                description: 'Fallen aasimar were touched by dark powers, twisting their celestial gift into something sinister.',
                fixedModifiers: {
                    strength: 1,
                    charisma: 2,
                },
                features: ['Necrotic Shroud'],
            },
        ],
    },

    bugbear: {
        name: 'Bugbear',
        description: 'Bugbears are born for battle and revel in carnage. The larger relatives of goblins and hobgoblins, they are known to be ugly, bad-tempered, and cruel creatures.',
        fixedModifiers: {
            strength: 2,
            dexterity: 1,
        },
        languages: ['Common', 'Goblin'],
        size: 'Medium',
        speed: 30,
        features: ['Darkvision', 'Long-Limbed', 'Powerful Build', 'Surprise Attack'],
    },

    goblin: {
        name: 'Goblin',
        description: 'Goblins are small, dark creatures standing about 3 to 3.5 feet tall. They are cunning and aggressive, with a thirst for treasure and violence.',
        fixedModifiers: {
            dexterity: 2,
        },
        choiceModifiers: [1],
        languages: ['Common', 'Goblin'],
        size: 'Small',
        speed: 30,
        features: ['Darkvision', 'Nimble Escape', 'Fury of the Small'],
    },

    orc: {
        name: 'Orc',
        description: 'Orcs are giants among humanoids. They stand 7 to 8 feet tall and have grayish or greenish skin with notable tusks and prominent brow ridges.',
        fixedModifiers: {
            strength: 2,
            constitution: 1,
        },
        languages: ['Common', 'Orc'],
        size: 'Medium',
        speed: 30,
        features: ['Darkvision', 'Aggressive', 'Powerful Build', 'Primal Intuition'],
    },

    firbolg: {
        name: 'Firbolg',
        description: 'Firbolgs are a race of fey creatures native to the Material Plane. They are large, powerful beings typically 8 feet tall, with thick limbs and a bestial face.',
        fixedModifiers: {
            wisdom: 2,
            strength: 1,
        },
        languages: ['Common', 'Sylvan'],
        size: 'Medium',
        speed: 30,
        features: ['Hidden Step', 'Powerful Build', 'Firbolg Magic', 'Speech of Beast and Leaf', 'Firblog Weapon Training'],
    },

    aarakocra: {
        name: 'Aarakocra',
        description: 'Aarakocra are a race of avian humanoids, with wings sprouting from their shoulders, allowing them to fly. They are proud, honorable, and often tribal in nature.',
        fixedModifiers: {
            dexterity: 2,
            wisdom: 1,
        },
        languages: ['Common', 'Aarakocra'],
        size: 'Medium',
        speed: 25,
        features: ['Talons', 'Flight', 'Limited Flight'],
    },

    tortle: {
        name: 'Tortle',
        description: 'Tortles are a race of humanoid tortoises, with hard shells on their backs and a love for travel and adventure. They are patient, wise, and often monks or monks.',
        fixedModifiers: {
            strength: 2,
            wisdom: 1,
        },
        languages: ['Common', 'Aquan'],
        size: 'Medium',
        speed: 30,
        features: ['Shell Defense', 'Natural Armor', 'Shell Ac', 'Claw Attack'],
    },

    genasi: {
        name: 'Genasi',
        description: 'The Elemental Planes surround the Material Plane and press in upon it at the margins, where reality grows thin. Mortals with a touch of elemental power in their veins are called genasi.',
        fixedModifiers: {
            constitution: 2,
        },
        languages: ['Common'],
        size: 'Medium',
        speed: 30,
        features: ['Darkvision', 'Elemental Resistance'],
        subraces: [
            {
                name: 'Air Genasi',
                description: 'Air genasi have a natural affinity for electricity and air.',
                fixedModifiers: {
                    dexterity: 1,
                    constitution: 2,
                },
                features: ['Unending Breath', 'Mingle with the Wind'],
            },
            {
                name: 'Earth Genasi',
                description: 'Earth genasi are grounded and sturdy, with an affinity for stone and earth.',
                fixedModifiers: {
                    strength: 1,
                    constitution: 2,
                },
                features: ['Earth Walk', 'Merge with Stone'],
            },
            {
                name: 'Fire Genasi',
                description: 'Fire genasi burn with the passion of flame, with resistance to fire.',
                fixedModifiers: {
                    intelligence: 1,
                    constitution: 2,
                },
                features: ['Fire Resistance', 'Reach to the Blaze'],
            },
            {
                name: 'Water Genasi',
                description: 'Water genasi are fluid and graceful, capable of surviving both above and below the waves.',
                fixedModifiers: {
                    wisdom: 1,
                    constitution: 2,
                },
                features: ['Amphibious', 'Swim Speed', 'Call to the Wave'],
            },
        ],
    },

    'goliath': {
        name: 'Goliath',
        description: 'Goliaths are a race of tall, gray-skinned humanoids with blue or purple undertones. They stand 7 to 8 feet tall and have prominent ridges on their shoulders and brows.',
        fixedModifiers: {
            strength: 2,
            constitution: 1,
        },
        languages: ['Common', 'Giant'],
        size: 'Medium',
        speed: 30,
        features: ['Powerful Build', 'Stone\'s Endurance', 'Athletic', 'Mountain Born'],
    },
};

export type RaceKey = keyof typeof racesData;
export const raceList = Object.keys(racesData) as RaceKey[];

export default racesData;