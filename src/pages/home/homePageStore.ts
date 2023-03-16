import type { Directory } from "../../types/Account";
import persistWritable from "../../utils/persistWritable";

type HomePageStoreType = {
  currentDir?: Directory | null;
  search: string;
};

const homePageStore = persistWritable<HomePageStoreType>("homepage-store", {
  currentDir: null,
  search: "",
});

export default homePageStore;
