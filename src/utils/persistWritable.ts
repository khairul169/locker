import { writable } from "svelte/store";

const persistWritable = <T>(key: string, initialState: T) => {
  // retrieve stored state
  let initialData = initialState;
  const data = localStorage.getItem(key);
  if (data) {
    initialData = JSON.parse(data);
  }

  // create store
  const store = writable<T>(initialData);

  // store state to storage on update
  store.subscribe((state) => {
    const data = JSON.stringify(state);
    localStorage.setItem(key, data);
  });

  return store;
};

export default persistWritable;
