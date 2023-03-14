<script lang="ts">
  import clsx from "clsx";
  import { createEventDispatcher } from "svelte";

  export let zIndex = 1;
  export let isVisible = false;

  const dispatcher = createEventDispatcher();

  function onClose() {
    dispatcher("close");
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.code === "Escape") {
      onClose();
    }
  }
</script>

<div
  class={clsx("backdrop", isVisible ? "is-visible" : "")}
  style="z-index: {zIndex}"
  on:click={onClose}
  on:keydown={onKeyDown}
/>

<svelte:window on:keydown={onKeyDown} />

<style lang="postcss">
  .backdrop {
    @apply fixed bg-transparent inset-0 transition-colors invisible;
  }

  .backdrop.is-visible {
    @apply bg-opacity-20 backdrop-blur-sm visible;
  }
</style>
