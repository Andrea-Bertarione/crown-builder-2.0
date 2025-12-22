<script lang="ts">
    import { Card, Label, Input, Select, Button } from "flowbite-svelte";

    let { character = $bindable() } = $props();

    const alignments = [
        { value: "lawful_good", name: "Lawful Good" },
        { value: "neutral_good", name: "Neutral Good" },
        { value: "chaotic_good", name: "Chaotic Good" },
        { value: "lawful_neutral", name: "Lawful Neutral" },
        { value: "true_neutral", name: "True Neutral" },
        { value: "chaotic_neutral", name: "Chaotic Neutral" },
        { value: "lawful_evil", name: "Lawful Evil" },
        { value: "neutral_evil", name: "Neutral Evil" },
        { value: "chaotic_evil", name: "Chaotic Evil" },
    ];

    let characterName = $state(character.name ?? "");
    let playerName = $state(character.playerName ?? "");
    let alignment = $state(character.alignment ?? "");

    $effect(() => {
        character.name = characterName;
        character.playerName = playerName;
        character.alignment = alignment;
    });

    let isValid = $derived.by(() => {
        return characterName.trim().length > 0;
    });
</script>

<div class="min-w-1/3 space-y-6">
    <Card size="xl" class="p-6">
        <h2 class="text-2xl text-sky-600 dark:text-sky-300 font-bold mb-6">Basic Information</h2>

        <div class="space-y-6">
            <!-- Character Name -->
            <div class="space-y-2">
                <Label for="char-name" class="text-base font-semibold">
                    Character Name <span class="text-red-500">*</span>
                </Label>
                <Input
                        id="char-name"
                        bind:value={characterName}
                        placeholder="Enter character name"
                        type="text"
                        required
                />
                {#if characterName.trim() === ""}
                    <p class="text-sm text-red-500">Character name is required</p>
                {/if}
            </div>

            <!-- Player Name -->
            <div class="space-y-2">
                <Label for="player-name" class="text-base font-semibold">
                    Player Name <span class="text-gray-400 text-sm">(optional)</span>
                </Label>
                <Input
                        id="player-name"
                        bind:value={playerName}
                        placeholder="Enter your name (optional)"
                        type="text"
                />
            </div>

            <!-- Alignment -->
            <div class="space-y-2">
                <Label for="alignment" class="text-base font-semibold">
                    Alignment
                </Label>
                <Select
                        id="alignment"
                        bind:value={alignment}
                        items={alignments}
                        placeholder="Choose alignment"
                />
            </div>

            <!-- Status -->
            <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-600 dark:text-gray-300">
                        Status:
                    </span>
                    {#if isValid}
                        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-sm font-medium">
                            <span class="h-2 w-2 rounded-full bg-green-500"></span>
                            Ready to continue
                        </span>
                    {:else}
                        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 text-sm font-medium">
                            <span class="h-2 w-2 rounded-full bg-yellow-500"></span>
                            Enter character name
                        </span>
                    {/if}
                </div>
            </div>
        </div>
    </Card>
</div>

<style>
    /* Optional: Add any custom styles here */
</style>
