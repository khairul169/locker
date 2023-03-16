<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import FaChevronRight from "svelte-icons/fa/FaChevronRight.svelte";

  export let title: string;
  export let subtitle = "";
  export let icon = null;
  export let iconColor: string = null;
  export let handleDoubleClick = false;

  const dispatch = createEventDispatcher();
  let clickTimer;

  function onClick() {
    dispatch("click");
  }

  function onAltClick() {
    dispatch("altclick");
  }
</script>

<button
  type="button"
  class="list-item hover:bg-slate-100 dark:hover:bg-primary-900"
  on:click={(e) => {
    if (handleDoubleClick) {
      if (clickTimer) clearTimeout(clickTimer);
      clickTimer = setTimeout(onClick, 400);
    } else {
      onClick();
    }
  }}
  on:dblclick={(e) => {
    if (!handleDoubleClick) {
      return;
    }
    if (clickTimer) clearTimeout(clickTimer);
    onAltClick();
  }}
  on:contextmenu={(e) => {
    e.preventDefault();
    onAltClick();
  }}
>
  {#if icon}
    <div
      class="icon bg-primary-500 text-white"
      style={iconColor ? `background-color: ${iconColor}` : null}
    >
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
  .list-item {
    --margin-x: 12px;
    @apply flex gap-4 text-left items-center px-[var(--margin-x)] h-16 transition-colors rounded;
    margin: 0 calc(-1 * var(--margin-x));
    width: calc(100% + (2 * (var(--margin-x))));
  }

  .icon {
    @apply w-10 rounded-full flex items-center justify-center p-2 overflow-hidden;
  }
</style>
