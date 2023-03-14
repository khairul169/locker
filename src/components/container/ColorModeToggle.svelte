<script>
  import FaMoon from "svelte-icons/fa/FaMoon.svelte";
  import FaLightbulb from "svelte-icons/fa/FaLightbulb.svelte";
  import IconButton from "../units/IconButton.svelte";
  import { isDarkMode, toggleColorMode } from "../../stores/colorModeStore";
</script>

<IconButton
  icon={$isDarkMode ? FaLightbulb : FaMoon}
  size={24}
  variant="ghost"
  on:click={toggleColorMode}
/>
