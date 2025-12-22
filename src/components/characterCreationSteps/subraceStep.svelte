<script lang="ts">
    import { Card, Button, Badge, Accordion, AccordionItem, Modal } from "flowbite-svelte";
    import { ChevronRightOutline } from "flowbite-svelte-icons";
    import RacesData, { type CharacterRaceData } from "$lib/data/races.data";
    import type { Character } from "$lib/characterHandler/character.svelte";
    import type {Race} from "$lib/types/character";

    interface Props {
        character: Character;
    }

    let { character = $bindable() }: Props = $props();

    let selectedSubracePreview = $state<CharacterRaceData | null>(null);

    $effect(() => {
        // Reset subrace selection if race changes
        if (character.race && character.subrace) {
            const hasSubrace = character.race.subraces?.some(
                s => s.name === character.subrace?.name
            );
            if (!hasSubrace) {
                character.subrace = null;
            }
        }
    });

    function buildRaceFromData(
        baseData: CharacterRaceData,
        subraceData?: CharacterRaceData
    ) {
        const fixedModifiers = {
            ...baseData.fixedModifiers,
            ...(subraceData?.fixedModifiers ?? {})
        };

        const features = [
            ...(baseData.features ?? []),
            ...(subraceData?.features ?? [])
        ];

        const languages = [
            ...(baseData.languages ?? []),
            ...(subraceData?.languages ?? [])
        ];

        return {
            name: baseData.name,
            description: baseData.description,
            fixedModifiers,
            choiceModifiers: baseData.choiceModifiers,
            languages,
            languageChoices: baseData.languageChoices,
            size: baseData.size,
            speed: baseData.speed,
            features,
            // Only include subraces if we're not merging with a subrace
            ...(subraceData ? {} : { subraces: baseData.subraces })
        } as unknown as Race;
    }


    let currentSubraces = $derived.by(() => character.race?.subraces ?? []);

    function previewSubrace(subrace: CharacterRaceData) {
        selectedSubracePreview = subrace;
    }

    function confirmSubrace() {
        if (!selectedSubracePreview || !character.race) return;
        // Store subrace as a Race object
        character.subrace = buildRaceFromData(selectedSubracePreview);

        selectedSubracePreview = null;
    }

    function closeModal() {
        selectedSubracePreview = null;
    }

    function clearSubrace() {
        character.subrace = null;
        // Optionally rebuild race to remove subrace bonuses
        character.race = buildRaceFromData(RacesData[character.race?.name || ""]);
    }

    let isValid = $derived.by(() => {
        return !!character.subrace;
    });
</script>

{#if !character.race}
    <Card class="p-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
        <h2 class="text-2xl text-yellow-700 dark:text-yellow-300 font-bold mb-3">
            Select a Race First
        </h2>
        <p class="text-yellow-600 dark:text-yellow-200">
            Please select a race before choosing a subrace.
        </p>
    </Card>
{:else if !character.race.subraces || character.race.subraces.length === 0}
    <Card class="p-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <h2 class="text-2xl text-blue-700 dark:text-blue-300 font-bold mb-3">
            {character.race.name} has no subraces
        </h2>
        <p class="text-blue-600 dark:text-blue-200 mb-4">
            {character.race.name} doesn't have subrace options. You can proceed to the next step!
        </p>
        <Button onclick={() => window.history.back()} color="blue" size="sm">
            Go back to races
        </Button>
    </Card>
{:else}
    <div class="space-y-6 w-full">
        <!-- Header -->
        <div>
            <h2 class="text-3xl text-sky-600 dark:text-sky-300 font-bold mb-2">
                Choose Your Subrace
            </h2>
            <p class="text-gray-600 dark:text-gray-300">
                Select a subrace for your {character.race.name}
            </p>
        </div>

        <!-- Subrace Grid -->
        <Card size="xl" class="p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {#each currentSubraces as subrace (subrace.name)}
                    <button
                            onclick={() => previewSubrace(subrace)}
                            class={`p-5 text-left rounded-lg border-2 transition-all group ${
                            character.subrace?.name === subrace.name
                                ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20'
                        }`}
                    >
                        <div class="flex items-start justify-between mb-3">
                            <h3
                                    class={`font-semibold text-lg ${
                                    character.subrace?.name === subrace.name
                                        ? 'text-sky-600 dark:text-sky-300'
                                        : 'text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300'
                                }`}
                            >
                                {subrace.name}
                            </h3>
                            <ChevronRightOutline
                                    class="w-5 h-5 text-gray-400 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors"
                            />
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                            {subrace.description}
                        </p>
                        {#if character.subrace?.name === subrace.name}
                            <div class="mt-3">
                                <Badge color="sky">Selected</Badge>
                            </div>
                        {/if}
                    </button>
                {/each}
            </div>
        </Card>

        <!-- Status -->
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <span class="text-sm dark:text-white">Status:</span>
                    {#if isValid}
                        <span
                                class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-sm font-medium"
                        >
                            <span class="h-2 w-2 rounded-full bg-green-500"></span>
                            {character.subrace?.name} selected
                        </span>
                    {:else}
                        <span
                                class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 text-sm font-medium"
                        >
                            <span class="h-2 w-2 rounded-full bg-yellow-500"></span>
                            Choose a subrace
                        </span>
                    {/if}
                </div>
                {#if character.subrace}
                    <Button onclick={clearSubrace} color="gray" size="sm">
                        Clear selection
                    </Button>
                {/if}
            </div>
        </div>
    </div>

    <!-- Subrace Details Modal -->
    <Modal size="lg" open={!!selectedSubracePreview} onclose={closeModal}>
        {#if selectedSubracePreview}
            <div class="space-y-6 p-6">
                <div>
                    <h2 class="text-3xl text-sky-600 dark:text-sky-300 font-bold">
                        {selectedSubracePreview.name}
                    </h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {character.race.name}
                    </p>
                </div>

                <p class="text-gray-700 dark:text-white leading-relaxed text-base">
                    {selectedSubracePreview.description}
                </p>

                <Accordion class="border-t border-gray-200 dark:border-gray-700">
                    <!-- Ability Modifiers -->
                    {#if selectedSubracePreview.fixedModifiers && Object.keys(selectedSubracePreview.fixedModifiers).length > 0}
                        <AccordionItem>
                            {#snippet header()}
                                <span class="font-semibold dark:text-white">
                                    Ability Score Modifiers
                                </span>
                            {/snippet}

                            <div class="space-y-3">
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                        Additional Modifiers:
                                    </p>
                                    <div class="flex flex-wrap gap-2">
                                        {#each Object.entries(selectedSubracePreview.fixedModifiers) as [ability, modifier]}
                                            <Badge color="sky">
                                                {ability.charAt(0).toUpperCase() +
                                                ability.slice(1).toLowerCase()}
                                                +{modifier}
                                            </Badge>
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </AccordionItem>
                    {/if}

                    <!-- Languages -->
                    {#if selectedSubracePreview.languages && selectedSubracePreview.languages.length > 0}
                        <AccordionItem>
                            {#snippet header()}
                                <span class="font-semibold dark:text-white">Languages</span>
                            {/snippet}

                            <div class="space-y-3">
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                        Additional Languages:
                                    </p>
                                    <div class="flex flex-wrap gap-2">
                                        {#each selectedSubracePreview.languages as language}
                                            <Badge color="purple">
                                                {language}
                                            </Badge>
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </AccordionItem>
                    {/if}

                    <!-- Features -->
                    {#if selectedSubracePreview.features && selectedSubracePreview.features.length > 0}
                        <AccordionItem>
                            {#snippet header()}
                                <span class="font-semibold dark:text-white">
                                    Subrace Features ({selectedSubracePreview?.features?.length})
                                </span>
                            {/snippet}

                            <div class="space-y-3">
                                {#each selectedSubracePreview.features as feature}
                                    <div
                                            class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                                    >
                                        <p class="font-medium text-sm dark:text-white">{feature}</p>
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
                    <Button onclick={confirmSubrace} color="sky" class="flex-1">
                        Confirm {selectedSubracePreview.name}
                    </Button>
                </div>
            </div>
        {/if}
    </Modal>
{/if}
