import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from 'rollup-plugin-visualizer'


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const isAnalyze = env.ANALYZE === 'true';
    return {
        plugins: [react(), tsconfigPaths(), isAnalyze && visualizer({ open: true })].filter(Boolean),
        css: {
            preprocessorOptions: {
                scss: {
                    api: "modern-compiler"
                }
            }
        },
        build: {
            sourcemap: false,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            // 1. Separar Excalidraw (es el más grande)
                            if (id.includes('@excalidraw')) return 'vendor-excalidraw';

                            // 2. Separar Mermaid
                            if (id.includes('mermaid')) return 'vendor-mermaid';

                            // 3. Separar las librerías de grafos (Cytoscape y ELK)
                            if (id.includes('cytoscape') || id.includes('elkjs')) return 'vendor-graphs';

                            // 4. Separar KaTeX
                            if (id.includes('katex')) return 'vendor-katex';
                            if (id.includes('react') || id.includes('jotai') || id.includes('react-router')) {
                                return 'vendor-framework';
                            }
                            // 5. Todo lo demás de React/Bootstrap/etc.
                            return 'vendor-core';
                        }
                    },
                },
            },
        },
        server: {

            proxy: {
                '/api': {
                    target: 'https://d0wlq5t865.execute-api.eu-west-1.amazonaws.com',
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    }
})
