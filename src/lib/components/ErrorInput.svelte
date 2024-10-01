<script lang="ts">

    export let errors;
</script>


{#if errors?.length > 0}
    <p class="text-red-500 text-sm ml-2">
        {errors?.at(0)}
    </p>
{/if}