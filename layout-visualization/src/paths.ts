import path from "node:path";

export const publicDir = path.join(import.meta.dirname, "..", "public");
export const rootLayoutsDir = path.join(
  import.meta.dirname,
  "..",
  "..",
  "layouts",
);
