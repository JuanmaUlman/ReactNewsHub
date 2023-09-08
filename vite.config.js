import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/ReactNewsHub/",

  define: {
    "import.meta.env.VITE_REACT_APP_API_KEY": JSON.stringify(
      process.env.VITE_REACT_APP_API_KEY
    ),
    "import.meta.env.VITE_REACT_APP_authDomain": JSON.stringify(
      process.env.VITE_REACT_APP_authDomain
    ),
    "import.meta.env.VITE_REACT_APP_storageBucket": JSON.stringify(
      process.env.VITE_REACT_APP_storageBucket
    ),
    "import.meta.env.VITE_REACT_APP_messagingSenderId": JSON.stringify(
      process.env.VITE_REACT_APP_messagingSenderId
    ),
    "import.meta.env.VITE_REACT_APP_appId": JSON.stringify(
      process.env.VITE_REACT_APP_appId
    ),
    // Define todas tus variables de entorno aquí
  },
});
