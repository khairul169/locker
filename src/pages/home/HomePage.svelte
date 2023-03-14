<script>
  import TextInput from "../../components/units/TextInput.svelte";
  import Header from "./Header.svelte";
  import FaSearch from "svelte-icons/fa/FaSearch.svelte";
  import FaPlus from "svelte-icons/fa/FaPlus.svelte";
  import FloatingButton from "../../components/units/FloatingButton.svelte";
  import Button from "../../components/units/Button.svelte";
</script>

<main class="container flex flex-col gap-4 md:gap-6">
  <Header name="Test" />
  <TextInput icon={FaSearch} placeholder="Search..." />

  <TextInput placeholder="Input name" />
  <TextInput label="Name" />
  <TextInput icon={FaSearch} label="Name" />

  <FloatingButton actionButton icon={FaPlus}>
    <Button className="btn-sm" variant="outline">Add Directory</Button>
    <Button className="btn-sm" variant="outline">Add Account</Button>
  </FloatingButton>
</main>
