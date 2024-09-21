<script lang="ts">
    import {createDialog, melt} from '@melt-ui/svelte';
    import {
        CreateUpdateMovieModalState,
        initialCreateUpdateMovieModalState
    } from "$lib/state/modals/CreateUpdateMovieModal.state";
    import {Genre} from "$lib/enum";
    import Select from "$lib/components/meltComponent/Select.svelte";
    import Switch from "$lib/components/meltComponent/Switch.svelte";
    import TimePicker from "$lib/components/meltComponent/TimePicker.svelte";
    import {onDestroy, onMount} from "svelte";
    import _ from "lodash";
    import {schemasMovieUpdation} from "$lib/common/schemas/Movie.schemas";
    import {invalidateAll} from "$app/navigation";
    import Toast from "$lib/components/meltComponent/Toast.svelte";
    import {UpdateMovieDto} from "$lib/common/cdtos/UpdateMovie.dto";
    import ErrorInput from "$lib/components/ErrorInput.svelte";

    export let data
    let errors: any
    const updateMovie = async () => {
        const validation = schemasMovieUpdation.safeParse(new UpdateMovieDto($CreateUpdateMovieModalState))
        if (!validation.success) {
            errors = validation.error.formErrors.fieldErrors;
            const allErrors = Object.keys(errors)
            console.log(errors, 'ERRORS!!')

            $CreateUpdateMovieModalState.errors = allErrors.map((error, index) => ({
                title: allErrors[index],
                description: errors[error] || 'Unknown error',
                color: 'bg-red-500',
            }))
            return
        }

        const data = await fetch('/api/movies', {
            method: 'PUT',
            body: JSON.stringify($CreateUpdateMovieModalState),
            headers: {
                'content-type': 'application/json'
            }
        });
        const res = await data.json();
        if (res.success) {
            await invalidateAll();
            $CreateUpdateMovieModalState.errors = [{
                title: 'Added movie',
                description: 'The movie was updated successfully in frontEnd!',
                color: 'bg-green-500',
            }]
        } else {
            if (res.status === 400) {
                errors = res.payload;
                const allErrors = Object.keys(errors)
                $CreateUpdateMovieModalState.errors = allErrors.map((error, index) => ({
                    title: allErrors[index],
                    description: errors[error] || 'Unknown error',
                    color: 'bg-red-500',
                }))
            }
        }
        console.log($CreateUpdateMovieModalState)
    }
    const deleteMovie = async (index: number) => {
        const movies = await fetch('/api/movies', {method: 'DELETE', body: JSON.stringify({id: index})})
        const res = await movies.json()
    };
    let pageCreated = false
    onMount(() => {
        $CreateUpdateMovieModalState = data.movie.data

        pageCreated = true
    })
    onDestroy(() => {
        $CreateUpdateMovieModalState = _.cloneDeep(initialCreateUpdateMovieModalState)
    })
</script>
<Toast bind:toastData={$CreateUpdateMovieModalState.errors}/>
<div class="p-4 ">
    {#if data?.movie?.data}
        <div class="flex flex-row gap-8 w-fill-available mb-8 bg-gray-800 text-white p-4 justify-start">
            <div class="flex flex-col gap-8">
                <div>ID</div>
                <div>{data.movie.data.id}</div>
            </div>
            <div class="flex flex-col gap-8">
                <div>Title</div>
                <input on:click={() => {$CreateUpdateMovieModalState.title = ''}} class="inline-flex h-10  w-full  items-center justify-center
                     border-solid px-3 leading-none  rounded-lg border border-[rgba(247,177,85,0.6)] bg-white bg-opacity-100 p-[0.375rem] text-[rgb(150,69,22)] text-opacity-100 shadow"
                       bind:value={$CreateUpdateMovieModalState.title} placeholder={data.movie.data.title} required/>
                <ErrorInput errors={errors?.title}/>
            </div>
            <div class="flex flex-col gap-8">
                <div>Description</div>
                <input on:click={() => {$CreateUpdateMovieModalState.description = ''}} class="inline-flex h-10  w-full  items-center justify-center
                     border-solid px-3 leading-none  rounded-lg border border-[rgba(247,177,85,0.6)] bg-white bg-opacity-100 p-[0.375rem] text-[rgb(150,69,22)] text-opacity-100 shadow"
                       bind:value={$CreateUpdateMovieModalState.description} placeholder={data.movie.data.description}/>
                <ErrorInput errors={errors?.description}/>
            </div>
            <div class="flex flex-col gap-8">
                <div>Genre</div>
                {#if pageCreated}
                    <Select options={Genre } bind:value={$CreateUpdateMovieModalState.genre}/>
                    <ErrorInput errors={errors?.genre}/>
                {/if}
            </div>
            <div class="flex flex-col gap-8 w-[200px]">
                <div>Rating</div>
                <input on:click={() => {$CreateUpdateMovieModalState.rating = undefined}}
                       class="inline-flex h-10  w-full  items-center justify-center
                     border-solid px-3 leading-none  rounded-lg border border-[rgba(247,177,85,0.6)] bg-white bg-opacity-100 p-[0.375rem] text-[rgb(150,69,22)] text-opacity-100 shadow"
                       type='number' name="rating" placeholder='must be greater than 0 less than 5'
                       bind:value={$CreateUpdateMovieModalState.rating} min="0" max="10"
                />
                <ErrorInput errors={errors?.rating}/>
            </div>
            <div class="flex flex-col gap-8">
                <div>Release Date</div>
                {#if pageCreated}
                    <TimePicker bind:currentData={$CreateUpdateMovieModalState.year} withLabel={false}/>
                    <ErrorInput errors={errors?.year}/>
                {/if}
            </div>
            <div class="flex flex-col gap-8">
                <div>Is available</div>
                {#if pageCreated}
                    <Switch bind:isAvailable={$CreateUpdateMovieModalState.isAvailable}/>
                    <ErrorInput errors={errors?.isAvailable}/>
                {/if}
            </div>
            <div class="flex flex-col gap-4 self-end justify-end ml-auto">

                <button on:click={() => {
        updateMovie();
    }}
                        class="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3
  font-medium leading-none text-magnum-700 shadow hover:opacity-75"
                >
                    <lord-icon class="w-[30px] h-[30px] inline-block mr-[10px] current-color text-black hover:text-magnum-700"
                               src="/lottie/edit.json"
                               trigger="loop">
                    </lord-icon>
                    Update
                </button>

                <button on:click={() => {
        deleteMovie(data.movie.data.id);
        window.location.reload()
    }}
                        class="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3
  font-medium leading-none text-magnum-700 shadow hover:opacity-75"
                >
                    <lord-icon class="w-[30px] h-[30px] inline-block mr-[10px] current-color text-black hover:text-magnum-700"
                               src="https://media.lordicon.com/icons/wired/gradient/1432-erase.json"
                               trigger="loop">
                    </lord-icon>
                    Delete
                </button>
            </div>
        </div>

    {:else }
        this movie not exist or be deleted
    {/if}
</div>