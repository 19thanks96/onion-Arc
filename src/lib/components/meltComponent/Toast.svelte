<script lang="ts">
    import { createToaster, melt } from '@melt-ui/svelte';
    import { flip } from 'svelte/animate';
    import { fly } from 'svelte/transition';
    import {X} from "lucide-svelte";
    export let toastData: ToastData[]

    type ToastData = {
        title: string;
        description: string;
        color: string;
    };

    const {
        elements: { content, title, description, close },
        helpers: { addToast },
        states: { toasts },
        actions: { portal },
    } = createToaster<ToastData>();

    $: if (toastData && toastData.length > 0) {
        console.log('ToastData changed:', toastData);

        // Add each new toast from toastData to the toaster
        toastData.forEach(toast => {
            addToast({
                data:toast
            });

            setTimeout(() => {
                toastData = []
            },1500)
        });
    }

</script>


<div
        class="fixed right-0 top-0 z-50 m-4 flex flex-col items-end gap-2 md:bottom-0 md:top-auto"
        use:portal
>
    {#each $toasts as { id, data } (id)}
        <div
                use:melt={$content(id)}
                animate:flip={{ duration: 500 }}
                in:fly={{ duration: 150, x: '100%' }}
                out:fly={{ duration: 150, x: '100%' }}
                class="rounded-lg bg-neutral-800 text-white shadow-md z-[1101]"
        >
            <div
                    class="relative flex w-[24rem] max-w-[calc(100vw-2rem)] items-center justify-between gap-4 p-5"
            >
                <div>
                    <h3
                            use:melt={$title(id)}
                            class="flex items-center gap-2 font-semibold"
                    >
                        {data.title}
                        <span class="size-1.5 rounded-full {data.color}" />
                    </h3>
                    <div use:melt={$description(id)}>
                        {data.description}
                    </div>
                </div>
                <button
                        use:melt={$close(id)}
                        class="absolute right-4 top-4 grid size-6 place-items-center rounded-full text-magnum-500
          hover:bg-magnum-900/50"
                >
                    <X class="size-4" />
                </button>
            </div>
        </div>
    {/each}
</div>