<script lang="ts">
    import type {MovieDto} from "$lib/common/cdtos/Movie.dto";
    import { onMount, onDestroy } from 'svelte';
    import {enhance} from '$app/forms';
    import FormPostMovie from "$lib/components/FormPostMovie.svelte";
    export let data

    let id:string;

    let title: string[] = data.movies.data.map((movie: MovieDto) => movie.title);
    let description: string[] = data.movies.data.map((movie: MovieDto) => movie.description);
    const getMovies = async () => {
        const movies = await fetch('/api/movies')
        const allMovies: MovieDto = await movies.json()
        data.movies = allMovies
    }
    const postMovies = async (params) => {
        console.log(params)
        const movies = await fetch('/api/movies', {method: 'POST', body: JSON.stringify(params)})
        const data = await movies.json()
        await getMovies()
    }
    const putMovie = async (params) => {
        console.log(description)
        const movies = await fetch('/api/movies', {method: 'PUT', body: JSON.stringify(params)})
        const data = await movies.json()
        await getMovies()
    }

    const redactorMovie = (index: number, redactor: boolean | undefined) => {
        id = data.movies.data[index].id
        data.movies.data[index].redactor = !redactor
    }
    const titles = ['Id', 'Tile', 'Description']
    const deleteMovie = async (index: number) => {
        const movies = await fetch('/api/movies', {method: 'DELETE', body: JSON.stringify({id:index})})
        const res = await movies.json()
        console.log(res)
        await getMovies()
    };
    let isOpenForm : boolean = false;

    const getFunc = async () => {
        const resp = await fetch('https://api.themoviedb.org/3/movie/157336/videos?api_key=c529946f1d70c1251b016cde1ae7bbdb')
        const res = await resp.json()
        console.log(res)
        const firstMovie = res.results[0].name.replace(/\s/g, '+')

        const movie = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(firstMovie)}&key=${apiKey}&type=video&maxResults=1`)
        const movieData = await movie.json();
        console.log(movie, movieData);
    }

    function closePopoverOnClickOutside(event) {
        if (isOpenForm && !event.target.closest('.popover-container') && !event.target.closest('button:not(.popover-container)')) {
            isOpenForm = false;
        }
    }

    // Добавляем обработчик события при монтировании компонента


    onMount(() => {
        document.addEventListener('click', closePopoverOnClickOutside);
    });

    onDestroy(() => {
        document.removeEventListener('click', closePopoverOnClickOutside);
    });
</script>
<table style='border-collapse: collapse; width: 100%'>
    <thead>
    <tr>
        {#each titles as title}
            <td>
                {title}
            </td>
        {/each}
    </tr>
    </thead>
    <tbody>
    {#each data.movies.data as movie, index}
        {@const id = data.movies.data[index].id}
        {#if !movie.redactor}

            <tr on:click={()=>redactorMovie(index, movie.redactor)}>
                <td>{movie.id}</td>
                <td>{movie.title}</td>
                <td>{movie.description}</td>
            </tr>
        {:else}
            <tr >
                <td>{movie.id}</td>
                <input bind:value={title[index]} type='text' placeholder={movie.title}/>
                <input bind:value={description[index]} type='text' placeholder={movie.description}/>
                <button on:click={() => {putMovie({id: id,title: title[index], description : description[index]})}}>change</button>
                <button on:click={()=>redactorMovie(index, movie.redactor)}>close redactor</button>
                <button on:click={() => {deleteMovie(movie.id, movie.redactor)}}>delete</button>

            </tr>
        {/if}
    {/each}
    </tbody>
</table>

<div class="container">
    <div>
        <button  on:click={() => {isOpenForm = !isOpenForm}}>add</button>
    </div>

</div>

<FormPostMovie {isOpenForm}/>

<style lang="css">
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 5rem;
    }

    .form-container {
        position: relative;
        width: 750px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    .form-group input,
    .form-group textarea {
        width: calc(100% - 20px);
        padding: 8px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 3px;
    }

    button:not(.popover-container) {
        padding: 10px 15px;
        font-size: 1rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>