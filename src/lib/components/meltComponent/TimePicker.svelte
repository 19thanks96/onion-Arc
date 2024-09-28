<script lang="ts">
    import {createDatePicker, melt} from '@melt-ui/svelte';
    import {fade} from 'svelte/transition';
    import {CalendarDate} from '@internationalized/date';
    import {Calendar, ChevronLeft, ChevronRight} from "lucide-svelte";
    import {CreateUpdateMovieModalState} from "$lib/state/modals/CreateUpdateMovieModal.state";

    export let currentData: string[]
    export let withLabel: boolean = true;
    let date = new Date($CreateUpdateMovieModalState.year);
    const {
        elements: {
            calendar,
            cell,
            content,
            field,
            grid,
            heading,
            label,
            nextButton,
            prevButton,
            segment,
            trigger,
        },
        states: {months, headingValue, weekdays, segmentContents, open},
        helpers: {isDateDisabled, isDateUnavailable},
        options: {locale},
    } = createDatePicker({
        forceVisible: true,
        defaultValue: $CreateUpdateMovieModalState.year ? new CalendarDate(new Date($CreateUpdateMovieModalState.year).getFullYear(), new Date($CreateUpdateMovieModalState.year).getUTCMonth() +1 , new Date($CreateUpdateMovieModalState.year).getUTCDate()+1 ) : new CalendarDate(2024, 1, 11),
    });

    $: currentData = $segmentContents
        .filter((e) => e.part !== 'literal')
        .map((e) => e.value);
</script>


<div class="mb-4 flex items-center gap-5">
    {#if withLabel}
        <label use:melt={$label} class="w-[90px] text-right text-black" for="Date">
            Release Date
        </label>
    {/if}
    <div use:melt={$field}>
        {#key $locale}
            {#each $segmentContents as seg}
                <div use:melt={$segment(seg.part)}>
                    {seg.value}
                </div>
            {/each}
        {/key}
        <div>
            <button type="button" use:melt={$trigger}>
                <Calendar size={16}/>
            </button>
        </div>
    </div>
</div>
{#if $open}
    <div
            transition:fade={{ duration: 100 }}
            use:melt={$content}
    >
        <div use:melt={$calendar}>
            <header>
                <button use:melt={$prevButton}>
                    <ChevronLeft size={24}/>
                </button>
                <div use:melt={$heading}>
                    {$headingValue}
                </div>
                <button use:melt={$nextButton}>
                    <ChevronRight size={24}/>
                </button>
            </header>
            <div>
                {#each $months as month}
                    <table use:melt={$grid}>
                        <thead aria-hidden="true">
                        <tr>
                            {#each $weekdays as day}
                                <th>
                                    <div>
                                        {day}
                                    </div>
                                </th>
                            {/each}
                        </tr>
                        </thead>
                        <tbody>
                        {#each month.weeks as weekDates}
                            <tr>
                                {#each weekDates as date}
                                    <td
                                            role="gridcell"
                                            aria-disabled={$isDateDisabled(date) ||
                          $isDateUnavailable(date)}
                                    >
                                        <div use:melt={$cell(date, month.value)}>
                                            {date.day}
                                        </div>
                                    </td>
                                {/each}
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                {/each}
            </div>
        </div>
    </div>
{/if}


<style lang="postcss">
    section {
        @apply flex w-full flex-col items-center gap-3;
    }

    [data-melt-datefield-field] div:last-of-type {
        @apply ml-4 flex w-full items-center justify-end;
    }

    [data-melt-popover-content] {
        @apply z-10 min-w-[320px] rounded-lg bg-[rgb(47,51,53)] shadow-sm;
    }

    [data-melt-popover-trigger] {
        @apply rounded-md bg-magnum-700 p-1 text-white transition-all hover:bg-magnum-700/90;
    }

    [data-melt-datefield-label] {
        @apply select-none font-medium text-magnum-800;
    }

    [data-melt-datefield-label][data-invalid] {
        @apply text-red-500;
    }

    [data-melt-datefield-field] {
        @apply mt-0.5 flex w-[75%] min-w-[160px] items-center rounded-lg border border-magnum-400/60 bg-[rgb(47,51,53)] p-1.5 text-magnum-800 shadow-md;
    }

    [data-melt-datefield-field][data-invalid] {
        @apply border-red-400;
    }

    [data-melt-datefield-segment][data-invalid] {
        @apply text-red-500;
    }

    [data-melt-datefield-segment]:not([data-segment='literal']) {
        @apply px-0.5;
    }

    [data-melt-datefield-validation] {
        @apply self-start text-red-500;
    }

    [data-melt-calendar] {
        @apply w-full rounded-lg bg-[rgb(47,51,53)] p-3 text-magnum-700 shadow-sm;
    }

    header {
        @apply flex items-center justify-between pb-2;
    }

    header + div {
        @apply flex items-center gap-6;
    }

    [data-melt-calendar-prevbutton] {
        @apply rounded-lg p-1 transition-all hover:bg-magnum-500/20;
    }

    [data-melt-calendar-nextbutton] {
        @apply rounded-lg p-1 transition-all hover:bg-magnum-500/20;
    }

    [data-melt-calendar-prevbutton][data-disabled] {
        @apply pointer-events-none rounded-lg p-1 opacity-40;
    }

    [data-melt-calendar-nextbutton][data-disabled] {
        @apply pointer-events-none rounded-lg p-1 opacity-40;
    }

    [data-melt-calendar-heading] {
        @apply font-semibold;
    }

    th {
        @apply text-sm font-semibold;

        & div {
            @apply flex h-6 w-6 items-center justify-center p-4;
        }
    }

    [data-melt-calendar-grid] {
        @apply w-full;
    }

    [data-melt-calendar-cell] {
        @apply flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-lg p-4 hover:bg-magnum-500/20  focus:ring focus:ring-magnum-400;
    }

    [data-melt-calendar-cell][data-disabled] {
        @apply pointer-events-none opacity-40;
    }

    [data-melt-calendar-cell][data-unavailable] {
        @apply pointer-events-none text-red-400 line-through;
    }

    [data-melt-calendar-cell][data-selected] {
        @apply bg-magnum-300 text-magnum-700;
    }

    [data-melt-calendar-cell][data-outside-visible-months] {
        @apply pointer-events-none cursor-default opacity-40 hover:bg-transparent;
    }

    [data-melt-calendar-cell][data-outside-month] {
        @apply pointer-events-none cursor-default opacity-0 hover:bg-transparent;
    }
</style>