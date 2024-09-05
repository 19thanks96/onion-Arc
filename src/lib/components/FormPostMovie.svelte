<script lang="ts">
    import {enhance} from '$app/forms';
    export let isOpenForm = false
    let newTitle:string;
    let newDescription:string;
    const postMovies = async (params) => {
        console.log(params)
        const movies = await fetch('/api/movies', {method: 'POST', body: JSON.stringify(params)})
        const data = await movies.json()
    }
</script>

<button class="popover-container" tabindex="0"  style="position: fixed; width: 100%; height: 100%; background: rgb(0, 0, 0, 0.8); align-items: center; justify-content: center; top: 0; left: 0; right: 0; bottom: 0;{isOpenForm ? 'display: flex;' : 'display: none;'}">
    <div>
        <div  class="form-container">
            <button on:click={() => {isOpenForm = !isOpenForm}} style="position: absolute;top: 5%;right: 5%;">close </button>
            <h2>Add a New Movie</h2>
            <!--            <form on:submit|preventDefault={() => postMovies({ title: newTitle, description: newDescription })}>-->
            <form use:enhance={() => {}} action="?/postMovie" method="POST">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input bind:value={newTitle} type='text' name="title" placeholder='title' required/>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea bind:value={newDescription} name="description" placeholder='description' required/>
                </div>
                <button type="submit">Add Movie</button>
            </form>
        </div>
    </div>
</button>

<style lang="css">

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