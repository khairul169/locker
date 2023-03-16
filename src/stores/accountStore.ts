import type { LockerItem } from "../types/Account";
import persistWritable from "../utils/persistWritable";

// Create account store
const store = persistWritable<LockerItem[]>("accounts", []);

const add = (item: LockerItem) => {
  store.update((state) => [...state, item]);
};

const update = (id: string, value: Partial<LockerItem>) => {
  store.update((state) => {
    const items = [...state];
    const idx = items.findIndex((i) => i.id === id);
    if (idx >= 0) {
      items[idx] = { ...items[idx], ...value };
    }
    return items;
  });
};

const destroy = (id: string) => {
  // soft deletes
  update(id, { deletedAt: new Date() });
};

const accountStore = {
  items: store,
  add,
  update,
  destroy,
};

export default accountStore;
