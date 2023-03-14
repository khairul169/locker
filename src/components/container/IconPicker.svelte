<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import FaSearch from "svelte-icons/fa/FaSearch.svelte";
  import debounce from "../../utils/debounce";
  import { getIcon, icons } from "../../utils/iconLibrary";
  import Button from "../units/Button.svelte";
  import TextInput from "../units/TextInput.svelte";

  const dispatch = createEventDispatcher();
  let searchQuery = "";

  $: iconList = icons.filter((item) => {
    if (searchQuery.length > 0) {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const onSearch = debounce((value: string) => {
    searchQuery = value;
  }, 500);
</script>

<div class="relative">
  <TextInput
    icon={FaSearch}
    className="sticky top-4"
    onValueChange={onSearch}
  />

  <div class="grid grid-cols-4 md:grid-cols-8 gap-4 mt-4 md:mt-8">
    {#each iconList as item}
      <Button
        className="btn-icon overflow-hidden !p-0 flex items-center justify-center"
        on:click={() => dispatch("select", item)}
      >
        <div class="w-5/6 h-5/6">
          <svelte:component this={getIcon(item.icon)} />
        </div>
      </Button>
    {/each}
  </div>
</div>
