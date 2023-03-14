<script>
  import TextInput from "../../components/units/TextInput.svelte";
  import Header from "./Header.svelte";
  import FaSearch from "svelte-icons/fa/FaSearch.svelte";
  import FaPlus from "svelte-icons/fa/FaPlus.svelte";
  import FaGoogle from "svelte-icons/fa/FaGoogle.svelte";
  import FaFacebook from "svelte-icons/fa/FaFacebook.svelte";
  import FloatingButton from "../../components/units/FloatingButton.svelte";
  import Button from "../../components/units/Button.svelte";
  import ListItem from "../../components/units/ListItem.svelte";
  import { getIcon } from "../../utils/iconLibrary";
</script>

<main class="flex flex-col gap-4 md:gap-6">
  <Header name="Test" />
  <TextInput
    icon={FaSearch}
    placeholder="Search for account..."
    className="sticky top-4"
  />

  <div>
    <ListItem icon={getIcon("FaGoogle")} title="Google" />
    <ListItem
      icon={getIcon("FaFacebook")}
      title="Facebook"
      subtitle="www.facebook.com"
    />
    <ListItem
      icon={getIcon("FaTwitter")}
      title="Twitter"
      subtitle="khairul169"
    />
  </div>

  <FloatingButton actionButton icon={FaPlus}>
    <Button className="btn-sm" variant="outline">Add Directory</Button>
    <Button className="btn-sm" variant="outline">Add Account</Button>
  </FloatingButton>
</main>
