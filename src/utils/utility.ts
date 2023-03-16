import { v4 } from "uuid";

export const searchUtil = (a?: string, b?: string) => {
  return a?.toLowerCase().includes(b?.toLowerCase());
};

export const copyToClipboard = async (data?: string) => {
  const { clipboard } = navigator;
  try {
    await clipboard.writeText(data || "");
  } catch (err) {
    //
  }
};

export { v4 as uuidv4 };
