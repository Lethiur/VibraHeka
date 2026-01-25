import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@auth": path.resolve(__dirname, "src/Modules/Features/Auth"),
            "@admin/addTherapist": path.resolve(__dirname, "src/Modules/Admin/AddTherapist"),
            "@core": path.resolve(__dirname, "src/Core"),
            "@admin/emailTemplates": path.resolve(__dirname, "src/Modules/Admin/Emails"),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler"
            }
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://localhost:5001',
                changeOrigin: true,
                secure: false,
            },
        },
    },
})
