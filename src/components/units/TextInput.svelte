<script lang="ts">
  import clsx from "clsx";
  type ValueChangeFn = (value: string) => void;
  type InputTextEvent = InputEvent & {
    currentTarget: EventTarget & HTMLInputElement;
  };

  export let id: string = null;
  export let type = "text";
  export let placeholder: string = null;
  export let label: string = null;
  export let onValueChange: ValueChangeFn = null;
  export let icon = null;

  function onChange(e: InputTextEvent) {
    if (onValueChange) {
      onValueChange(e.currentTarget.value);
    }
  }
</script>

<div class={clsx("wrapper", label ? "has-label" : "", icon ? "has-icon" : "")}>
  {#if icon}
    <div class="w-10 p-3">
      <svelte:component this={icon} />
    </div>
  {/if}

  <input
    {id}
    {type}
    class="input"
    on:change={onChange}
    placeholder={placeholder || label}
    aria-label={label}
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
    @apply px-3 rounded-lg bg-gray-100 flex items-center;
  }

  .input {
    @apply w-full px-1 bg-transparent outline-none py-3;
  }

  .wrapper.has-label {
    @apply relative;
  }

  .wrapper.has-label .label {
    @apply absolute top-4 left-4 pointer-events-none text-gray-500 transition-all;
  }

  .wrapper.has-label.has-icon .label {
    left: 56px;
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
