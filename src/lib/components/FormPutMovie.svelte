<!--<script lang="ts">-->
<!--import {X} from "lucide-svelte";-->
<!--import {enhance} from '$app/forms';-->
<!--export let data:any;-->
<!--export let melt:any;-->
<!--export let fade,-->
<!--    overlay,-->
<!--    content,-->
<!--    title,-->
<!--    description,-->
<!--    close,-->
<!--    portalled,-->
<!--    open-->
<!--</script>-->
<!--<div class="" use:melt={$portalled}>-->
<!--    <div-->
<!--            use:melt={$overlay}-->
<!--            class="fixed inset-0 z-50 bg-black/50"-->
<!--            transition:fade={{ duration: 150 }}-->
<!--    />-->
<!--    <div-->
<!--            class="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw]-->
<!--            max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white-->
<!--            p-6 shadow-lg"-->

<!--            use:melt={$content}-->
<!--    >-->
<!--        <h2 use:melt={$title} class="m-0 text-lg font-medium text-black">-->
<!--            Edit movie-->
<!--        </h2>-->
<!--        <p use:melt={$description} class="mb-5 mt-2 leading-normal text-zinc-600">-->
<!--            Make changes to your movie here. Click save when you're done.-->
<!--        </p>-->
<!--        <form use:enhance={() => {-->
<!--                $open = false-->
<!--            }} action="?/putMovie" method="PUT">-->
<!--            <input type="hidden" name="id" value={data.movie.data.id}/>-->
<!--            <div class="mb-4 flex items-center gap-5">-->
<!--                <label class="w-[90px] text-right text-black" for="title"> title </label>-->
<!--                <input-->
<!--                        class="inline-flex h-8 w-full flex-1 items-center justify-center-->
<!--                    rounded-sm border border-solid px-3 leading-none text-black"-->
<!--                        type='text' name="title" placeholder='title' required-->
<!--                        value={data.movie.data.title}-->
<!--                />-->
<!--            </div>-->
<!--            <div class="mb-4 flex items-center gap-5">-->
<!--                <label class="w-[90px] text-right text-black" for="description">-->
<!--                    description-->
<!--                </label>-->
<!--                <input-->
<!--                        class="inline-flex h-8 w-full flex-1 items-center justify-center-->
<!--                    rounded-sm border border-solid px-3 leading-none text-black"-->
<!--                        type='text' name="description" placeholder='description'-->
<!--                        value={data.movie.data.description}-->
<!--                />-->
<!--            </div>-->
<!--            <div class="mt-6 flex justify-end gap-4">-->
<!--                <button-->
<!--                        use:melt={$close}-->
<!--                        class="inline-flex h-8 items-center justify-center rounded-sm-->
<!--                    bg-zinc-100 px-4 font-medium leading-none text-zinc-600"-->
<!--                >-->
<!--                    Cancel-->
<!--                </button>-->
<!--                <button type="submit"-->
<!--                        class="inline-flex h-8 items-center justify-center rounded-sm-->
<!--                    bg-magnum-100 px-4 font-medium leading-none text-magnum-900"-->
<!--                >-->
<!--                    Save changes-->
<!--                </button>-->
<!--            </div>-->
<!--            <button-->
<!--                    use:melt={$close}-->
<!--                    aria-label="close"-->
<!--                    class="absolute right-4 top-4 inline-flex h-6 w-6 appearance-none-->
<!--                items-center justify-center rounded-full p-1 text-magnum-800-->
<!--                hover:bg-magnum-100 focus:shadow-magnum-400"-->
<!--            >-->
<!--                <X class="size-4"/>-->
<!--            </button>-->
<!--        </form>-->
<!--    </div>-->
<!--</div>-->