<script lang="ts">
    import {enhance} from '$app/forms';
    import {createDialog, melt} from '@melt-ui/svelte';
    import {X} from 'lucide-svelte';
    import {fade} from 'svelte/transition';
    import TimePicker from "$lib/components/meltComponent/TimePicker.svelte";
    import Switch from "$lib/components/meltComponent/Switch.svelte";
    import Select from "$lib/components/meltComponent/Select.svelte";
    import {Genre} from "$lib/enum";
    import {CreateUpdateMovieModalState} from "$lib/state/modals/CreateUpdateMovieModal.state";
    import {schemasMovieCreation} from "$lib/common/schemas/Movie.schemas";
    import ErrorInput from "$lib/components/ErrorInput.svelte";
    import {CreateMovieDto} from "$lib/common/cdtos/CreateMovie.dto";
    import Toast from "$lib/components/meltComponent/Toast.svelte";
    import {onMount} from "svelte";
    import { defineElement } from "@lordicon/element";
    import lottie from "lottie-web";
    import {invalidateAll} from "$app/navigation";
    defineElement(lottie.loadAnimation);


    const {
        elements: {
            trigger,
            overlay,
            content,
            title,
            description,
            close,
            portalled,
        },
        states: {open},
    } = createDialog({
        forceVisible: true,
    });

    let errors;

    const handleFormData = async (formData, cancel) => {
        const newMovie = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            rating: formData.get('rating') as string,
            year: formData.get('year') as string,
            isAvailable: formData.get('isAvailable') as string,
            genre: formData.get('genre') as Genre,
        }
        const validation = schemasMovieCreation.safeParse(new CreateMovieDto(newMovie))
        console.log(validation, 'validation')
        if (!validation.success) {
            errors = validation.error.formErrors.fieldErrors;
            cancel();
            handleResponse({ type: 'error', data: { payload: errors } }, () => {});
        }
    }


    const handleResponse = (result, updateData: () => void) => {
        console.log(result, 'result')
        if (result.type === 'success') {
            $open = false
            updateData();
            $CreateUpdateMovieModalState.errors = [{
                title: 'Added movie',
                description: 'Congratulation! The movie was added successfully!',
                color: 'bg-green-500',
            }]
            invalidateAll()
            // window.location.reload();
        } else {
            errors = result?.data?.payload;
                const allErrors = Object.keys(errors)
                $CreateUpdateMovieModalState.errors = allErrors.map((error, index) => ({
                    title: allErrors[index],
                    description: errors[error] || 'Unknown error',
                    color: 'bg-red-500',
                }))
        }
    }

</script>


<div class="button-container">

    <button
            use:melt={$trigger}
            class="inline-flex items-center justify-center rounded-xl bg-[rgb(0,0,0,0.75)] px-4 py-3
  font-medium leading-none text-magnum-700 shadow hover:opacity-75 addNewMovie gap-[10px]"
    >
        <lord-icon
                src="/lottie/180-envelope-mail-plus.json"
                trigger="hover">
        </lord-icon>
        Add new movie by Form
    </button>
</div>

<Toast bind:toastData={$CreateUpdateMovieModalState.errors}/>
{#if $open}
    <div class="" use:melt={$portalled}>
        <div
                use:melt={$overlay}
                class="fixed inset-0 z-50 bg-black/50"
                transition:fade={{ duration: 150 }}
        />
        <div
                class="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw]
            max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[rgb(34,37,39)]
            p-6 shadow-lg"
                use:melt={$content}
        >
            <h2 use:melt={$title} class="m-0 text-lg font-medium text-white">
                Add movie
            </h2>
            <p use:melt={$description} class="mb-5 mt-2 leading-normal text-zinc-400">
                Add movie. Click save when you're done.
            </p>
            <form
                    use:enhance={async ({formData,cancel})=>{
                        await handleFormData(formData,cancel);
                        console.log('a')
                        return  ({ result, update }) => {
                                handleResponse(result,update)
                            }
                    }}
                    action="?/postMovie" method="POST">

                <div class="mb-4 flex items-center gap-5">
                    <label class="w-[90px] text-right select-none font-medium text-[rgb(150,69,22)] text-opacity-100"
                           for="title">Title </label>
                    <input
                            class="inline-flex h-8 w-full flex-1 items-center justify-center
                     border-solid px-3 leading-none rounded-lg border border-[rgba(247,177,85,0.6)] bg-[rgb(47,51,53)] bg-opacity-100 p-[0.375rem] text-[rgb(150,69,22)] text-opacity-100 shadow"
                            type='text' name="title" placeholder='film name' required
                            bind:value={$CreateUpdateMovieModalState.title}
                    />
                </div>
                <div class="ml-[25%] w-full flex items-center my-2">

                    <ErrorInput errors={errors?.title}/>
                </div>
                <div class="mb-4 flex items-center gap-5">
                    <label class="w-[90px] text-right select-none font-medium text-[rgb(150,69,22)] text-opacity-100 "
                           for="description">
                        Description
                    </label>
                    <input
                            class="inline-flex h-8 w-full flex-1 items-center justify-center
                     border-solid px-3 leading-none  rounded-lg border border-[rgba(247,177,85,0.6)] bg-[rgb(47,51,53)] bg-opacity-100 p-[0.375rem] text-[rgb(150,69,22)] text-opacity-100 shadow"
                            type='text' name="description" placeholder='movie description '
                            bind:value={$CreateUpdateMovieModalState.description}
                    />
                </div>
                <div class="ml-[25%] w-full flex items-center my-2">
                    <ErrorInput errors={errors?.description}/>
                </div>
                <div class="mb-4 flex items-center gap-5">
                    <label class="w-[90px] text-right select-none font-medium text-[rgb(150,69,22)] text-opacity-100"
                           for="rating">
                        Rating
                    </label>
                    <input
                            class="inline-flex h-8 w-full flex-1 items-center justify-center
                     border-solid px-3 leading-none  rounded-lg border border-[rgba(247,177,85,0.6)] bg-[rgb(47,51,53)] bg-opacity-100 p-[0.375rem] text-[rgb(150,69,22)] text-opacity-100 shadow"
                            type='number' name="rating" placeholder='must be greater than 0 less than 5'
                            bind:value={$CreateUpdateMovieModalState.rating} min="0" max="10"
                    />
                </div>
                <div class="ml-[25%] w-full flex items-center my-2">

                    <ErrorInput errors={errors?.rating}/>
                </div>
                <TimePicker bind:currentData={$CreateUpdateMovieModalState.year}/>
                <input type='text' name="year"
                       value={$CreateUpdateMovieModalState.year} hidden/>
                <div class="pl-[25%] w-fit flex items-center my-2">
                    <ErrorInput errors={errors?.year}/>
                </div>
                <div class="mb-4 flex items-center gap-5">
                    <label class="w-[90px] text-right select-none font-medium text-[rgb(150,69,22)] text-opacity-100"
                           for="rating">
                        Is Available
                    </label>
                    <Switch bind:isAvailable={$CreateUpdateMovieModalState.isAvailable}/>
                    <input name="isAvailable" value={$CreateUpdateMovieModalState.isAvailable} hidden/>

                    <Select options={Genre } bind:value={$CreateUpdateMovieModalState.genre}/>
                    <input name="genre" value={$CreateUpdateMovieModalState.genre} hidden/>

                </div>
                <div class=" w-[40%]  items-center my-2 inline-block">
                    <ErrorInput errors={errors?.isAvailable}/>
                </div>
                <div class=" w-fit  items-center inline-block">
                    <ErrorInput errors={errors?.genre}/>
                </div>

                <div class="mt-6 flex justify-end gap-4">
                    <button
                            use:melt={$close}
                            class="inline-flex h-8 items-center justify-center rounded-sm
                    bg-[rgb(0,0,0,0.7)] px-4 font-medium leading-none text-zinc-600"
                    >
                        Cancel
                    </button>
                    <button type="submit"
                            class="inline-flex h-8 items-center justify-center rounded-sm
                            bg-[rgb(47,51,51)]
                    hover:bg-magnum-100 px-4 font-medium leading-none text-magnum-900"
                    >
                        Save changes
                    </button>
                </div>
                <button
                        use:melt={$close}
                        aria-label="close"
                        class="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none bg-[rgb(47,51,53)]
                items-center justify-center rounded-full p-1 text-magnum-800
                hover:bg-magnum-500 focus:shadow-magnum-400"
                >
                    <X class="size-4"/>
                </button>
            </form>
        </div>
    </div>
{/if}

<style>
    .button-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        width: 100%;
        margin-right: 20px;
    }
</style>