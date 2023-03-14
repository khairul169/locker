import * as FontAwesomeIcons from "svelte-icons/fa";

export type IconItem = {
  name: string;
  icon: string;
};

export const icons = Object.keys(FontAwesomeIcons).map(
  (item) =>
    ({
      name: item.replace("Fa", ""),
      icon: item,
    } as IconItem)
);

export const getIcon = (name: string) => {
  return FontAwesomeIcons[name] || null;
};
