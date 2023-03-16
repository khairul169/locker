<script lang="ts" context="module">
  export const initialDirectoryData: Directory = {
    isDirectory: true,
    icon: "FaFolder",
    iconColor: "#e3b94d",
    title: "",
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  export const initialAccountData: Account = {
    isDirectory: false,
    icon: "FaKey",
    iconColor: "#3e2e81",
    title: "",
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
</script>

<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";

  import { createForm } from "felte";
  import { createEventDispatcher, setContext } from "svelte";
  import { writable, get } from "svelte/store";
  import FaTrash from "svelte-icons/fa/FaTrash.svelte";
  import homePageStore from "./homePageStore";
  import Button from "../../components/units/Button.svelte";
  import IconButton from "../../components/units/IconButton.svelte";
  import TextInput from "../../components/units/TextInput.svelte";
  import accountStore from "../../stores/accountStore";
  import type { Account, Directory, LockerItem } from "../../types/Account";
  import { copyToClipboard, uuidv4 } from "../../utils/utility";
  import FormAccountTextField from "./FormAccountTextField.svelte";
  import { getIcon } from "../../utils/iconLibrary";

  export let data = null;

  const dispatch = createEventDispatcher();
  const isEditing = writable(false);
  setContext("editing", isEditing);

  function onClose() {
    dispatch("back");
  }

  function onFormSubmit(values: LockerItem) {
    if (values.id) {
      // update
      const payload = { ...values, updatedAt: new Date() };
      accountStore.update(values.id, payload);
      data = payload;
      toast.push("Account updated!");

      // Update current dir data
      if (payload.isDirectory && payload.id === $homePageStore.currentDir?.id) {
        $homePageStore.currentDir = payload;
      }
    } else {
      // create
      const payload = {
        id: uuidv4(),
        ...values,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      accountStore.add(payload);
      data = payload;
      toast.push("Account created!");
    }

    if (values.isDirectory) {
      onClose();
    } else {
      $isEditing = false;
    }
  }

  function onDeleteItem() {
    if (data?.id) accountStore.destroy(data.id);
    onClose();

    // Update current dir data
    if (data.isDirectory && data.id === $homePageStore.currentDir?.id) {
      $homePageStore.currentDir = null;
    }

    toast.push("Account deleted!");
    data = null;
  }

  const {
    data: formData,
    form,
    setFields,
  } = createForm({
    onSubmit: onFormSubmit,
  });

  $: {
    setFields(data);
    $isEditing = !data?.id;
  }
  $: iconComponent = getIcon($formData.icon);

  isEditing.subscribe((state) => {
    if (state) setFields(data);
  });

  function copyValue(name: string) {
    const formValues = get(formData);
    copyToClipboard(formValues[name]);
  }
</script>

<form use:form class="flex flex-col gap-3 md:gap-6" autocomplete="off">
  <div
    class="mx-auto w-20 aspect-square rounded-full flex items-center justify-center overflow-hidden text-white"
    style={`background-color: ${$formData.iconColor || "#3e2e81"}`}
  >
    <div class="w-3/5">
      <svelte:component this={iconComponent} />
    </div>
  </div>

  {#if !$isEditing && data != null}
    <div class="text-center">
      <p class="text-xl md:text-3xl">{data?.title}</p>
      {#if data?.url?.length > 0}
        <a
          href={data.url.startsWith("http") ? data.url : `https://${data.url}`}
          target="_blank"
          class="text-xs md:text-sm"
        >
          {data.url}
        </a>
      {/if}
    </div>
  {:else}
    <TextInput label="Title" name="title" />
  {/if}

  {#if data?.isDirectory === false}
    <FormAccountTextField
      name="username"
      label="Username"
      on:copy={() => copyValue("title")}
    />
    <FormAccountTextField
      type="password"
      name="password"
      label="Password"
      on:copy={() => copyValue("password")}
    />
    <!-- content here -->
  {/if}
  <TextInput label="Description" name="description" disabled={!$isEditing} />

  {#if $isEditing && data?.isDirectory === false}
    <FormAccountTextField
      name="url"
      label="URL"
      on:copy={() => copyValue("url")}
    />
  {/if}

  <div class="mt-6 md:mt-10 grid md:grid-cols-2 gap-3 md:gap-6">
    {#if data?.id != null}
      <div class="col-span-2">
        <IconButton icon={FaTrash} variant="outline" on:click={onDeleteItem} />
      </div>
    {/if}

    <Button variant="outline" className="w-full" on:click={onClose}>
      Back
    </Button>

    {#if $isEditing}
      <Button type="submit" className="w-full">Save</Button>
    {:else}
      <Button
        className="w-full"
        on:click={() => {
          $isEditing = true;
        }}>Edit Account</Button
      >
    {/if}
  </div>
</form>
