<script lang="ts">
  import clsx from "clsx";
  type ValueChangeFn = (value: string) => void;
  type InputTextEvent = KeyboardEvent & {
    currentTarget: EventTarget & HTMLInputElement;
  };

  export let id: string = null;
  export let type = "text";
  export let placeholder: string = null;
  export let label: string = null;
  export let onValueChange: ValueChangeFn = null;
  export let icon = null;
  export let className: string = null;
  export let inputClassName: string = null;

  function onChange(e: InputTextEvent) {
    if (onValueChange) {
      onValueChange(e.currentTarget.value);
    }
  }
</script>

<div
  class={clsx(
    "wrapper",
    label ? "has-label" : "",
    icon ? "has-icon" : "",
    className
  )}
>
  {#if icon}
    <div class="w-4 ml-4">
      <svelte:component this={icon} />
    </div>
  {/if}

  <input
    {id}
    {type}
    class={clsx("input", inputClassName)}
    on:keyup={onChange}
    placeholder={placeholder || label}
    aria-label={label}
    on:click
    {...$$restProps}
  />

  {#if label}
    <label class="label" for={id}>
      {label}
    </label>
  {/if}
</div>

<style lang="postcss">
  .wrapper {
    @apply rounded-lg flex items-center bg-slate-100 gdark:bg-primary-900 transition-colors;
  }

  .input {
    @apply w-full px-5 bg-transparent outline-none py-3;
  }

  .wrapper.has-label {
    @apply relative;
  }

  .wrapper.has-label .label {
    @apply absolute top-4 left-5 pointer-events-none transition-all text-gray-400 gdark:text-gray-300;
  }

  .wrapper.has-label.has-icon .label {
    left: 44px;
  }

  .wrapper.has-label .input {
    @apply pt-6 pb-2;
  }

  .wrapper.has-label .input::placeholder {
    @apply text-transparent;
  }

  .wrapper.has-label .input:focus + .label,
  .wrapper.has-label .input:not(:placeholder-shown) + .label {
    @apply top-[8px] text-xs;
  }
</style>
