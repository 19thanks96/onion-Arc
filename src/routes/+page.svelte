<script lang="ts">
    import FormPostMovie from "$lib/components/FormPostMovie.svelte";
    import MovieRow from "$lib/components/MovieRow.svelte";
    import {createPagination, melt} from "@melt-ui/svelte";
    import {ChevronLeft, ChevronRight} from "lucide-svelte";

    export let data
    // $:console.log(data)
    const titles = ['Id', 'Tile', 'Description','Genre', 'Rating','Year', "Created", '']
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
            console.log("response")
            const response = await fetch(`api/movies?start=${$range.start}&end=${$range.end}`, {method: 'GET'})
            const resultResponse = await response.json()
            data.movies = resultResponse.data
        }
    )

</script>
<nav
        class="flex flex-col items-center gap-4"
        aria-label="pagination"
        use:melt={$root}
>

<div class="m-[50px] w-fill-available rounded-[16px] bg-blue-100 caption-bottom text-sm h-fit gap-2 p-8">
    <div class="flex justify-end items-end flex-row gap-8 h-11 my-2">
        <h1 class="flex flex-row  flex-nowrap justify-center items-center font-[600] w-52 pl-4 h-full text-2xl text-magnum-700">
            Movies
            Table</h1>
        <FormPostMovie {data}/>
    </div>
    <div class=" rounded-[16px] bg-gray-300 caption-bottom text-sm h-fit gap-2 m-4 border-black border mb-2">
        <table class=" w-fill-available rounded-[16px] bg-gray-300 caption-bottom text-sm h-fit gap-2 m-4 ">
            <thead>
            <tr>
                {#each titles as title}
                    <td class="py-4 pl-6 text-magnum-700 font-[600]">
                        {title}
                    </td>
                {/each}
            </tr>
            </thead>
            <tbody>
            <tr>
                <td colspan={8}>
                    <hr class="w-fill-available border-black ">
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
                class="grid h-8 items-center rounded-md bg-white px-3 text-sm text-magnum-900 shadow-sm
      hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 data-[selected]:bg-magnum-900
      data-[selected]:text-white"
                use:melt={$prevButton}><ChevronLeft class="size-4" /></button
        >
        {#each $pages as page (page.key)}
            {#if page.type === 'ellipsis'}
                <span>...</span>
            {:else}
                <button
                        class="grid h-8 items-center rounded-md bg-white px-3 text-sm text-magnum-900 shadow-sm
          hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 data-[selected]:bg-magnum-900
        data-[selected]:text-white"
                        use:melt={$pageTrigger(page)}>{page.value}</button
                >
            {/if}
        {/each}
        <button
                class="grid h-8 items-center rounded-md bg-white px-3 text-sm text-magnum-900 shadow-sm
      hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 data-[selected]:bg-magnum-900
    data-[selected]:text-white"
                use:melt={$nextButton}><ChevronRight class="size-4" /></button
        >
    </div>
</nav>


