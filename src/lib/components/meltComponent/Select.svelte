<script lang="ts">
    import {Check, ChevronDown} from "lucide-svelte";
    import { createSelect, melt } from '@melt-ui/svelte';
    import { fade } from 'svelte/transition';
    import {Genre} from "$lib/enum";
    import {CreateUpdateMovieModalState} from "$lib/state/modals/CreateUpdateMovieModal.state";

    export let options: Genre
    export let value:  typeof Genre | undefined

    const {
        elements: { trigger, menu, option, group, groupLabel, label },
        states: { selectedLabel, open, selected  },
        helpers: { isSelected },
    } = createSelect<string>({
        forceVisible: true,
        positioning: {
            placement: 'bottom',
            fitViewport: true,
            sameWidth: true,
        },
    });

    selected.set({ value: $CreateUpdateMovieModalState.genre, label: Genre[$CreateUpdateMovieModalState.genre] })
    $:value = $selected?.value
</script>

<div class="flex flex-col gap-1">
    <button
            class="flex h-10 min-w-[220px] items-center justify-between rounded-lg bg-white px-3 py-2
  text-magnum-700 shadow transition-opacity hover:opacity-90"
            use:melt={$trigger}
            aria-label="Food"
    >
        {$selectedLabel || 'Select a genre'}
        <ChevronDown class="size-5" />
    </button>
    {#if $open}
        <div
                class=" z-[100] flex max-h-[300px] flex-col
    overflow-y-auto rounded-lg bg-white p-1
    shadow focus:!ring-0"
                use:melt={$menu}
                transition:fade={{ duration: 150 }}
        >
            {#each Object.entries(options) as [key, arr]}
                <div use:melt={$group(key)}>
                        <div
                                class="relative cursor-pointer rounded-lg py-1 pl-8 pr-4 text-neutral-800
              hover:bg-magnum-100 focus:z-10
              focus:text-magnum-700
              data-[highlighted]:bg-magnum-200 data-[highlighted]:text-magnum-900
              data-[disabled]:opacity-50"
                                use:melt={$option({ value: key, label: arr })}
                        >
                            <div class="check {$isSelected(key) ? 'block' : 'hidden'}">
                                <Check class="size-4" />
                            </div>

                            {arr}
                        </div>

                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="postcss">
    .check {
        position: absolute;
        left: theme(spacing.2);
        top: 50%;
        z-index: theme(zIndex.20);
        translate: 0 calc(-50% + 1px);
        color: theme(colors.magnum.500);
    }
</style>