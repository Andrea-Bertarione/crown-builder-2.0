import type {Character} from "$lib/characterHandler/character.svelte";

interface CharacterWrapper {
  character: Character;
  caption: string;
  campaignId: string;
}