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

  function onChange(e: InputTextEvent) {
    if (onValueChange) {
      onValueChange(e.currentTarget.value);
    }
  }
</script>

<div
  class={clsx(
    "wrapper bg-gray-100 dark:!bg-primary-900",
    label ? "has-label" : "",
    icon ? "has-icon" : "",
    className
  )}
>
  {#if icon}
    <div class="w-4 mx-1">
      <svelte:component this={icon} />
    </div>
  {/if}

  <input
    {id}
    {type}
    class="input"
    on:keyup={onChange}
    placeholder={placeholder || label}
    aria-label={label}
    {...$$restProps}
  />

  {#if label}
    <label class="label text-gray-400 dark:text-gray-300" for={id}>
      {label}
    </label>
  {/if}
</div>

<style lang="postcss">
  .wrapper {
    @apply px-3 rounded-lg flex items-center;
  }

  .input {
    @apply w-full px-2 bg-transparent outline-none py-3;
  }

  .wrapper.has-label {
    @apply relative;
  }

  .wrapper.has-label .label {
    @apply absolute top-4 left-5 pointer-events-none transition-all;
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
