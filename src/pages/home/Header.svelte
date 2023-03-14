<script lang="ts">
  import IconButton from "../../components/units/IconButton.svelte";
  import FaUser from "svelte-icons/fa/FaUser.svelte";
  import ColorModeToggle from "../../components/container/ColorModeToggle.svelte";

  export let name = "";
</script>

<header class="flex items-center pt-4">
  <h1 class="text-xl lg:text-3xl font-medium flex-1">Hello, {name} 👋</h1>

  <IconButton icon={FaUser} size={24} variant="ghost" />
  <ColorModeToggle />
</header>
