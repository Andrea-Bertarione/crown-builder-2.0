// Fundamental D&D scores
interface AbilityScores {
  strength: number;      // STR
  dexterity: number;     // DEX
  constitution: number;  // CON
  intelligence: number;  // INT
  wisdom: number;        // WIS
  charisma: number;      // CHA
}

// Ability modifier computed from score
// D&D formula: (score - 10) / 2, rounded down
type AbilityModifier = number;

interface AbilityWithModifier {
  score: $state.raw<number>;
  get modifier(): AbilityModifier; // derived, computed on-the-fly
}


export { AbilityScores, AbilityModifier, AbilityWithModifier };