import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const isAnalyze = env.ANALYZE === 'true'
    return {
        plugins: [react(), tsconfigPaths(), isAnalyze && visualizer({ open: true })].filter(Boolean),
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
        },
        build: {
            sourcemap: false,
        },
        server: {
            proxy: {
                '/api': {
                    target: 'https://dd1kekevp7.execute-api.eu-west-1.amazonaws.com',
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    }
})
