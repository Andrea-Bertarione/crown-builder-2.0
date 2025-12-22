import type { AbilityScores, AbilityKey } from './ability.d.ts';
import type { SkillName } from './skill.d.ts';
import type { Modifier } from './modifier.d.ts';
import type { Action } from './action.d.ts';
import type { Reaction } from './reaction.d.ts';
import type { DamageResistance, DamageType } from './damage.d.ts';

// A feature can affect many things about the character
type FeatureType = 
  | 'race'
  | 'class'
  | 'subclass'
  | 'feat'
  | 'spell'
  | 'item'
  | 'background'
  | 'condition';

// The core Feature interface - very flexible
interface Feature {
  id: string;
  name: string;
  type: FeatureType;
  description: string;
  
  // Optional: Does this feature apply modifiers?
  modifiers?: {
    abilityScores?: Partial<AbilityScores>;  // e.g., Half-Orc: STR +2, INT -2
    ac?: Modifier[];                          // Applied to AC calculation
    initiative?: Modifier[];                  // Applied to initiative
    savingThrows?: Partial<Record<AbilityKey, Modifier[]>>;
    skillModifiers?: Partial<Record<SkillName, Modifier[]>>;
    spellDC?: Modifier[];
    spellAttackBonus?: Modifier[];
  };
  
  // Optional: Triggered actions (attacks, spells)
  actions?: Action[];
  
  // Optional: Passive effects
  passiveEffects?: PassiveEffect[];
  
  // Optional: Reactions
  reactions?: Reaction[];
  
  // Optional: Does this feature change how rolls work?
  rollModifiers?: {
    weaponAttacks?: Modifier[];
    spellAttacks?: Modifier[];
    damageRolls?: Modifier[];
    savingThrows?: Modifier[];
  };
  
  // For tracking feature state
  active: $state.raw<boolean>;
  uses?: FeatureUse;  // e.g., "can use 3 times per long rest"
}

// Track uses/charges on a feature
interface FeatureUse {
  current: $state.raw<number>;
  maximum: number;
  rechargeType: 'long_rest' | 'short_rest' | 'round' | 'turn' | 'never';
  lastRechargedAt?: $state.raw<number>;  // Timestamp
}

// Passive effects that apply whenever the feature is active
interface PassiveEffect {
  id: string;
  description: string;
  
  // What does this affect?
  affects: {
    ac?: number;                      // e.g., Unarmored Defense adds DEX
    initiative?: Modifier[];
    resistances?: DamageResistance[];
    immunities?: DamageType[];
    vulnerabilities?: DamageType[];
  };
}

export { Feature, FeatureType, FeatureUse, PassiveEffect };