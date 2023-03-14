<script lang="ts">
  import IconButton from "../../components/units/IconButton.svelte";
  import FaUser from "svelte-icons/fa/FaUser.svelte";

  export let name = "";
</script>

<header class="flex items-center">
  <h1 class="text-xl font-medium flex-1">Hello {name} 👋</h1>
  <IconButton icon={FaUser} size={24} variant="ghost" />
</header>
