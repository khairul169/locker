<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";
  import { createEventDispatcher, getContext } from "svelte";
  import type { Writable } from "svelte/store";
  import FaClipboard from "svelte-icons/fa/FaClipboard.svelte";
  import TextInput from "../../components/units/TextInput.svelte";

  const dispatch = createEventDispatcher();
  const isEditing = getContext<Writable<boolean>>("editing");

  export let label: string;

  function onCopyValue() {
    dispatch("copy");
    toast.push(`${label} copied!`);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="relative" on:click={!$isEditing ? onCopyValue : null}>
  <TextInput
    {label}
    className={!$isEditing
      ? "hover:!bg-slate-200 dark:hover:!bg-primary-800"
      : ""}
    inputClassName={!$isEditing ? "cursor-pointer" : ""}
    disabled={!$isEditing}
    {...$$restProps}
  />

  {#if !$isEditing}
    <div
      class="absolute right-4 top-1/2 -translate-y-1/2 w-5 pointer-events-none text-slate-600 dark:text-primary-600"
    >
      <FaClipboard />
    </div>
  {/if}
</div>
