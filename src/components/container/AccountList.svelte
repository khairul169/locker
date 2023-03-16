<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import type { Account, Directory, LockerItem } from "../../types/Account";
  import { getIcon } from "../../utils/iconLibrary";
  import ListItem from "../units/ListItem.svelte";
  import { searchUtil } from "../../utils/utility";

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

    toast.push(`Password ${item.title} copied!`);
  }

  function onItemAltClick(item: Account) {
    toast.push(`Username ${item.title} copied!`);
  }

  $: accounts = items
    .filter((item) => {
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
  <h2 class="text-2xl mb-5">{directory?.title || "My Accounts"}</h2>

  {#if directory != null}
    <ListItem
      icon={getIcon("FaFolder")}
      iconColor="#e3b94d"
      title="../"
      on:click={onParentDirClick}
    />
  {/if}

  {#each accounts as item}
    <ListItem
      icon={getIcon(item.icon)}
      iconColor={item.isDirectory ? "#e3b94d" : item.iconColor}
      title={item.title}
      subtitle={item.isDirectory === false
        ? item.description || item.username || item.url
        : item.description}
      handleDoubleClick={!item.isDirectory}
      on:click={() => onItemClick(item)}
      on:altclick={() => {
        if (item.isDirectory === false) onItemAltClick(item);
      }}
    />
  {/each}
</div>
