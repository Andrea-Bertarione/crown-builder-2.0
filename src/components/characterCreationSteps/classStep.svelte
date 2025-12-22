<script lang="ts">
    import { Card, Button, Badge, Accordion, AccordionItem, Modal } from "flowbite-svelte";
    import { ChevronRightOutline } from "flowbite-svelte-icons";
    import {buildFullClass, type ClassData} from "$lib/data/classes.data";
    import classesData, { getFeaturesForLevel, getSpellcastingAbilityAtLevel } from "$lib/data/classes.data";
    import type { Character } from "$lib/characterHandler/character.svelte";

    let { character = $bindable() }: { character: Character } = $props();

    let selectedClassPreview = $state<ClassData | null>(null);
    let selectedLevel = $state<number>(1);
    let selectedSubclass = $state<ClassData | null>(null);
    const classList = Object.values(classesData) as ClassData[];

    function previewClass(classData: ClassData) {
        selectedClassPreview = classData;
        selectedLevel = 1;
        selectedSubclass = null;
    }

    function confirmClass() {
        if (selectedClassPreview) {
            character.class = buildFullClass(selectedClassPreview, character, selectedLevel, selectedSubclass ?? undefined);
            selectedClassPreview = null;
        }
    }

    function closeModal() {
        selectedClassPreview = null;
    }

    function selectSubclass(subclass: ClassData) {
        selectedSubclass = subclass;
    }

    $effect(() => {
        // Reset subclass if level is below subclass requirement
        if (selectedClassPreview && selectedLevel < (selectedClassPreview.subclassLevel ?? 1)) {
            selectedSubclass = null;
        }
    });
</script>

<!-- Rest of the component stays the same -->
<div class="space-y-6 w-full">
    <!-- Class Selector Grid -->
    <Card size="xl" class="p-8">
        <h2 class="text-3xl text-sky-600 dark:text-sky-300 font-bold mb-8">Choose Your Class</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {#each classList as classData (classData.name)}
                <button
                        onclick={() => previewClass(classData)}
                        class={`p-5 text-left dark:text-white border rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-400 transition-all group ${
                        character.class && character.class.name === classData.name
                            ? 'bg-sky-50 dark:bg-sky-900/20 border-sky-400'
                            : ''
                    }`}
                >
                    <div class="flex items-start justify-between mb-3">
                        <h3 class="font-semibold text-lg group-hover:text-sky-600 dark:group-hover:text-sky-300">
                            {classData.name}
                        </h3>
                        <ChevronRightOutline class="w-5 h-5 text-gray-400 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors" />
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                        {classData.description}
                    </p>
                    <div class="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>Hit Dice</span>
                        <span>•</span>
                        <span>d{classData.hitDieSize}</span>
                        <span>•</span>
                        <span>{classData.primaryAbility.toUpperCase()}</span>
                    </div>
                </button>
            {/each}
        </div>
    </Card>

    <!-- Status -->
    {#if character.class}
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-1/4">
            <div class="flex items-center justify-center gap-2">
                <span class="text-sm dark:text-white">Status:</span>
                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-sm font-medium">
                    <span class="h-2 w-2 rounded-full bg-green-500" />
                    {character.class.name} selected
                </span>
            </div>
        </div>
    {/if}
</div>

<!-- Class Details Modal -->
<Modal size="lg" open={!!selectedClassPreview} onclose={closeModal}>
    {#if selectedClassPreview}
        <div class="space-y-6 p-6">
            <div>
                <h2 class="text-3xl text-sky-600 dark:text-sky-300 font-bold">{selectedClassPreview.name}</h2>
                <div class="flex gap-3 mt-2">
                    <Badge color="sky">d{selectedClassPreview.hitDieSize}</Badge>
                    <Badge color="blue">{selectedClassPreview.primaryAbility.toUpperCase()}</Badge>
                    {#if selectedClassPreview.levels[1]?.spellcastingAbility}
                        <Badge color="purple">Spellcasting</Badge>
                    {/if}
                </div>
            </div>

            <p class="text-gray-700 dark:text-white leading-relaxed text-base">
                {selectedClassPreview.description}
            </p>

            <Accordion class="border-t border-gray-200 dark:border-gray-700">
                <!-- Primary Ability & Saving Throws -->
                <AccordionItem>
                    {#snippet header()}
                        <span class="font-semibold dark:text-white">Abilities & Proficiencies</span>
                    {/snippet}

                    <div class="space-y-4">
                        <div>
                            <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Primary Ability:</p>
                            <Badge color="sky">
                                {selectedClassPreview.primaryAbility.charAt(0).toUpperCase() +
                                selectedClassPreview.primaryAbility.slice(1).toLowerCase()}
                            </Badge>
                        </div>

                        {#if selectedClassPreview.savingThrowProficiencies && selectedClassPreview.savingThrowProficiencies.length > 0}
                            <div>
                                <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Saving Throw Proficiencies:</p>
                                <div class="flex flex-wrap gap-2">
                                    {#each selectedClassPreview.savingThrowProficiencies as save}
                                        <Badge color="green">
                                            {save.charAt(0).toUpperCase() + save.slice(1).toLowerCase()}
                                        </Badge>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    </div>
                </AccordionItem>

                <!-- Skills -->
                {#if selectedClassPreview.skillProficiencies && selectedClassPreview.skillProficiencies.length > 0}
                    <AccordionItem>
                        {#snippet header()}
                            <span class="font-semibold dark:text-white">
                                Skills
                                {#if selectedClassPreview?.skillChoices}
                                    (Choose {selectedClassPreview.skillChoices})
                                {/if}
                            </span>
                        {/snippet}

                        <div class="space-y-3">
                            <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Available Skills:</p>
                            <div class="grid grid-cols-2 gap-2">
                                {#each selectedClassPreview.skillProficiencies as skill}
                                    <div class="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm dark:text-white">
                                        {skill}
                                    </div>
                                {/each}
                            </div>
                            {#if selectedClassPreview.skillChoices}
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-3">
                                    You will choose {selectedClassPreview.skillChoices} skill{selectedClassPreview.skillChoices !== 1 ? 's' : ''} from above
                                </p>
                            {/if}
                        </div>
                    </AccordionItem>
                {/if}

                <!-- Armor & Weapons -->
                {#if (selectedClassPreview.armorProficiencies && selectedClassPreview.armorProficiencies.length > 0) || (selectedClassPreview.weaponProficiencies && selectedClassPreview.weaponProficiencies.length > 0)}
                    <AccordionItem>
                        {#snippet header()}
                            <span class="font-semibold dark:text-white">Armor & Weapons</span>
                        {/snippet}

                        <div class="space-y-4">
                            {#if selectedClassPreview.armorProficiencies && selectedClassPreview.armorProficiencies.length > 0}
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Armor Proficiencies:</p>
                                    <div class="flex flex-wrap gap-2">
                                        {#each selectedClassPreview.armorProficiencies as armor}
                                            <Badge color="orange">
                                                {armor}
                                            </Badge>
                                        {/each}
                                    </div>
                                </div>
                            {/if}

                            {#if selectedClassPreview.weaponProficiencies && selectedClassPreview.weaponProficiencies.length > 0}
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Weapon Proficiencies:</p>
                                    <div class="flex flex-wrap gap-2">
                                        {#each selectedClassPreview.weaponProficiencies as weapon}
                                            <Badge color="red">
                                                {weapon}
                                            </Badge>
                                        {/each}
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </AccordionItem>
                {/if}

                <!-- Spellcasting -->
                {#if getSpellcastingAbilityAtLevel(selectedClassPreview, selectedLevel)}
                    <AccordionItem>
                        {#snippet header()}
                            <span class="font-semibold dark:text-white">Spellcasting</span>
                        {/snippet}

                        <div class="space-y-3">
                            <div>
                                <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Spellcasting Ability:</p>
                                <Badge color="purple">
                                    {getSpellcastingAbilityAtLevel(selectedClassPreview, selectedLevel)?.charAt(0).toUpperCase()}
                                    {getSpellcastingAbilityAtLevel(selectedClassPreview, selectedLevel)?.slice(1).toLowerCase()}
                                </Badge>
                            </div>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                You will select spells in the Spells step
                            </p>
                        </div>
                    </AccordionItem>
                {/if}

                <!-- Level Features -->
                {#if selectedLevel > 0}
                    <AccordionItem>
                        {#snippet header()}
                            <span class="font-semibold dark:text-white">
                                Features at Level {selectedLevel}
                                <span class="text-gray-500 dark:text-gray-400 text-sm ml-2">
                                    ({selectedClassPreview && getFeaturesForLevel(selectedClassPreview, selectedLevel).length})
                                </span>
                            </span>
                        {/snippet}

                        <div class="space-y-3">
                            {#if getFeaturesForLevel(selectedClassPreview, selectedLevel).length > 0}
                                {#each getFeaturesForLevel(selectedClassPreview, selectedLevel) as feature}
                                    <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <p class="font-medium text-sm dark:text-white">{feature}</p>
                                    </div>
                                {/each}
                            {:else}
                                <p class="text-sm text-gray-500 dark:text-gray-400">No new features gained at this level</p>
                            {/if}
                        </div>
                    </AccordionItem>
                {/if}

                <!-- Subclasses Info -->
                {#if selectedClassPreview.subclasses && selectedClassPreview.subclasses.length > 0}
                    <AccordionItem>
                        {#snippet header()}
                            <span class="font-semibold dark:text-white">
                                Subclasses ({selectedClassPreview?.subclasses?.length})
                                <span class="text-gray-500 dark:text-gray-400 text-sm ml-2">
                                    Available at Level {selectedClassPreview?.subclassLevel ?? 1}
                                </span>
                            </span>
                        {/snippet}

                        <div class="space-y-3">
                            {#if selectedLevel >= (selectedClassPreview.subclassLevel ?? 1)}
                                {#each selectedClassPreview.subclasses as subclass}
                                    <button
                                            onclick={() => selectSubclass(subclass)}
                                            class={`w-full p-3 text-left bg-gray-50 dark:bg-gray-800 rounded-lg border-2 transition-all ${
                                            selectedSubclass?.name === subclass.name
                                                ? 'border-sky-400 dark:border-sky-300 bg-sky-50 dark:bg-sky-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                    >
                                        <p class="font-medium text-sm dark:text-white">{subclass.name}</p>
                                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">{subclass.description}</p>
                                    </button>
                                {/each}
                            {:else}
                                <p class="text-sm text-gray-500 dark:text-gray-400">
                                    Subclasses unlock at Level {selectedClassPreview?.subclassLevel ?? 1}
                                </p>
                            {/if}
                        </div>
                    </AccordionItem>
                {/if}
            </Accordion>

            <!-- Action Buttons -->
            <div class="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button onclick={closeModal} color="gray" class="flex-1">
                    Cancel
                </Button>
                <Button onclick={confirmClass} color="sky" class="flex-1">
                    Confirm {selectedClassPreview.name}
                </Button>
            </div>
        </div>
    {/if}
</Modal>
