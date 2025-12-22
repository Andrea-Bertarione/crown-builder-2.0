<script lang="ts">
    import { Card, Button, Badge, Modal } from "flowbite-svelte";
    import { ChevronRightOutline, ChevronLeftOutline } from "flowbite-svelte-icons";
    import backgroundsData from "$lib/data/background.data";
    import type { Character } from "$lib/characterHandler/character.svelte";
    import type { Background } from "$lib/types/character";

    let { character = $bindable() }: { character: Character } = $props();

    let selectedBackground = $state<Background | null>(null);
    const backgroundList = Object.values(backgroundsData) as Background[];

    // Build Background from BackgroundData
    function buildBackgroundFromData(backgroundData: Background): Background {
        return {
            name: backgroundData.name,
            description: backgroundData.description,
            skillProficiencies: backgroundData.skillProficiencies,
            toolProficiencies: backgroundData.toolProficiencies,
            languageProficiencies: backgroundData.languageProficiencies,
            equipment: backgroundData.equipment,
            goldAmount: backgroundData.goldAmount ?? 0,
            personality: backgroundData.personality,
            ideals: backgroundData.ideals,
            bonds: backgroundData.bonds,
            flaws: backgroundData.flaws,
            feature: backgroundData.feature
        };
    }

    function confirmBackground() {
        if (selectedBackground) {
            character.background = buildBackgroundFromData(selectedBackground);
            selectedBackground = null;
        }
    }

    function closeModal() {
        selectedBackground = null;
    }

    function clearBackground() {
        character.background = null;
    }

    let isValid = $derived.by(() => {
        return !!character.background;
    });
</script>

<div class="space-y-6 w-full">
    <!-- Header -->
    <Card size="xl" class="p-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 border-emerald-200 dark:border-emerald-900">
        <div class="space-y-2">
            <h1 class="text-4xl font-bold text-emerald-600 dark:text-emerald-300">Choose Your Background</h1>
            <p class="text-gray-600 dark:text-gray-300">
                Define your character's origins, skills, and personality traits
            </p>
        </div>
    </Card>

    <!-- Background Selection Grid -->
    <Card size="xl" class="p-8">
        <h2 class="text-2xl text-emerald-600 dark:text-emerald-300 font-bold mb-6">Available Backgrounds</h2>

        <div class="grid grid-cols-1 md:grid-cols-7 gap-4">
            {#each backgroundList as background (background.name)}
                <button
                        onclick={() => (selectedBackground = background)}
                        class={`p-6 text-left border-2 rounded-lg transition-all group ${
                        character.background?.name === background.name
                            ? 'border-emerald-400 dark:border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                >
                    <div class="flex items-start justify-between mb-3">
                        <h3 class="font-semibold text-lg dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300">
                            {background.name}
                        </h3>
                        <ChevronRightOutline
                                class={`w-5 h-5 transition-all ${
                                character.background?.name === background.name
                                    ? 'text-emerald-600 dark:text-emerald-300'
                                    : 'text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300'
                            }`}
                        />
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {background.description}
                    </p>

                    <!-- Key Proficiencies -->
                    <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                        {#if background.skillProficiencies && background.skillProficiencies.length > 0}
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                Skills: {background.skillProficiencies.join(', ')}
                            </p>
                        {/if}
                        {#if background.goldAmount}
                            <p class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                Starting Gold: {background.goldAmount} gp
                            </p>
                        {/if}
                    </div>
                </button>
            {/each}
        </div>
    </Card>

    <!-- Status -->
    <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-1/4">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span class="text-sm dark:text-white">Status:</span>
                {#if isValid}
                    <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-sm font-medium">
                        <span class="h-2 w-2 rounded-full bg-green-500" />
                        {character.background?.name} selected
                    </span>
                {:else}
                    <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 text-sm font-medium">
                        <span class="h-2 w-2 rounded-full bg-yellow-500" />
                        Choose a background
                    </span>
                {/if}
            </div>
            {#if character.background}
                <Button onclick={clearBackground} color="gray" size="sm">
                    Clear selection
                </Button>
            {/if}
        </div>
    </div>

    <!-- Detailed Preview Modal -->
    {#if selectedBackground}
        <Modal size="xl" class="p-8 overflow-hidden" open={!!selectedBackground} onclose={closeModal}>
            <div class="space-y-6">
                <div>
                    <h3 class="text-2xl font-bold text-emerald-600 dark:text-emerald-300 mb-2">
                        {selectedBackground.name}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {selectedBackground.description}
                    </p>
                </div>

                <!-- Key Info -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    {#if selectedBackground.skillProficiencies}
                        <div>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Skill Proficiencies</p>
                            <div class="flex flex-wrap gap-2">
                                {#each selectedBackground.skillProficiencies as skill}
                                    <Badge color="emerald">{skill}</Badge>
                                {/each}
                            </div>
                        </div>
                    {/if}

                    {#if selectedBackground.toolProficiencies}
                        <div>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Tool Proficiencies</p>
                            <div class="flex flex-wrap gap-2">
                                {#each selectedBackground.toolProficiencies as tool}
                                    <Badge color="blue">{tool}</Badge>
                                {/each}
                            </div>
                        </div>
                    {/if}

                    {#if selectedBackground.languageProficiencies}
                        <div>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Languages</p>
                            <div class="flex flex-wrap gap-2">
                                {#each selectedBackground.languageProficiencies as lang}
                                    <Badge color="purple">{lang}</Badge>
                                {/each}
                            </div>
                        </div>
                    {/if}

                    {#if selectedBackground.goldAmount}
                        <div>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Starting Gold</p>
                            <Badge color="yellow">{selectedBackground.goldAmount} gp</Badge>
                        </div>
                    {/if}
                </div>

                <!-- Feature -->
                {#if selectedBackground.feature}
                    <div class="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                        <h4 class="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                            {selectedBackground.feature.name}
                        </h4>
                        <p class="text-sm text-emerald-800 dark:text-emerald-200">
                            {selectedBackground.feature.description}
                        </p>
                    </div>
                {/if}

                <!-- Character Traits -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {#if selectedBackground.personality}
                        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <h4 class="font-semibold text-sm dark:text-white mb-2">Personality Trait</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-300 italic">
                                "{selectedBackground.personality}"
                            </p>
                        </div>
                    {/if}

                    {#if selectedBackground.ideals}
                        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <h4 class="font-semibold text-sm dark:text-white mb-2">Ideals</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-300 italic">
                                "{selectedBackground.ideals}"
                            </p>
                        </div>
                    {/if}

                    {#if selectedBackground.bonds}
                        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <h4 class="font-semibold text-sm dark:text-white mb-2">Bonds</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-300 italic">
                                "{selectedBackground.bonds}"
                            </p>
                        </div>
                    {/if}

                    {#if selectedBackground.flaws}
                        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <h4 class="font-semibold text-sm dark:text-white mb-2">Flaws</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-300 italic">
                                "{selectedBackground.flaws}"
                            </p>
                        </div>
                    {/if}
                </div>

                <!-- Equipment -->
                {#if selectedBackground.equipment}
                    <div>
                        <h4 class="font-semibold dark:text-white mb-3">Starting Equipment</h4>
                        <div class="space-y-2">
                            {#each selectedBackground.equipment as item}
                                <div class="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                    <span class="text-emerald-600 dark:text-emerald-400">•</span>
                                    <span class="text-sm dark:text-white">{item}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button onclick={closeModal} color="gray" class="flex-1">
                    Cancel
                </Button>
                <Button onclick={confirmBackground} color="emerald" class="flex-1">
                    Confirm {selectedBackground?.name ?? 'Background'}
                </Button>
            </div>
        </Modal>
    {/if}
</div>

<style>
    :global(.background-selector button:hover) {
        transform: translateY(-2px);
    }
</style>
