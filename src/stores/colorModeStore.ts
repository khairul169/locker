import { writable } from "svelte/store";

export const isDarkMode = writable(false);

const STORAGE_COLOR_MODE = "color_mode";

const setColorMode = (dark: boolean) => {
  const el = document.documentElement;
  if (dark) {
    el.classList.add("dark");
  } else {
    el.classList.remove("dark");
  }
};

/**
 * Toggle color mode
 */
export const toggleColorMode = () => {
  isDarkMode.update((value) => {
    const newValue = !value;
    setColorMode(newValue);
    localStorage.setItem(STORAGE_COLOR_MODE, newValue ? "dark" : "light");
    return newValue;
  });
};

/**
 * Load stored color mode from local storage
 */
export const loadColorMode = () => {
  const colorMode = localStorage.getItem(STORAGE_COLOR_MODE) === "dark";
  isDarkMode.set(colorMode);
  setColorMode(colorMode);
};
