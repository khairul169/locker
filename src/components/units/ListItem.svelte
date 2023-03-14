<script lang="ts">
  import FaChevronRight from "svelte-icons/fa/FaChevronRight.svelte";
  export let title: string;
  export let subtitle = "";
  export let icon = null;
</script>

<button type="button" class="flex gap-4 text-left items-center w-full py-3">
  {#if icon}
    <div class="icon bg-primary-500 text-white">
      <svelte:component this={icon} />
    </div>
  {/if}

  <div class="flex-1">
    <p class="font-medium">{title}</p>
    {#if subtitle?.length > 0}
      <p class="text-sm text-muted">{subtitle}</p>
    {/if}
  </div>

  <span class="w-[10px] text-gray-500 dark:text-gray-400">
    <FaChevronRight />
  </span>
</button>

<style lang="postcss">
  .icon {
    @apply w-10 rounded-full flex items-center justify-center p-2 overflow-hidden;
  }
</style>
