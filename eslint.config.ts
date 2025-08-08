import { defineConfig } from "eslint-define-config";

export default defineConfig({
  extends: ["react-app", "react-app/jest"],
  rules: {
    "no-console": "warn",
    "react-hooks/exhaustive-deps": "error",
  },
});
