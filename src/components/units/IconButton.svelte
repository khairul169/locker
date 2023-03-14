<script lang="ts">
  import clsx from "clsx";
  import type { ButtonVariant } from "./Button.svelte";

  export let icon;
  export let size = 16;
  export let className: string = null;
  export let iconClassName: string = null;
  export let title: string = null;
  export let color = "primary";
  export let variant: ButtonVariant = "solid";
</script>

<button
  aria-label={title}
  {title}
  type="button"
  class={clsx("btn btn-icon", `btn-${variant}`, `btn-${color}`, className)}
  on:click
>
  <div style={`width: ${size}px; height: ${size}px;`} class={iconClassName}>
    <svelte:component this={icon} />
  </div>
</button>
