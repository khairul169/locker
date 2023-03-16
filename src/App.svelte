<script lang="ts">
  import "./styles/global.css";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import HomePage from "./pages/home/HomePage.svelte";
  import { loadColorMode } from "./stores/colorModeStore";

  loadColorMode();
</script>

<div class="app-wrapper">
  <HomePage />

  <SvelteToast
    options={{
      theme: {
        "--toastBarHeight": 0,
        "--toastPadding": "0 10px 0 20px",
      },
    }}
  />
</div>
