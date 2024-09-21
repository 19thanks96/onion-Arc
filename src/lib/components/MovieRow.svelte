<script lang="ts">
    import type {DotLottie as DotLottieType} from '@lottiefiles/dotlottie-svelte';
    import {DotLottieSvelte} from '@lottiefiles/dotlottie-svelte';
    import {goto} from "$app/navigation";

    export let index: number
    export let movie


    const humanReadableDate = (data) => new Date(data).toLocaleString();

    let indexRow: number | undefined;
    const onMouseEnterRow = (index: number) => {
        indexRow = index;
    };

    const onMouseLeaveRow = () => {
        indexRow = undefined;
    };


    const deleteMovie = async (index: number) => {
        const movies = await fetch('/api/movies', {method: 'DELETE', body: JSON.stringify({id: movie.id})})
        const res = await movies.json()
    };

    function daysBetweenDates(dateString) {
        const today = new Date();
        const givenDate = new Date(dateString);

        const diffTime = Math.abs(today - givenDate);

        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        return `${diffDays}d ${diffHours}h ago`;
    }

</script>


<tr id={'Cell-MovieID-'+ movie.id} class="cursor-pointer" on:click={()=>goto(movie.id)}
    on:mouseenter={()=>{onMouseEnterRow(index)}}
    on:mouseleave={onMouseLeaveRow}>
    <td data-type="id" class="py-4 pl-6">{movie.id}</td>
    <td data-type="title" class="py-4 pl-6">
        <div class={movie.isAvailable ? 'available' : 'not-available'}>{movie.title}</div>
    </td>
    <td data-type="description" class="py-4 pl-6">
        {#if movie.description}
            {movie.description}
        {/if}
    </td>
    <td data-type="genre" class="py-4 pl-6">
        {#if movie.genre}
            {movie.genre}
        {:else}
            -
        {/if}
    </td>
    <td data-type="rating" class="py-4 pl-6 flex">
        {#each Array(10).fill(0) as _, index}
            {#if index < movie.rating}
                <span class='gold-star-{index} w-[40px] h-[40px] flex' style="font-size:200%;color:yellow;">
<!--                    &starf;-->
                    <lord-icon class="w-[40px] h-[40px] inline-block hover:text-black"
                               src="https://media.lordicon.com/icons/wired/flat/237-star-rating.json"
                               trigger="loop-on-hover">
                    </lord-icon>
                </span>
            {:else}
                <span class='empty-star-{index} w-[40px] h-[40px] flex' style="font-size:200%;color:black;">
<!--                    &star;-->
                    <lord-icon class="w-[40px] h-[40px] inline-block  animated-gradient  current-color"
                               src="/lottie/star-rating-hover-wink.json"
                               trigger="loop-on-hover">
                    </lord-icon>
                </span>
            {/if}
        {/each}
    </td>
    <td data-type="year" class="py-4 pl-6">
        {#if movie?.year}
            {humanReadableDate(movie.year)}
        {:else}
            -
        {/if}
    </td>
    <td data-type="created" class="py-4 pl-6">{daysBetweenDates(movie.createdAt)} </td>
    <td class=" flex justify-center transition-opacity duration-300 {(indexRow || indexRow === 0) && index === indexRow ? 'opacity-1':'opacity-0'}">
        <button class="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 font-medium leading-none text-magnum-700 shadow hover:opacity-75 {'button-MovieID-'+movie.id} hover:text-magnum-700"
                on:click={() => {
                            deleteMovie(movie.id);
                            window.location.reload()
                            }}
        >

            <lord-icon class="w-[30px] h-[30px] inline-block mr-[10px] current-color text-black hover:text-magnum-700"
                       src="https://media.lordicon.com/icons/wired/gradient/1432-erase.json"
                       trigger="loop">
            </lord-icon>

            Delete
        </button>
    </td>
</tr>


<style lang="css">
    @keyframes pulseGreenBtn {
        0% {
            box-shadow: 0 0 0 0 rgba(85, 255, 0, 1);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(85, 255, 0, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(85, 255, 0, 0);
        }
    }

    @keyframes pulseRedBtn {
        0% {
            box-shadow: 0 0 0 0 rgb(227, 66, 52, 0.9);
        }

        70% {
            box-shadow: 0 0 0 5px rgb(227, 66, 52, 0);
        }

        100% {
            box-shadow: 0 0 0 0 rgb(227, 66, 52, 0);
        }
    }

    .animated-gradient{
        color:black;
    }

    .animated-gradient:hover {
        font-size: 2em;
        font-weight: bold;
        color: #cb5eee; /* Initial solid color */
        background: linear-gradient(45deg, #cb5eee, #4be1ec);
        background-clip: text;
        -webkit-background-clip: text;

        animation: textColorToGradient 5s ease infinite;
    }

    @keyframes textColorToGradient {
        0% {
            background: none; /* Start with no background */
            color: #cb5eee; /* Solid initial color */
        }
        100% {

            -webkit-background-clip: text; /* Clipping the background to the text */
            color: #4be1ec; /* Transition to transparent to reveal the gradient */
        }
    }

    .available:before {
        content: '';
        background: red;
        border-radius: 50%;
        display: inline-block;
        width: 7px;
        height: 7px;
        margin: 0 5px 2px 0;
        /*animation: pulseRedBtn 5s ease infinite;*/
    }

    .not-available:before {
        content: '';
        background: green;
        border-radius: 50%;
        display: inline-block;
        width: 7px;
        height: 7px;
        margin: 0 5px 2px 0;
        animation: pulseGreenBtn 1s ease infinite;
    }
</style>