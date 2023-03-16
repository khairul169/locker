<script lang="ts">
  import clsx from "clsx";
  import Backdrop from "./Backdrop.svelte";

  export let isVisible = true;
  let clientHeight = document.documentElement.clientHeight;
</script>

<div>
  <Backdrop
    {isVisible}
    on:close={() => {
      isVisible = false;
    }}
  />

  <div
    bind:clientHeight
    class={clsx("sheet-base", isVisible ? "is-visible" : "")}
    style={!isVisible ? `--tw-translate-y: ${clientHeight}px` : ""}
  >
    <div class="sheet-body">
      <slot />
    </div>
  </div>
</div>

<style lang="postcss">
  .sheet-base {
    @apply bg-white gdark:bg-primary-950 fixed z-10 bottom-0 left-[50%] -translate-x-[50%]
    rounded-t-xl w-full max-w-4xl transition-all shadow;
    /* pt-6  */
  }

  /* .sheet-base::before {
    content: "";
    @apply bg-slate-300 gdark:bg-primary-700 w-1/4 md:w-1/2 max-w-[200px] m-2 h-1 md:h-2 rounded-full absolute left-1/2 top-0 -translate-x-1/2;
  } */

  .sheet-body {
    @apply min-h-[100px] max-h-[calc(100dvh-48px)] p-3 md:p-8 overflow-y-auto;
  }

  .sheet-base.is-visible {
    @apply translate-y-0;
  }
</style>
