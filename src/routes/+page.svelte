<script lang="ts">
    import FormPostMovie from "$lib/components/FormPostMovie.svelte";
    import MovieRow from "$lib/components/MovieRow.svelte";
    import {createPagination, melt} from "@melt-ui/svelte";
    import {ChevronLeft, ChevronRight} from "lucide-svelte";

    export let data
    console.log(data)
    const titles = ['Id', 'Title', 'Description','Genre', 'Rating','Year', "Created", '']
    const filtrationTitles = titles.slice(0, -1);
    let currentFilterState = 'Id'
    let sortOrder  = 0

    const getMovies = async () => {
        const response = await fetch(`api/movies?start=${$range.start}&end=${$range.end}&filters=${currentFilterState}&sortOrder=${sortOrder}`, {method: 'GET'})
        const resultResponse = await response.json()
        data.movies = resultResponse.data
    }


    const {
        elements: { root, pageTrigger, prevButton, nextButton },
        states: { pages, range },
    } = createPagination({
        count: data.movies.count,
        perPage: 5,
        defaultPage: 1,
    });




    range.subscribe(
        async () => {
            await getMovies()
        }
    )

    const changeCurrentFilterState = ( index:number) => {
        if(filtrationTitles.includes(titles[index])) {
            if(currentFilterState === filtrationTitles[index]) {
                if(sortOrder === 0){
                    sortOrder  = 1
                } else {
                    sortOrder = 0
                }
            } else {
                sortOrder  = 0
            }
            currentFilterState = filtrationTitles[index]
             getMovies()
        }
    }



    const onHover = titles.map(() => false)
</script>
<nav
        class="flex flex-col items-center"
        aria-label="pagination"
        use:melt={$root}
>

<div class="m-[50px] w-fill-available rounded-[16px] bg-[rgb(34,37,39)] caption-bottom text-sm h-fit gap-2 p-8">
    <div class="flex justify-end items-end flex-row gap-8 h-[56px] my-2">
        <h1 class="flex flex-row  flex-nowrap justify-center items-center font-[600] w-52 pl-4 h-full text-2xl text-magnum-700">
            Movies
            Table</h1>
        <FormPostMovie />
    </div>
    <div class=" rounded-[16px] bg-[rgb(47,51,53)] caption-bottom text-sm h-fit gap-2 m-4 border-[rgb(140,130,115)] border mb-2">
        <table class=" w-fill-available rounded-[16px] bg-[rgb(47,51,53)] caption-bottom text-sm h-fit gap-2 m-4 ">
            <thead>
            <tr>
                {#each titles as _, index}

                    <td class="py-4 pl-6 text-magnum-700 font-[600]" on:click={() => {changeCurrentFilterState(index)}}
                    on:mouseenter={() => onHover[index] = true} on:mouseleave={() => onHover[index] = false}>
                        <div class="flex justify-center items-center flex-row gap-2 w-max">

                            <div class="m-auto h-[20px] filter-{titles[index]}">{titles[index]}</div>
                            {#if filtrationTitles.includes(titles[index])}
                                {#if currentFilterState === titles[index]}
                                    <lord-icon class="w-[20px] h-[20px] inline-block  animated-gradient  current-color {sortOrder === 0 ? '' : 'rotate-180'} "
                                               src="/lottie/arrow.json"
                                               trigger="loop">
                                    </lord-icon>
                                {:else}
                                    {#if onHover[index]}
                                        <lord-icon class="w-[20px] h-[20px] inline-block  animated-gradient  current-color text-magnum-700"
                                                   src="/lottie/2arrows.json"
                                                   state={onHover[index]}
                                                   trigger="in">
                                        </lord-icon>
                                    {:else}
                                        <lord-icon class="w-[20px] h-[20px] inline-block  animated-gradient  current-color text-magnum-700"
                                                   src="/lottie/2arrows.json"
                                                   trigger="hover">
                                        </lord-icon>
                                    {/if}
                                {/if}
                            {/if}
                        </div>
                    </td>
                {/each}
            </tr>
            </thead>
            <tbody>
            <tr >
                <td colspan={8}>
                    <hr class="w-fill-available border-[rgb(140,130,115)] mt-2 mb-4">
                </td>
            </tr>
            {#each data.movies.data as movie, index}
                <MovieRow {movie} {index} />
            {/each}
            </tbody>
        </table>
    </div>
</div>
    <div class="flex items-center gap-2">
        <button
                class="grid h-8 items-center rounded-md bg-[rgb(0,0,0,0.75)]  px-3 text-sm text-magnum-900 shadow-sm
      hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 data-[selected]:bg-magnum-900
      data-[selected]:text-white"
                use:melt={$prevButton}><ChevronLeft class="size-4" /></button
        >
        {#each $pages as page (page.key)}
            {#if page.type === 'ellipsis'}
                <span>...</span>
            {:else}
                <button
                        class="grid h-8 items-center rounded-md bg-[rgb(0,0,0,0.75)] px-3 text-sm text-magnum-900 shadow-sm
          hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 data-[selected]:bg-magnum-900
        data-[selected]:text-white"
                        use:melt={$pageTrigger(page)}>{page.value}</button
                >
            {/if}
        {/each}
        <button
                class="grid h-8 items-center rounded-md bg-[rgb(0,0,0,0.75)]  px-3 text-sm text-magnum-900 shadow-sm
      hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 data-[selected]:bg-magnum-900
    data-[selected]:text-white"
                use:melt={$nextButton}><ChevronRight class="size-4" /></button
        >
    </div>
</nav>


