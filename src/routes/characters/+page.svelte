<script lang="ts">
    import { Card, Badge, Blockquote, Hr, Button } from 'flowbite-svelte';
    import {goto} from "$app/navigation";
    import type {CharacterWrapper} from "$lib/types/localStore";
    import {PersistedState} from "runed";

    // In real code you'd pass this as props
    const characters = new PersistedState<Set<CharacterWrapper>>("Characters", new Set<CharacterWrapper>());

    function openCharacter(characterId: string) {
        goto(`/characters/${characterId}`);
    }
</script>

<div class="flex flex-row justify-center items-center flex-wrap mt-10 gap-16">
    {#each characters.current as characterWrap}
        <Card
                size="sm"
                class="cursor-pointer dark:text-white p-4 transition hover:shadow-lg hover:-translate-y-0.5 relative min-h-60"
                onclick={() => {openCharacter(characterWrap.character.id)}}
        >
            <div class="flex items-start justify-between gap-2">
                <div>
                    <h2 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {characterWrap.character.name}
                    </h2>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        Level {characterWrap.character.level} · {characterWrap.character.alignment}
                    </p>
                </div>
            </div>

            <div class="absolute right-3 top-3 flex flex-col gap-1">
                <Badge color="amber" class="shrink-0 mt-1">
                    {characterWrap.character.race}
                </Badge>
                <Badge color="purple" class="shrink-0 mt-1">
                    {characterWrap.character.class}
                </Badge>
                <Badge color="blue" class="shrink-0 mt-1">
                    {characterWrap.character.subclass}
                </Badge>
            </div>

            <Hr class="mt-12" />
            <Blockquote class="text-sm italic text-gray-600 dark:text-gray-300 mb-4">
                {characterWrap.caption}
            </Blockquote>
        </Card>
    {:else}
        <div class="flex flex-col items-center justify-center gap-10 mt-30">
            <p class="dark:text-white">No characters yet?</p>
            <Button color="sky" href="/create">Create one now!</Button>
        </div>
    {/each}
</div>