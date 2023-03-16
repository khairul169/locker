import { v4 } from "uuid";

export const searchUtil = (a?: string, b?: string) => {
  return a?.toLowerCase().includes(b?.toLowerCase());
};

export { v4 as uuidv4 };
