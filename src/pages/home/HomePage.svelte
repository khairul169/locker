<script lang="ts">
  import Header from "./Header.svelte";
  import FaSearch from "svelte-icons/fa/FaSearch.svelte";
  import FaPlus from "svelte-icons/fa/FaPlus.svelte";
  import TextInput from "../../components/units/TextInput.svelte";
  import FloatingButton from "../../components/units/FloatingButton.svelte";
  import Button from "../../components/units/Button.svelte";
  import type { Account, Directory } from "../../types/Account";
  import { uuidv4 } from "../../utils/utility";
  import AccountList from "../../components/container/AccountList.svelte";
  import accountStore from "../../stores/accountStore";
  import debounce from "../../utils/debounce";

  const testDirectory: Directory = {
    isDirectory: true,
    id: uuidv4(),
    icon: "FaFolder",
    title: "Google",
    description: "My google account",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const testAccount: Account = {
    isDirectory: false,
    id: uuidv4(),
    icon: "FaGoogle",
    title: "Google",
    description: "My google account",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let currentDir: Directory = null;
  let search = "";
  $: items = accountStore.items;

  const onSearch = debounce((value: string) => {
    search = value;
  }, 500);
</script>

<main class="flex flex-col gap-4 md:gap-6">
  <Header name="Test" />
  <TextInput
    icon={FaSearch}
    placeholder="Search for account..."
    onValueChange={onSearch}
    className="sticky top-4"
  />

  <AccountList items={$items} bind:search bind:directory={currentDir} />

  <FloatingButton
    icon={FaPlus}
    actions={[
      { key: "add-dir", title: "Add Directory" },
      { key: "add-account", title: "Add Account" },
    ]}
    on:action={(e) => {
      switch (e.detail) {
        case "add-dir":
          accountStore.add({ ...testDirectory, parentId: currentDir?.id });
          break;
        case "add-account":
          accountStore.add({ ...testAccount, parentId: currentDir?.id });
          break;
      }
    }}
  />
</main>
