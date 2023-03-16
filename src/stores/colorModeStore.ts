import persistWritable from "../utils/persistWritable";

export const isDarkMode = persistWritable("dark-mode", false);

isDarkMode.subscribe((state) => {
  const el = document.documentElement;
  if (state) {
    el.classList.add("dark");
  } else {
    el.classList.remove("dark");
  }
});

/**
 * Toggle color mode
 */
export const toggleColorMode = () => {
  isDarkMode.update((value) => !value);
};
