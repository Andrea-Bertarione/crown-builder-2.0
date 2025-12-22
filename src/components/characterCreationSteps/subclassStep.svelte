<script lang="ts">
    import { Card, Button, Badge, Accordion, AccordionItem, Modal, Tabs, TabItem } from "flowbite-svelte";
    import { ChevronRightOutline, ChevronLeftOutline } from "flowbite-svelte-icons";
    import ClassesData, { type ClassData } from "$lib/data/classes.data";
    import classesData, { getFeaturesForLevel, getSpellcastingAbilityAtLevel } from "$lib/data/classes.data";
    import type { Character } from "$lib/characterHandler/character.svelte";
    import type { Subclass } from "$lib/types/character";
    import type { Feature } from "$lib/types/feature";
    import { getFeatureById } from "$lib/data/features.data";
    import {buildFullClass} from "$lib/data/classes.data";

    let { character = $bindable() }: { character: Character } = $props();

    let selectedSubclass = $state<ClassData | null>(null);
    let currentLevel = $state<number>(character.level ?? 1);

    const classData = classesData[character.class?.id ?? 'barbarian'] as ClassData;
    const subclassOptions = classData.subclasses ?? [];

    // Build Subclass from ClassData
    function buildSubclassFromData(subclassData: ClassData, level: number): Subclass {
        const features: Feature[] = [];
        const featureNames = new Set<string>();

        // Collect subclass features from level unlock to current level
        const subclassStartLevel = classData.subclassLevel ?? 1;
        for (let i = Math.max(subclassStartLevel, 1); i <= level; i++) {
            (subclassData.levels[i]?.features ?? []).forEach(f => featureNames.add(f));
        }

        // Resolve feature names to Feature objects
        featureNames.forEach(featureName => {
            const feature = getFeatureById(featureName);
            if (feature) {
                features.push(feature);
            }
        });

        return {
            id: subclassData.name.toLowerCase().replace(/\s+/g, '-'),
            name: subclassData.name,
            description: subclassData.description,
            features,
            parentClass: character.class!
        };
    }

    function confirmSubclass() {
        if (selectedSubclass && character.class) {
            character.subclass = buildSubclassFromData(selectedSubclass, currentLevel);
            selectedSubclass = null;
        }
    }

    function closeModal() {
        selectedSubclass = null;
    }

    function clearSubclass() {
        character.subclass = null;
        // Optionally rebuild race to remove subrace bonuses
        character.class = buildFullClass(ClassesData[character.class!.name], character);
    }

    let isValid = $derived.by(() => {
        return !!character.subclass;
    });
</script>

<div class="space-y-6 w-full">
    <!-- Header -->
    <Card size="xl" class="p-8 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 border-sky-200 dark:border-sky-900">
        <div class="space-y-2">
            <h1 class="text-4xl font-bold text-sky-600 dark:text-sky-300">Choose Your Subclass</h1>
            <p class="text-gray-600 dark:text-gray-300">
                {character.class?.name} • Level {currentLevel}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
                Subclasses unlock at level {classData.subclassLevel ?? 1}
            </p>
        </div>
    </Card>

    <!-- Subclass Selection Grid -->
    <Card size="xl" class="p-8">
        <h2 class="text-2xl text-sky-600 dark:text-sky-300 font-bold mb-6">Available Subclasses</h2>

        {#if subclassOptions.length === 0}
            <div class="p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p class="text-gray-600 dark:text-gray-400">
                    No subclasses available for {character.class?.name}
                </p>
            </div>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                {#each subclassOptions as subclass (subclass.name)}
                    <button
                            onclick={() => (selectedSubclass = subclass)}
                            class={`p-6 text-left border-2 rounded-lg transition-all group ${
                            character.subclass?.name === subclass.name
                                ? 'border-sky-400 dark:border-sky-300 bg-sky-50 dark:bg-sky-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-sky-300 dark:hover:border-sky-600 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        }`}
                    >
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <h3 class="font-semibold text-lg dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300">
                                    {subclass.name}
                                </h3>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Unlocks at Level {classData.subclassLevel ?? 1}
                                </p>
                            </div>
                            <ChevronRightOutline
                                    class={`w-5 h-5 transition-all ${
                                    character.subclass?.name === subclass.name
                                        ? 'text-sky-600 dark:text-sky-300'
                                        : 'text-gray-400 group-hover:text-sky-600 dark:group-hover:text-sky-300'
                                }`}
                            />
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {subclass.description}
                        </p>

                        {#if Object.keys(subclass.levels).length > 0}
                            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                <p class="text-xs text-gray-500 dark:text-gray-400">
                                    {Object.keys(subclass.levels).length} feature milestone{Object.keys(subclass.levels).length !== 1 ? 's' : ''}
                                </p>
                            </div>
                        {/if}
                    </button>
                {/each}
            </div>
        {/if}
    </Card>

    <!-- Status -->
    <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-1/4">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span class="text-sm dark:text-white">Status:</span>
                {#if isValid}
                        <span
                                class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-sm font-medium"
                        >
                            <span class="h-2 w-2 rounded-full bg-green-500"></span>
                            {character.subclass?.name} selected
                        </span>
                {:else}
                        <span
                                class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 text-sm font-medium"
                        >
                            <span class="h-2 w-2 rounded-full bg-yellow-500"></span>
                            Choose a subclass
                        </span>
                {/if}
            </div>
            {#if character.subrace}
                <Button onclick={clearSubclass} color="gray" size="sm">
                    Clear selection
                </Button>
            {/if}
        </div>
    </div>

    <!-- Detailed Preview -->
    {#if selectedSubclass}
        <Modal size="xl" class="p-8" open={!!selectedSubclass}>
                    <div class="space-y-6">
                        <div>
                            <h3 class="text-2xl font-bold text-sky-600 dark:text-sky-300 mb-2">
                                {selectedSubclass.name}
                            </h3>
                            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {selectedSubclass.description}
                            </p>
                        </div>

                        <!-- Key Info -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Parent Class</p>
                                <p class="font-semibold dark:text-white">{character.class?.name}</p>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Unlock Level</p>
                                <p class="font-semibold dark:text-white">Level {classData.subclassLevel ?? 1}</p>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Feature Milestones</p>
                                <p class="font-semibold dark:text-white">{Object.keys(selectedSubclass.levels).length}</p>
                            </div>
                        </div>

                        <!-- Feature Progression Timeline -->
                        <div>
                            <h4 class="font-semibold text-lg dark:text-white mb-4">Feature Progression</h4>
                            <div class="space-y-3">
                                {#each Object.entries(selectedSubclass.levels).sort((a, b) => a[0] - b[0]) as [level, levelData]}
                                    <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <div class="flex items-center gap-3 mb-2">
                                            <Badge color={parseInt(level) <= currentLevel ? 'green' : 'gray'}>
                                                Level {level}
                                            </Badge>
                                            {#if parseInt(level) <= currentLevel}
                                                <span class="text-xs text-green-600 dark:text-green-400">Unlocked</span>
                                            {:else}
                                                <span class="text-xs text-gray-500 dark:text-gray-400">Locked</span>
                                            {/if}
                                        </div>
                                        <div class="flex flex-wrap gap-2">
                                            {#each levelData.features ?? [] as feature}
                                                <Badge color="blue">
                                                    {feature}
                                                </Badge>
                                            {/each}
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>

            <div class="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button onclick={closeModal} color="gray" class="flex-1">
                    Cancel
                </Button>
                <Button onclick={confirmSubclass} color="sky" class="flex-1">
                    Confirm {selectedSubclass?.name ?? 'Subclass'}
                </Button>
            </div>
        </Modal>
    {/if}
</div>

<style>
    :global(.subclass-selector button:hover) {
        transform: translateY(-2px);
    }
</style>
