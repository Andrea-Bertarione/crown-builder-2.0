<script lang="ts">
    import { Card, Button, Badge, Accordion, AccordionItem, Modal } from "flowbite-svelte";
    import { ChevronRightOutline } from "flowbite-svelte-icons";
    import type { CharacterRaceData } from "$lib/data/races.data";
    import type {Race} from "$lib/types/character";
    import type {Feature} from "$lib/types/feature";
    import type {AbilityKey} from "$lib/types/skills&Saves";
    import type {AbilityScores} from "$lib/types/abilityScore";
    import racesData from "$lib/data/races.data";
    import { getFeatureById } from "$lib/data/features.data";
    import type {Character} from "$lib/characterHandler/character.svelte";

    let { character = $bindable() }: {character: Character} = $props();

    let selectedRacePreview = $state<CharacterRaceData | null>(null);
    const raceList = Object.values(racesData) as CharacterRaceData[];

    function previewRace(race: CharacterRaceData) {
        selectedRacePreview = race;
    }

    function confirmRace() {
        if (selectedRacePreview) {
            // Transform CharacterRaceData into Race
            character.race = transformRaceData(selectedRacePreview);
            selectedRacePreview = null;
        }
    }

    function transformRaceData(raceData: CharacterRaceData): Race {
        // Build ability score bonuses
        const abilityScoreBonuses: Partial<AbilityScores> = {};

        if (raceData.fixedModifiers) {
            Object.entries(raceData.fixedModifiers).forEach(([ability, bonus]) => {
                abilityScoreBonuses[ability as AbilityKey] = bonus;
            });
        }

        // If there are choice modifiers, you'd need to handle those separately
        // (they require user input, so this might not be the place)

        // Build features from the race data
        const features: Feature[] = [];

        if (raceData.features) {
            raceData.features.forEach(featureName => {
                const fea = getFeatureById(featureName);
                if (fea) {
                    features.push(fea);
                }
            });
        }

        // Handle languages as features or store them separately
        // This depends on how your Feature system works

        // Build subraces if they exist
        const subraces: Race[] | undefined = raceData.subraces
            ? raceData.subraces.map(subraceData => transformRaceData(subraceData))
            : undefined;

        return {
            id: raceData.name.toLowerCase().replace(/\s+/g, '-'), // or generate proper ID
            name: raceData.name,
            description: raceData.description,
            features,
            subraces,
            abilityScoreBonuses
        };
    }

    function closeModal() {
        selectedRacePreview = null;
    }
</script>

<div class="space-y-6 w-full">
    <!-- Race Selector Grid -->
    <Card size="xl" class="p-8">
        <h2 class="text-3xl text-sky-600 dark:text-sky-300 font-bold mb-8">Choose Your Race</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {#each raceList as race (race.name)}
                <button
                        onclick={() => previewRace(race)}
                        class="p-5 text-left dark:text-white border rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-400 transition-all group {character.race && character.race.name === race.name ? 'bg-sky-50 dark:bg-sky-900/20 border-sky-400' : ''}"
                >
                    <div class="flex items-start justify-between mb-3">
                        <h3 class="font-semibold text-lg group-hover:text-sky-600 dark:group-hover:text-sky-300">
                            {race.name}
                        </h3>
                        <ChevronRightOutline class="w-5 h-5 text-gray-400 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors" />
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                        {race.description}
                    </p>
                    {#if race.subraces && race.subraces.length > 0}
                        <div class="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            {race.subraces.length} subrace{race.subraces.length !== 1 ? 's' : ''}
                        </div>
                    {/if}
                </button>
            {/each}
        </div>
    </Card>

    <!-- Status -->
    {#if character.race}
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-1/4">
            <div class="flex items-center justify-center gap-2">
                <span class="text-sm dark:text-white">Status:</span>
                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-sm font-medium">
                    <span class="h-2 w-2 rounded-full bg-green-500" />
                    {character.race.name} selected
                </span>
            </div>
        </div>
    {/if}
</div>

<!-- Race Details Modal -->
<Modal size="lg" open={!!selectedRacePreview} onclose={closeModal}>
    {#if selectedRacePreview}
        <div class="space-y-6 p-6">
            <div>
                <h2 class="text-3xl text-sky-600 dark:text-sky-300 font-bold">{selectedRacePreview.name}</h2>
            </div>

            <p class="text-gray-700 dark:text-white leading-relaxed text-base">
                {selectedRacePreview.description}
            </p>

            <Accordion class="border-t border-gray-200 dark:border-gray-700">
                <!-- Ability Modifiers -->
                <AccordionItem>
                    {#snippet header()}
                        <span class="font-semibold dark:text-white">Ability Score Modifiers</span>
                    {/snippet}

                    <div class="space-y-3">
                        {#if selectedRacePreview.fixedModifiers && Object.keys(selectedRacePreview.fixedModifiers).length > 0}
                            <div>
                                <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Fixed Modifiers:</p>
                                <div class="flex flex-wrap gap-2">
                                    {#each Object.entries(selectedRacePreview.fixedModifiers) as [ability, modifier]}
                                        <Badge color="sky">
                                            {ability.charAt(0).toUpperCase() + ability.slice(1).toLowerCase()} +{modifier}
                                        </Badge>
                                    {/each}
                                </div>
                            </div>
                        {/if}

                        {#if selectedRacePreview.choiceModifiers && selectedRacePreview.choiceModifiers.length > 0}
                            <div>
                                <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                    Choose {selectedRacePreview.choiceModifiers.length} ability modifier{selectedRacePreview.choiceModifiers.length !== 1 ? 's' : ''}:
                                </p>
                                <div class="inline-block px-3 py-1 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded text-sm text-gray-600 dark:text-gray-300">
                                    +{selectedRacePreview.choiceModifiers.join(', +')} (selected in Ability Scores step)
                                </div>
                            </div>
                        {/if}
                    </div>
                </AccordionItem>

                <!-- Languages -->
                {#if (selectedRacePreview.languages && selectedRacePreview.languages.length > 0) || (selectedRacePreview.languageChoices && selectedRacePreview.languageChoices > 0)}
                    <AccordionItem>
                        {#snippet header()}
                            <span class="font-semibold dark:text-white">Languages</span>
                        {/snippet}

                        <div class="space-y-3">
                            {#if selectedRacePreview.languages && selectedRacePreview.languages.length > 0}
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Known Languages:</p>
                                    <div class="flex flex-wrap gap-2">
                                        {#each selectedRacePreview.languages as language}
                                            <Badge color="purple">
                                                {language}
                                            </Badge>
                                        {/each}
                                    </div>
                                </div>
                            {/if}

                            {#if selectedRacePreview.languageChoices && selectedRacePreview.languageChoices > 0}
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-gray-300">
                                        Choose {selectedRacePreview.languageChoices} additional language{selectedRacePreview.languageChoices !== 1 ? 's' : ''}
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        (Selected in Languages step)
                                    </p>
                                </div>
                            {/if}
                        </div>
                    </AccordionItem>
                {/if}

                <!-- Features -->
                {#if selectedRacePreview.features && selectedRacePreview.features.length > 0}
                    <AccordionItem>
                        {#snippet header()}
                            <span class="font-semibold dark:text-white">Racial Features ({selectedRacePreview?.features?.length})</span>
                        {/snippet}

                        <div class="space-y-3">
                            {#each selectedRacePreview.features as feature}
                                <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <p class="font-medium text-sm dark:text-white">{feature}</p>
                                </div>
                            {/each}
                        </div>
                    </AccordionItem>
                {/if}

                <!-- Subraces Info -->
                {#if selectedRacePreview.subraces && selectedRacePreview.subraces.length > 0}
                    <AccordionItem>
                        {#snippet header()}
                            <span class="font-semibold dark:text-white">Subraces ({selectedRacePreview?.subraces?.length})</span>
                        {/snippet}

                        <div class="space-y-3">
                            {#each selectedRacePreview.subraces as subrace}
                                <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <p class="font-medium text-sm dark:text-white">{subrace.name}</p>
                                    <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">{subrace.description}</p>
                                </div>
                            {/each}
                        </div>
                    </AccordionItem>
                {/if}
            </Accordion>

            <!-- Action Buttons -->
            <div class="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button onclick={closeModal} color="gray" class="flex-1">
                    Cancel
                </Button>
                <Button onclick={confirmRace} color="sky" class="flex-1">
                    Confirm {selectedRacePreview.name}
                </Button>
            </div>
        </div>
    {/if}
</Modal>
