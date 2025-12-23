type WeaponCategory = 'melee' | 'ranged';
type WeaponType = 'simple_melee' | 'martial_melee' | 'simple_ranged' | 'martial_ranged';
type WeaponPrototype = 'longsword' | 'shortsword' | 'rapier' | 'longbow' | 'shortbow' | 'sling' | 'dagger' | 'crossbow' | 'greataxe' | 'handaxe' | 'throwing_axe' | 'greatsword';

interface Weapon {
    id: string;
    name: string;
    category: WeaponCategory;
    prototype: WeaponPrototype;
    type: WeaponType;

    // Damage
    damageDice: string;           // e.g., "1d8", "2d6"
    damageType: DamageType;
    damageModifier: AbilityKey;   // Usually "strength" or "dexterity"

    // Additional properties
    properties: WeaponProperty[];  // "finesse", "versatile", "thrown", etc.
    versatileDamage?: string;      // e.g., "1d10" when used two-handed

    // Bonuses specific to this weapon
    modifiers: ModifierCollection; // e.g., +1 magic weapon
}

type WeaponProperty =
    | 'finesse'
    | 'heavy'
    | 'light'
    | 'loading'
    | 'range'
    | 'reach'
    | 'thrown'
    | 'two_handed'
    | 'versatile'
    | 'ammunition';

// A single attack using a weapon
interface Attack {
    id: string;
    weapon: Weapon;

    // Attack modifiers (STR/DEX mod, proficiency, magic, buffs, etc.)
    get attackBonus(): number; // $derived: ability mod + proficiency (if proficient) + weapon modifiers

    // Roll info for UI
    get rollInfo(): {
        dice: string;                    // "1d20"
        modifier: number;
        label: string;                   // "Longsword: 1d20 + 7"
        breakdown: { label: string; value: number }[];  // For UI display
    }; // $derived

    // Damage calculation
    get damageRoll(): {
        dice: string;                    // "1d8"
        modifier: number;
        bonus?: number;
        label: string;                   // "1d8+4"
        breakdown: { label: string; value: number }[];
    }; // $derived
}

export { Weapon, WeaponCategory, WeaponProperty, WeaponType, Attack }