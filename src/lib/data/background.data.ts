// src/lib/data/backgrounds.data.ts
import type {Background} from "$lib/types/character";

const backgroundsData: Record<string, Background> = {
    acolyte: {
        name: 'Acolyte',
        description: 'You have spent your life in the service of a temple to a specific god or gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshippers into the presence of the divine.',
        skillProficiencies: ['Insight', 'Religion'],
        languageProficiencies: ['One of your choice'],
        feature: {
            name: 'Shelter of the Faithful',
            description: 'As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith, though you must provide any material components needed for spells.'
        },
        personality: 'I idolize a particular hero of my faith and constantly refer to that person\'s deeds and example.',
        ideals: 'Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well.',
        bonds: 'I would die to recover an ancient relic of my faith that was lost long ago.',
        flaws: 'I judge others harshly, and myself even more severely.'
    },

    charlatan: {
        name: 'Charlatan',
        description: 'You have always had a way with people. You know what makes them tick, you can tease out their hearts\' desires after a few minutes of conversation, and you\'re able to win over the most suspicious people with a confident talk and a good deed.',
        skillProficiencies: ['Deception', 'Sleight of Hand'],
        toolProficiencies: ['Disguise kit', 'Forgery kit'],
        equipment: ['Set of fine clothes', 'Disguise kit'],
        goldAmount: 15,
        feature: {
            name: 'False Identity',
            description: 'You have created a second identity that includes documentation, established acquaintances, and whatever else you can think of to support it. Additionally, you can forge documents including official papers and personal letters, as long as you have seen an example of the kind of document or the handwriting you are trying to copy.'
        },
        personality: 'I fall in and out of love quickly, and am always pursuing someone.',
        ideals: 'Independence. I am a free spirit—no one tells me what to do.',
        bonds: 'I have a target on my back, and I\'m moving to a new town to start over.',
        flaws: 'I can\'t resist a pretty face.'
    },

    criminal: {
        name: 'Criminal',
        description: 'You are an experienced criminal with a history of breaking the law. You have spent a lot of time among other criminals and still have contacts within the criminal underworld. You\'re far closer than most people to the world of murder, theft, and violence that pervades the underbelly of civilization.',
        skillProficiencies: ['Deception', 'Stealth'],
        toolProficiencies: ['Thieves\' tools', 'One gaming set of your choice'],
        equipment: ['Thieves\' tools', 'A crowbar'],
        goldAmount: 15,
        feature: {
            name: 'Criminal Contact',
            description: 'You have a reliable and trustworthy contact who acts as your liaison to the criminal underworld. You know how to get messages to and from your contact, even over great distances; specifically, you know the local messengers, corrupt caravan masters, and seamen who can deliver messages for you.'
        },
        personality: 'I always want to know how things work and what makes people tick.',
        ideals: 'Redemption. There\'s a spark of good in everyone.',
        bonds: 'I\'m trying to pay off an old debt I owe to a generous benefactor.',
        flaws: 'When I see something valuable, I can\'t think about anything but how to steal it.'
    },

    entertainer: {
        name: 'Entertainer',
        description: 'You thrive in front of an audience. You know how to entrance them, entertain them, and play with their emotions. Your poetics can stir the hearts of those who listen to your words, and your music can make them weep or laugh.',
        skillProficiencies: ['Acrobatics', 'Performance'],
        toolProficiencies: ['Disguise kit', 'One musical instrument of your choice'],
        equipment: ['Costume', 'One musical instrument of your choice'],
        goldAmount: 15,
        feature: {
            name: 'By Popular Demand',
            description: 'You can always find a place to perform, usually in an inn or tavern but potentially anywhere that draws a crowd. At such a place, you receive free lodging and food of a modest standard (about 5 gp per day), as long as you perform each evening. In addition, your performance makes you something of a local figure. When strangers recognize you in a town where you have performed, they typically take one minute to tell you how much they enjoyed your acts.'
        },
        personality: 'I know a story relevant to almost every situation.',
        ideals: 'Beauty. When I perform, I make the world better than it was.',
        bonds: 'My instrument is my most treasured possession, and it reminds me of someone I love.',
        flaws: 'I\'m a sucker for a pretty face.'
    },

    folk_hero: {
        name: 'Folk Hero',
        description: 'You come from a humble social rank, but you are destined for so much more. Already the people of your home village regard you as their champion, and your exceptional deeds have earned you their respect. You are their hero, and they know you will come back to save them.',
        skillProficiencies: ['Animal Handling', 'Survival'],
        toolProficiencies: ['One type of artisan\'s tools', 'One vehicle (land or water)'],
        goldAmount: 10,
        feature: {
            name: 'Rustic Hospitality',
            description: 'Since you come from the ranks of the common folk, you fit in among them with ease. You can find a place to hide, rest, or recuperate among other commoners, unless you have shown yourself to be a danger to them. They will shield you from the law or anyone else searching for you, though they will not risk their lives for you.'
        },
        personality: 'I judge people by their actions, not their words.',
        ideals: 'Fairness. No one should suffer injustice while I can stand against it.',
        bonds: 'I have a family, but I have no idea where they are. One day I hope to see them again.',
        flaws: 'The tyrant who rules my land will stop at nothing to see me killed.'
    },

    guild_artisan: {
        name: 'Guild Artisan',
        description: 'You understand the world as a sort of guild. You are a respected member of your artisans\' guild, resting on the laurels of a masterwork and eager to demonstrate your expertise and learn new techniques.',
        skillProficiencies: ['Insight', 'Persuasion'],
        toolProficiencies: ['Artisan\'s tools of your choice'],
        languageProficiencies: ['One of your choice'],
        goldAmount: 25,
        feature: {
            name: 'Guild Membership',
            description: 'As an established and respected member of a guild, you can rely on certain benefits that membership provides. Your fellow guild members will provide you lodging and food if necessary, and pay for your funeral rites if needed. In some cities and towns, a guild hall offers a central place to meet other members of your profession, which can be a good place to meet prospective patrons, allies, or hirelings.'
        },
        personality: 'I believe that anything worth doing is worth doing right. I can\'t help but try to improve things wherever I am.',
        ideals: 'Community. It is the duty of all civilized people to strengthen the bonds of community and the security of civilization itself.',
        bonds: 'My tools are symbols of my past life, and I carry them so that I will never forget the skilled craftsmanship I have learned.',
        flaws: 'I\'m horribly jealous of anyone who can outshine my handiwork. Sadly, I lust for the same level of acclaim.'
    },

    hermit: {
        name: 'Hermit',
        description: 'You lived in seclusion, either in a sheltered community such as a monastery, or entirely alone, for a formative part of your life. In your time apart from the clamor of society, you found quiet, community, and perhaps some of the answers you were looking for.',
        skillProficiencies: ['Medicine', 'Religion'],
        toolProficiencies: ['Herbalism kit'],
        languageProficiencies: ['One of your choice'],
        feature: {
            name: 'Discovery',
            description: 'The quiet seclusion of your extended hermitage gave you access to a unique and powerful discovery. The exact nature of this revelation depends on the nature of your seclusion. It might be a truth about the cosmos, the soul, the afterlife, or some other spiritual mystery. Work with your DM to determine the specifics of your discovery and its impact on the campaign.'
        },
        personality: 'I\'ve been isolated for so long that I rarely speak, preferring gestures and the occasional grunt.',
        ideals: 'Knowledge. In pursuit of knowledge and enlightenment, one must learn to live without material comforts.',
        bonds: 'Nothing is more important than the other members of my hermitage, order, or association.',
        flaws: 'Now that I\'ve returned to the world, I am reluctant and uncertain in crowds.'
    },

    noble: {
        name: 'Noble',
        description: 'You understand wealth, power, and privilege. You carry a noble title, and your family owns land, collects taxes, and wields significant political influence. You might be a pampered aristocrat unfamiliar with work or discomfort, a former merchant just elevated to the nobility, or a disinherited scoundrel with a capital title but little wealth.',
        skillProficiencies: ['Insight', 'Persuasion'],
        languageProficiencies: ['One of your choice'],
        goldAmount: 25,
        feature: {
            name: 'Position of Privilege',
            description: 'Thanks to your noble birth, people are inclined to think the best of you. You are welcome in high society, and people assume you have the right to be wherever you are. The common folk make assumptions about your good intentions or authority, and unless your actions prove otherwise, they treat you with respect and deference.'
        },
        personality: 'My eloquent flattery makes everyone I talk to feel like the most wonderful and important person in the world.',
        ideals: 'Responsibility. It is incumbent upon me to respect the authority of those above me, just as those below me must respect mine.',
        bonds: 'I will face any challenge to win the approval of my family.',
        flaws: 'I secretly believe that everyone is beneath me.'
    },

    outlander: {
        name: 'Outlander',
        description: 'You grew up in the wilds, far from civilization and the comforts of town and technology. You witnessed the migration of herds larger than forests, survived weather more extreme than any city-dweller could comprehend, and enjoyed the solitude of being the only thinking creature for miles in any direction.',
        skillProficiencies: ['Athletics', 'Survival'],
        toolProficiencies: ['One musical instrument of your choice'],
        goldAmount: 10,
        feature: {
            name: 'Wanderer',
            description: 'You have an excellent memory for maps and geography. You can always recall the general layout of terrain, settlements, and other features around you. In addition, you can find food and fresh water for yourself and up to five other people each day, provided that the land offers berries, small game, water, and so forth.'
        },
        personality: 'I\'m horribly jealous of anyone who can outshine my handiwork.',
        ideals: 'Independence. I am a wanderer. I have no home.',
        bonds: 'My family has a symbol which I still wear on my person.',
        flaws: 'There\'s no room for caution in a life lived to the fullest.'
    },

    sage: {
        name: 'Sage',
        description: 'You spent years learning the lore of the multiverse. You scoured manuscripts, studied scrolls, and listened to the greatest experts on the subjects that interest you. Your efforts have made you a master in your fields of study.',
        skillProficiencies: ['Arcana', 'History'],
        languageProficiencies: ['Two of your choice'],
        goldAmount: 10,
        feature: {
            name: 'Researcher',
            description: 'When you attempt to learn or recall a piece of lore, if you do not know that information, you often know where and from whom you can obtain it. Exceptions include knowledge that is unknown, secret, or hidden. Working with your DM, you can identify a source as below: the owner of an occult-themed library or a knowledgeable sage, a university with an exceptionally well-stocked library or a specialized archive, or an aristocrat with lavish kingdoms filled with books and records.'
        },
        personality: 'I use polysyllabic words that convey the impression of great erudition.',
        ideals: 'Knowledge. The path to power and self-improvement is through knowledge.',
        bonds: 'It is my duty to protect my students.',
        flaws: 'I am easily distracted by the promise of information.'
    },

    sailor: {
        name: 'Sailor',
        description: 'You sailed on a seagoing vessel for years. In that time at sea, you\'ve faced down mighty storms, monsters of the deep, and those who wanted to pirate your ship and steal this ship\'s cargo and bite the eyes off your face like a rake.',
        skillProficiencies: ['Athletics', 'Perception'],
        toolProficiencies: ['Navigator\'s tools', 'Water vehicles'],
        goldAmount: 10,
        feature: {
            name: 'Ship\'s Passage',
            description: 'When you need to, you can secure free passage on a sailing ship for yourself and your adventuring companions. You might sail on the ship you served on, or another ship you have good relations with. Because you\'re calling in a favor, you can\'t sail on the ship again until you\'ve done a favor of your own and served your debt.'
        },
        personality: 'My language is as foul as an otyugh nest, and I don\'t care who knows it.',
        ideals: 'Freedom. The sea calls to me, and I will always answer.',
        bonds: 'I lost my love to the sea. I will always remember her.',
        flaws: 'I follow orders, even when I think they\'re wrong.'
    },

    soldier: {
        name: 'Soldier',
        description: 'War is in your blood. You have trained in your youth, served in the army, and you still bear the bearing and dedication of a soldier. You are at home in a military unit, and you can inspire common folk.',
        skillProficiencies: ['Athletics', 'Intimidation'],
        toolProficiencies: ['One gaming set of your choice'],
        goldAmount: 10,
        feature: {
            name: 'Military Rank',
            description: 'You have a military rank from your career as a soldier. Soldiers loyal to your former military organization still recognize your authority and influence, and they defer to you if they are of a lower rank. You can invoke your rank to exert influence over other soldiers and requisition simple equipment or horses for temporary use. You can also usually gain access to friendly military encampments and fortresses where your rank is recognized.'
        },
        personality: 'I have a crude sense of humor.',
        ideals: 'Greater Good. I fight for those who cannot fight for themselves.',
        bonds: 'My squad is my family. I will lay down my life for the members of my old military unit.',
        flaws: 'I have little respect for anyone who is not a proven warrior.'
    },

    urchin: {
        name: 'Urchin',
        description: 'You grew up on the streets alone, orphaned and poor. You had no one to watch over you or to provide for you, so you learned to provide for yourself. You fought fiercely over food and kept a constant watch out for other urchins who might steal from you or for officials who might drive you away. You slept in alleys and corners, always struggling to survive.',
        skillProficiencies: ['Sleight of Hand', 'Stealth'],
        toolProficiencies: ['Thieves\' tools', 'Disguise kit'],
        equipment: ['A small knife', 'A map of the city you grew up in', 'A pet mouse'],
        goldAmount: 10,
        feature: {
            name: 'City Secrets',
            description: 'You know the secret patterns and flow to cities and can find passages through the urban sprawl that others would miss. When you are not in combat, you (and companions you lead) can travel between any two locations in the city twice as fast as your speed would normally allow. Additionally, you can find a place in any city to hide, rest, or recuperate for free, though you must scavenge for food. In addition, locals offer shelter and aid without questions asked, though they will not risk their lives for you.'
        },
        personality: 'I always want to know how things work and what makes people tick.',
        ideals: 'Survival. I do what it takes to survive.',
        bonds: 'My city is my home, and I will fight to defend it.',
        flaws: 'If I see something valuable, I can\'t think about anything but how to steal it.'
    }
};

export type BackgroundKey = keyof typeof backgroundsData;
export const backgroundList = Object.keys(backgroundsData) as BackgroundKey[];

export default backgroundsData;
