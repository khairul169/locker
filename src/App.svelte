<script lang="ts">
  import "./styles/global.css";
  import HomePage from "./pages/home/HomePage.svelte";
  import { loadColorMode } from "./stores/colorModeStore";

  loadColorMode();
</script>

<div class="app-wrapper">
  <HomePage />
</div>
