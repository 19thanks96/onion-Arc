<script lang="ts">


import FormPutMovie from "$lib/components/FormPutMovie.svelte";
export let data
$:isOpenForm = false;
console.log(data)
</script>
{#if !!data?.movie?.data?.id}
<h1 >{data.movie.data.id}:{data.movie.data.title}-{data.movie.data.description}</h1>
    <button on:click={() => {isOpenForm = !isOpenForm}}>Put</button>
    <FormPutMovie id={data.movie.data.id}
                  newTitle={data.movie.data.title}
                  newDescription={data.movie.data.description}
                  isOpenForm={isOpenForm} />
    {:else }
this movie not exist or be deleted
    {/if}
