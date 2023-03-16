<script context="module" lang="ts">
  export type ButtonVariant = "solid" | "ghost" | "outline";
</script>

<script lang="ts">
  import clsx from "clsx";

  export let className = "";
  export let color = "primary";
  export let variant: ButtonVariant = "solid";
  export let type: "button" | "submit" = "button";
</script>

<button
  {type}
  class={clsx("btn", `btn-${variant}`, `btn-${color}`, className)}
  on:click
>
  <slot />
</button>
