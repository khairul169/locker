<script lang="ts">
  import clsx from "clsx";
  import { createEventDispatcher } from "svelte";
  import Backdrop from "./Backdrop.svelte";
  import IconButton from "./IconButton.svelte";

  export let icon;
  export let actionButton = false;

  const dispatch = createEventDispatcher();

  let isActionOpen = false;

  function onCloseAction() {
    isActionOpen = false;
  }

  function onBtnClick(e: any) {
    if (actionButton) {
      isActionOpen = !isActionOpen;
    } else {
      dispatch("click", e);
    }
  }
</script>

<div class="sticky bottom-4 right-0 md:bottom-6 md:right-6 self-end">
  <div class="wrapper">
    <IconButton
      title="Add"
      className="relative z-20"
      iconClassName={clsx(
        "transition-transform",
        isActionOpen ? "rotate-[135deg]" : "rotate-0"
      )}
      size={24}
      {icon}
      on:click={onBtnClick}
    />

    {#if actionButton}
      <Backdrop isVisible={isActionOpen} on:close={onCloseAction} />

      <div class={clsx("actions", isActionOpen ? "is-visible" : "")}>
        <slot />
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  .wrapper {
    @apply relative;
  }

  .wrapper .actions {
    @apply w-[200px] z-10 flex flex-col gap-4 absolute bottom-20 right-0 opacity-0 invisible transition-all translate-y-10 scale-50;
  }

  .wrapper .actions.is-visible {
    @apply visible opacity-100 translate-y-0 scale-100;
  }
</style>
