<script lang="ts">
    import {BreadcrumbStepper, Label, Input, Button, type BreadcrumbStep} from "flowbite-svelte";
    import {Character} from "$lib/characterHandler/character.svelte";
    import BasicInfoStep from "../../components/characterCreationSteps/basicInfoStep.svelte";
    import RaceStep from "../../components/characterCreationSteps/raceStep.svelte";
    import SubraceStep from "../../components/characterCreationSteps/subraceStep.svelte";
    import ClassStep from "../../components/characterCreationSteps/classStep.svelte";
    import SubclassStep from "../../components/characterCreationSteps/subclassStep.svelte";
    import BackgroundStep from "../../components/characterCreationSteps/backgroundStep.svelte";
    import AbilityScoreStep from "../../components/characterCreationSteps/abilityScoreStep.svelte";

    type StepType = 'basic' | 'race' | 'subrace' | 'class' | 'subclass' | 'background' | 'abilities' | 'spells' | 'equipment';

    interface StepDefinition {
        id: string;
        label: string;
        stepType: StepType;
        isVisible: boolean;
    }

    let current = $state(1);
    let characterCreationState = $state.raw(new Character());

    let steps = $derived.by(() => {
        const c = characterCreationState;

        const base: StepDefinition[] = [
            {
                id: '1',
                label: 'Basic information',
                stepType: 'basic',
                isVisible: true,
            },
            {
                id: '2',
                label: 'Race',
                stepType: 'race',
                isVisible: true,
            },
            {
                id: '3',
                label: 'Subrace',
                stepType: 'subrace',
                isVisible: !!c.race && c.raceHasSubraces,
            },
            {
                id: '4',
                label: 'Class',
                stepType: 'class',
                isVisible: true,
            },
            {
                id: '5',
                label: 'Subclass',
                stepType: 'subclass',
                isVisible: !!c.class && c.subclassShouldBeChosenAtThisLevel,
            },
            {
                id: '6',
                label: 'Background',
                stepType: 'background',
                isVisible: true,
            },
            {
                id: '7',
                label: 'Ability scores',
                stepType: 'abilities',
                isVisible: true,
            },
            {
                id: '8',
                label: 'Spells',
                stepType: 'spells',
                isVisible: !!c.class && c.hasSpellcasting,
            },
            {
                id: '9',
                label: 'Equipment',
                stepType: 'equipment',
                isVisible: true,
            }
        ];

        return base.filter((s) => s.isVisible);
    });
    const stepsUI = $derived(steps.map((s,i) => ({id: String(i + 1),label: s.label})) as unknown as BreadcrumbStep[]);

    let currentStepType = $derived.by(() => steps[current - 1]?.stepType ?? null);

    let maxStepIndex = $derived.by(() => steps.length);
</script>

<div class="p-10">
    <BreadcrumbStepper
            steps={stepsUI}
            bind:current
    />

    <div class="mt-8 flex justify-center items-center gap-4">
        {#if steps[current - 1]?.stepType === 'basic'}
            <BasicInfoStep bind:character={characterCreationState} />
        {:else if steps[current - 1]?.stepType === 'race'}
            <RaceStep bind:character={characterCreationState} />
        {:else if steps[current - 1]?.stepType === 'subrace'}
            <SubraceStep bind:character={characterCreationState} />
        {:else if steps[current - 1]?.stepType === 'class'}
            <ClassStep bind:character={characterCreationState} />
        {:else if steps[current - 1]?.stepType === 'subclass'}
            <SubclassStep bind:character={characterCreationState} />
        {:else if steps[current - 1]?.stepType === 'background'}
            <BackgroundStep bind:character={characterCreationState} />
        {:else if steps[current - 1]?.stepType === 'abilities'}
            <AbilityScoreStep bind:character={characterCreationState} />
        {:else if steps[current - 1]?.stepType === 'spells'}
            <SpellsStep bind:character={characterCreationState} />
        {:else if steps[current - 1]?.stepType === 'equipment'}
            <EquipmentStep bind:character={characterCreationState} />
        {/if}
    </div>

    <div class="fixed bottom-10 right-10 flex gap-6">
        <Button
                class="min-w-30"
                color="gray"
                size="xl"
                disabled={current === 1}
                onclick={() => current--}
        >
            Back
        </Button>

        <Button
                class="min-w-30"
                color="sky"
                size="xl"
                disabled={current === maxStepIndex}
                onclick={() => {
                if (current < maxStepIndex) {
                    current++;
                    characterCreationState.debugLog();
                }
            }}
        >
            Next
        </Button>
    </div>
</div>
