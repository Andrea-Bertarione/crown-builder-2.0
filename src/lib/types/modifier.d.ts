// Source of a modifier (for debugging, UI display)
type ModifierSource = 
  | 'ability'           // From ability modifier
  | 'proficiency'       // From proficiency bonus
  | 'feat'              // From a feat
  | 'spell'             // From an active spell
  | 'buff'              // From a temporary buff
  | 'condition'         // From a condition (e.g., advantage/disadvantage)
  | 'race'              // From racial feature
  | 'class'             // From class feature
  | 'item'              // From equipment
  | 'other';            // Catch-all

// Single modifier that can be applied to rolls, AC, damage, etc.
interface Modifier {
  id: string;                         // Unique identifier
  value: $state.raw<number>;          // The modifier value (can be negative)
  source: ModifierSource;
  label: string;                      // Human-readable: "Bless", "+2 from Cloak of Charisma"
  active: $state.raw<boolean>;        // Can be toggled (e.g., turn on/off a buff)
  description?: string;
  expiresAt?: number;                 // Timestamp for auto-expiring buffs
}

// Advantage/disadvantage system
type RollMode = 'normal' | 'advantage' | 'disadvantage';

// A collection of modifiers that can be summed
interface ModifierCollection {
  modifiers: $state.raw<Modifier[]>;
  
  // Add a modifier to the collection
  addModifier(mod: Modifier): void;
  
  // Remove a modifier by ID
  removeModifier(id: string): void;
  
  // Get total modifier (sum of all active modifiers)
  get total(): number; // $derived
  
  // Get active modifiers only
  get active(): Modifier[]; // $derived
  
  // For UI display: show all modifiers affecting this value
  getBreakdown(): { label: string; value: number }[]; // $derived
}

export { ModifierSource, Modifier, RollMode, ModifierCollection };