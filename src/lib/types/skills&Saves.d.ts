import type { ModifierCollection } from './modifier.d.ts';

type AbilityKey = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

type SkillName = 
  | 'acrobatics'
  | 'animal_handling'
  | 'arcana'
  | 'athletics'
  | 'deception'
  | 'history'
  | 'insight'
  | 'intimidation'
  | 'investigation'
  | 'medicine'
  | 'nature'
  | 'perception'
  | 'performance'
  | 'persuasion'
  | 'sleight_of_hand'
  | 'stealth'
  | 'survival';

// Maps skills to their parent ability
type SKILL_TO_ABILITY = Record<SkillName, AbilityKey>

interface Skill {
  name: SkillName;
  isProficient: $state.raw<boolean>;  // Expertise, bonuses
  
  // Additional modifiers on top of ability + proficiency
  additionalModifiers: ModifierCollection;
  
  // Computed roll modifier
  get modifier(): number; // $derived: abilityModifier + (isProficient ? proficiencyBonus : 0) + additionalModifiers.total
}

interface SavingThrow {
  ability: AbilityKey;
  isProficient: $state.raw<boolean>;
  additionalModifiers: ModifierCollection;
  
  // Computed modifier
  get modifier(): number; // $derived
}