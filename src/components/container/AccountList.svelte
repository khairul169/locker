<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import FaPencilAlt from "svelte-icons/fa/FaPencilAlt.svelte";
  import type { Account, Directory, LockerItem } from "../../types/Account";
  import { getIcon } from "../../utils/iconLibrary";
  import ListItem from "../units/ListItem.svelte";
  import { searchUtil } from "../../utils/utility";
  import EmptyMessage from "../units/EmptyMessage.svelte";
  import IconButton from "../units/IconButton.svelte";

  export let items: LockerItem[] = [];
  export let directory: Directory = null;
  export let search: string = "";

  const dispatch = createEventDispatcher();

  function filterSearch(item: LockerItem, query: string) {
    return (
      (item.isDirectory === false &&
        (searchUtil(item.url, query) || searchUtil(item.username, query))) ||
      searchUtil(item.title, query) ||
      searchUtil(item.description, query)
    );
  }

  function onDirChange(dir: Directory | null) {
    dispatch("dirchange", dir);
    directory = dir;
  }

  function onParentDirClick() {
    let parentDir = items.find(
      (i) => i.id === directory.parentId && i.isDirectory
    );
    parentDir = parentDir as Directory | null;
    onDirChange(parentDir || null);
  }

  function onItemClick(item: LockerItem) {
    if (item.isDirectory) {
      return onDirChange(item);
    }
    dispatch("itemclick", item);
  }

  $: accounts = items
    .filter((item) => {
      if (item.deletedAt) {
        return false;
      }

      if (search?.length >= 3) {
        return filterSearch(item, search);
      }

      // Filter directory items
      if (directory) return item.parentId === directory.id;

      // Filter root dir
      return !item.parentId;
    })
    .sort((a, b) => {
      // sort by isDirectory & title
      const dir = (a.isDirectory ? 0 : 1) - (b.isDirectory ? 0 : 1);
      const name = a.title.localeCompare(b.title);
      return dir || name;
    });
</script>

<div>
  <div class="flex items-center mb-4 gap-3">
    <div>
      <h2 class="text-xl md:text-2xl">
        {directory?.title || "My Accounts"}
      </h2>
      {#if directory?.description?.length > 0}
        <p class="text-xs">{directory.description}</p>
      {/if}
    </div>
    {#if directory != null}
      <IconButton
        icon={FaPencilAlt}
        variant="ghost"
        on:click={() => dispatch("itemclick", directory)}
      />
    {/if}
  </div>

  {#if directory != null}
    <ListItem
      icon={getIcon("FaFolder")}
      iconColor="#e3b94d"
      title="../"
      on:click={onParentDirClick}
    />
  {/if}

  {#if !accounts.length}
    <EmptyMessage class="mt-4">Account is empty.</EmptyMessage>
  {/if}

  {#each accounts as item}
    <ListItem
      icon={getIcon(item.icon)}
      iconColor={item.iconColor || (item.isDirectory ? "#e3b94d" : "#3e2e81")}
      title={item.title}
      subtitle={item.isDirectory === false
        ? item.description || item.username || item.url
        : item.description}
      on:click={() => onItemClick(item)}
    />
  {/each}
</div>
