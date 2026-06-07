// Purpose: configure Vite for React and GitHub Pages asset paths.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/jwt-auth-system/",
});

