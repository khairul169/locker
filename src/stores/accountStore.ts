import { writable } from "svelte/store";
import type { LockerItem } from "../types/Account";

const STORAGE_KEY = "accounts";
const initialValue: LockerItem[] = [];

const getInitialValue = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data) as LockerItem[];
  }
  return initialValue;
};

const storeValue = (data: LockerItem[]) => {
  const json = JSON.stringify(data);
  localStorage.setItem(STORAGE_KEY, json);
};

// Create account store
const store = writable(getInitialValue());

// Subscribe to changes and update local storage
store.subscribe((state) => storeValue(state));

const accountStore = {
  items: store,

  add(item: LockerItem) {
    store.update((state) => [...state, item]);
  },

  update(id: string, value: Partial<LockerItem>) {
    store.update((state) => {
      const items = [...state];
      const idx = items.findIndex((i) => i.id === id);
      if (idx >= 0) {
        items[idx] = { ...items[idx], ...value };
      }
      return items;
    });
  },

  destroy(id: string) {
    store.update((state) => {
      const items = [...state];
      const idx = items.findIndex((i) => i.id === id);
      if (idx >= 0) {
        items.splice(idx, 1);
      }
      return items;
    });
  },
};

export default accountStore;
