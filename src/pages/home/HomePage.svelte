<script lang="ts">
  import Header from "./Header.svelte";
  import FaSearch from "svelte-icons/fa/FaSearch.svelte";
  import FaPlus from "svelte-icons/fa/FaPlus.svelte";
  import TextInput from "../../components/units/TextInput.svelte";
  import FloatingButton from "../../components/units/FloatingButton.svelte";
  import type { LockerItem } from "../../types/Account";
  import AccountList from "../../components/container/AccountList.svelte";
  import accountStore from "../../stores/accountStore";
  import debounce from "../../utils/debounce";
  import homePageStore from "./homePageStore";
  import { onMount } from "svelte";
  import BottomSheet from "../../components/units/BottomSheet.svelte";
  import FormAccount, {
    initialAccountData,
    initialDirectoryData,
  } from "./FormAccount.svelte";

  type ModalFormAccountType = {
    isVisible: boolean;
    data?: LockerItem | null;
  };

  let modalFormAccount: ModalFormAccountType = {
    isVisible: false,
    data: null,
  };

  const onSearch = debounce((value: string) => {
    $homePageStore.search = value;
  }, 500);

  onMount(() => {
    // reset search value
    $homePageStore.search = "";
  });

  function showModalForm(data: LockerItem) {
    modalFormAccount = { isVisible: true, data };
  }

  $: items = accountStore.items;
</script>

<main>
  <Header name="Khai" />

  <div
    class="sticky top-0 container-padding bg-[var(--bg-color)] transition-colors"
  >
    <TextInput
      icon={FaSearch}
      placeholder="Search for account..."
      onValueChange={onSearch}
    />
  </div>

  <div class="flex flex-col gap-4 md:gap-6 container-padding">
    <AccountList
      items={$items}
      bind:search={$homePageStore.search}
      bind:directory={$homePageStore.currentDir}
      on:itemclick={(e) => showModalForm(e.detail)}
    />

    <FloatingButton
      icon={FaPlus}
      actions={[
        { key: "add-dir", title: "Add Directory" },
        { key: "add-account", title: "Add Account" },
      ]}
      on:action={(e) => {
        const parentId = $homePageStore.currentDir?.id;

        switch (e.detail) {
          case "add-dir":
            showModalForm({ ...initialDirectoryData, parentId });
            break;
          case "add-account":
            showModalForm({ ...initialAccountData, parentId });
            break;
        }
      }}
    />
  </div>

  <BottomSheet bind:isVisible={modalFormAccount.isVisible}>
    <FormAccount
      bind:data={modalFormAccount.data}
      on:back={() => {
        modalFormAccount.isVisible = false;
      }}
    />
  </BottomSheet>
</main>
