<script lang="ts">
    import { Card, Badge, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Select, Input } from "flowbite-svelte";
    import type { Character } from "$lib/characterHandler/character.svelte";
    import type { AbilityKey } from "$lib/types/skills&Saves";
    import {createComputedAbilities} from "$lib/characterHandler/abilityScore.svelte";
    import { rollDice } from "$lib/diceRoller";
    import { v4 as uuidv4 } from "uuid";

    let { character = $bindable() }: { character: Character } = $props();

    type AbilityScoreMethod = "Manual" | "Point Buy" | "3D6" | "4D6 Drop Lowest";

    const ABILITY_SCORES: AbilityKey[] = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

    const methodLimits: Record<AbilityScoreMethod, { min: number; max: number }> = {
        "Manual": { min: 3, max: 20 },
        "Point Buy": { min: 8, max: 15 },
        "3D6": { min: 3, max: 18 },
        "4D6 Drop Lowest": { min: 3, max: 18 }
    };

    const methodDefaults: Record<AbilityScoreMethod, Record<AbilityKey, number>> = {
        "Manual": {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10
        },
        "Point Buy": {
            strength: 8,
            dexterity: 8,
            constitution: 8,
            intelligence: 8,
            wisdom: 8,
            charisma: 8
        },
        "3D6": {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10
        },
        "4D6 Drop Lowest": {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10
        }
    };

    let scoreMethod = $state<AbilityScoreMethod>("Manual");
    let pointBuyRemaining = $state(27);
    let rolledScores = $state<{ id: string; value: number; used: boolean }[]>([]);
    let abilityToRolledId = $state<Record<AbilityKey, string | null>>({
        strength: null,
        dexterity: null,
        constitution: null,
        intelligence: null,
        wisdom: null,
        charisma: null
    });

    // Get computed abilities with all bonuses
    const computedAbilities = createComputedAbilities(character);

    const methodOptions = [
        { value: "Manual" as AbilityScoreMethod, name: "Manual" },
        { value: "Point Buy" as AbilityScoreMethod, name: "Point Buy" },
        { value: "3D6" as AbilityScoreMethod, name: "3D6" },
        { value: "4D6 Drop Lowest" as AbilityScoreMethod, name: "4D6 Drop Lowest" }
    ];

    function initializeScores() {
        const defaults = methodDefaults[scoreMethod];
        ABILITY_SCORES.forEach(ability => {
            character.abilityScores[ability].score = defaults[ability];
        });

        pointBuyRemaining = 27;
        rolledScores = [];
        abilityToRolledId = {
            strength: null,
            dexterity: null,
            constitution: null,
            intelligence: null,
            wisdom: null,
            charisma: null
        };

        if (scoreMethod === "3D6" || scoreMethod === "4D6 Drop Lowest") {
            generateRolledScores();
        }
    }

    function generateRolledScores() {
        rolledScores = Array(6).fill(null).map(() => {
            const roll = scoreMethod === "3D6" ? rollDice("3d6") : rollDice("4d6");
            let result = roll.result;

            if (scoreMethod === "4D6 Drop Lowest") {
                const results = roll.diceRolls.map(d => d.result);
                result = results.reduce((sum, r) => sum + r, 0) - Math.min(...results);
            }

            return {
                id: uuidv4(),
                value: result,
                used: false
            };
        });
    }

    function getPointBuyCost(currentScore: number, newScore: number): number {
        const costs: Record<number, number> = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
        return (costs[newScore] || 0) - (costs[currentScore] || 0);
    }

    function increaseScore(ability: AbilityKey) {
        const current = character.abilityScores[ability].score;
        const max = methodLimits[scoreMethod].max;

        if (current >= max) return;

        if (scoreMethod === "Point Buy") {
            const cost = getPointBuyCost(current, current + 1);
            if (pointBuyRemaining - cost < 0) return;
            pointBuyRemaining -= cost;
        }

        character.abilityScores[ability].score = current + 1;
    }

    function decreaseScore(ability: AbilityKey) {
        const current = character.abilityScores[ability].score;
        const min = methodLimits[scoreMethod].min;

        if (current <= min) return;

        if (scoreMethod === "Point Buy") {
            const cost = getPointBuyCost(current - 1, current);
            pointBuyRemaining += cost;
        }

        character.abilityScores[ability].score = current - 1;
    }

    function assignRolledScore(ability: AbilityKey, scoreId: string) {
        // Re-enable previous score
        const prevId = abilityToRolledId[ability];
        if (prevId) {
            const prevScore = rolledScores.find(s => s.id === prevId);
            if (prevScore) prevScore.used = false;
        }

        // Mark new score as used
        const newScore = rolledScores.find(s => s.id === scoreId);
        if (newScore) {
            newScore.used = true;
            character.abilityScores[ability].score = newScore.value;
            abilityToRolledId[ability] = scoreId;
        }
    }

    function getAvailableRolledScores(ability: AbilityKey) {
        return rolledScores.map(score => ({
            value: score.id,
            name: `${score.value}`,
            disabled: score.used && abilityToRolledId[ability] !== score.id
        }));
    }

    let isValid = $derived.by(() => {
        return ABILITY_SCORES.every(ability => {
            const score = character.abilityScores[ability].score;
            return score >= methodLimits[scoreMethod].min && score <= methodLimits[scoreMethod].max;
        });
    });

    let hasRaceModifiers = $derived.by(() => {
        return ABILITY_SCORES.some(ab => computedAbilities[ab].race > 0 || computedAbilities[ab].subrace > 0);
    });

    let hasAsiModifiers = $derived.by(() => {
        return ABILITY_SCORES.some(ab => computedAbilities[ab].asi > 0);
    });
</script>

<div class="space-y-6 w-full">
    <!-- Header -->
    <Card size="xl" class="p-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 border-purple-200 dark:border-purple-900">
        <div class="space-y-2">
            <h1 class="text-4xl font-bold text-purple-600 dark:text-purple-300">Ability Scores</h1>
            <p class="text-gray-600 dark:text-gray-300">
                Define your character's natural abilities
            </p>
        </div>
    </Card>

    <!-- Method Selection -->
    <Card size="xl" class="p-8">
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl text-purple-600 dark:text-purple-300 font-bold">Score Generation Method</h2>
            <Select
                    bind:value={scoreMethod}
                    items={methodOptions}
                    onchange={initializeScores}
                    class="max-w-48"
            />
        </div>

        <div class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            {#if scoreMethod === "Manual"}
                <p class="text-sm text-purple-900 dark:text-purple-100">
                    Manually adjust your ability scores. Scores must be between 3 and 20.
                </p>
            {:else if scoreMethod === "Point Buy"}
                <p class="text-sm text-purple-900 dark:text-purple-100">
                    You have 27 points to distribute. Scores start at 8 and can go up to 15. Cost increases for higher scores.
                </p>
            {:else if scoreMethod === "3D6"}
                <p class="text-sm text-purple-900 dark:text-purple-100">
                    Roll 3d6 for each ability. Assign the six rolls to your abilities.
                </p>
            {:else}
                <p class="text-sm text-purple-900 dark:text-purple-100">
                    Roll 4d6 and drop the lowest die for each ability. Assign the six rolls to your abilities.
                </p>
            {/if}
        </div>
    </Card>

    <!-- Scores Table -->
    <Card size="xl" class="p-8 overflow-x-auto">
        <Table>
            <TableHead>
                <TableHeadCell class="min-w-32">Ability</TableHeadCell>
                <TableHeadCell class="text-center">Base Score</TableHeadCell>
                {#if hasRaceModifiers}
                    <TableHeadCell class="text-center">Race Bonus</TableHeadCell>
                {/if}
                {#if hasAsiModifiers}
                    <TableHeadCell class="text-center">ASI/Feat</TableHeadCell>
                {/if}
                <TableHeadCell class="text-center">Total Score</TableHeadCell>
                <TableHeadCell class="text-center">Modifier</TableHeadCell>
            </TableHead>
            <TableBody>
                {#each ABILITY_SCORES as ability}
                    <TableBodyRow>
                        <!-- Ability Name -->
                        <TableBodyCell>
                            <span class="font-semibold text-lg dark:text-white capitalize">
                                {ability}
                            </span>
                        </TableBodyCell>

                        <!-- Base Score Input -->
                        <TableBodyCell class="text-center">
                            <div class="flex items-center justify-center gap-2">
                                {#if scoreMethod === "Manual" || scoreMethod === "Point Buy"}
                                    <button
                                            onclick={() => decreaseScore(ability)}
                                            disabled={character.abilityScores[ability].score <= methodLimits[scoreMethod].min}
                                            class="p-2 rounded-l-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                            title="Decrease"
                                    >
                                        −
                                    </button>
                                    <Input
                                            type="number"
                                            value={character.abilityScores[ability].score}
                                            readonly
                                            class="cell-input text-center font-bold text-lg max-w-16 rounded-none"
                                    />
                                    <button
                                            onclick={() => increaseScore(ability)}
                                            disabled={character.abilityScores[ability].score >= methodLimits[scoreMethod].max}
                                            class="p-2 rounded-r-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                            title="Increase"
                                    >
                                        +
                                    </button>
                                {:else}
                                    <Select
                                            items={getAvailableRolledScores(ability)}
                                            onchange={(e) => assignRolledScore(ability, e.currentTarget.value)}
                                            placeholder="Choose score"
                                            value={abilityToRolledId[ability] ?? ""}
                                            class="max-w-32"
                                    />
                                {/if}
                            </div>
                        </TableBodyCell>

                        <!-- Race Bonus -->
                        {#if hasRaceModifiers}
                            <TableBodyCell class="text-center">
                                <div class="flex flex-col gap-1">
                                    {#if computedAbilities[ability].race > 0}
                                        <Badge color="green">
                                            +{computedAbilities[ability].race}
                                        </Badge>
                                    {/if}
                                    {#if computedAbilities[ability].subrace > 0}
                                        <Badge color="blue">
                                            +{computedAbilities[ability].subrace}
                                        </Badge>
                                    {/if}
                                    {#if computedAbilities[ability].race === 0 && computedAbilities[ability].subrace === 0}
                                        <Badge color="gray">—</Badge>
                                    {/if}
                                </div>
                            </TableBodyCell>
                        {/if}

                        <!-- ASI/Feat Bonus -->
                        {#if hasAsiModifiers}
                            <TableBodyCell class="text-center">
                                {#if computedAbilities[ability].asi > 0}
                                    <Badge color="yellow">
                                        +{computedAbilities[ability].asi}
                                    </Badge>
                                {:else}
                                    <Badge color="gray">—</Badge>
                                {/if}
                            </TableBodyCell>
                        {/if}

                        <!-- Total Score -->
                        <TableBodyCell class="text-center">
                            <span class="font-bold text-lg text-purple-600 dark:text-purple-400">
                                {computedAbilities[ability].total}
                            </span>
                        </TableBodyCell>

                        <!-- Modifier -->
                        <TableBodyCell class="text-center">
                            <Badge color="purple">
                                {computedAbilities[ability].modifier > 0 ? "+" : ""}{computedAbilities[ability].modifier}
                            </Badge>
                        </TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </Card>

    <!-- Point Buy Display -->
    {#if scoreMethod === "Point Buy"}
        <Card size="xl" class="p-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <div class="flex items-center justify-between">
                <span class="text-lg font-semibold dark:text-white">Points Remaining</span>
                <div class="flex items-center gap-4">
                    <span class="text-4xl font-bold text-blue-600 dark:text-blue-400">{pointBuyRemaining}</span>
                    <span class="text-gray-600 dark:text-gray-400">/ 27</span>
                </div>
            </div>
            <div class="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                        class="bg-blue-600 h-2 rounded-full transition-all"
                        style="width: {(pointBuyRemaining / 27) * 100}%"
                />
            </div>
        </Card>
    {/if}

    <!-- Rolled Scores Display -->
    {#if (scoreMethod === "3D6" || scoreMethod === "4D6 Drop Lowest") && rolledScores.length > 0}
        <Card size="xl" class="p-8">
            <h3 class="text-xl font-bold dark:text-white mb-4">Available Rolled Scores</h3>
            <div class="grid grid-cols-3 md:grid-cols-6 gap-3">
                {#each rolledScores as score}
                    <div
                            class={`p-4 rounded-lg text-center font-bold text-2xl transition-all ${
                            score.used
                                ? "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-2 border-purple-400 dark:border-purple-600"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                    >
                        {score.value}
                    </div>
                {/each}
            </div>
        </Card>
    {/if}

    <!-- Status -->
    <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span class="text-sm dark:text-white">Status:</span>
                {#if isValid}
                    <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-sm font-medium">
                        <span class="h-2 w-2 rounded-full bg-green-500" />
                        Ability scores assigned
                    </span>
                {:else}
                    <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 text-sm font-medium">
                        <span class="h-2 w-2 rounded-full bg-yellow-500" />
                        Assign all scores
                    </span>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    :global(.ability-score-selector button:hover:not(:disabled)) {
        transform: translateY(-2px);
    }
</style>
