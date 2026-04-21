import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import {visualizer} from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '')
    const isAnalyze = env.ANALYZE === 'true'
    const proxyTarget = env.VITE_DEV_PROXY_TARGET || 'https://anjpwsh7c8.execute-api.eu-west-1.amazonaws.com'
    return {
        plugins: [react(), tsconfigPaths(), isAnalyze && visualizer({open: true})].filter(Boolean),
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
            // Vite dev server proxy (only applies during `vite` / `pnpm dev`).
            proxy: {
                '/api': {
                    // Keep target without path; the incoming request path is forwarded as-is.
                    // This allows calling e.g. `/api/v1/...` (see BackendDatasource baseURL).
                    target: proxyTarget,
                    changeOrigin: true,
                    secure: true,
                    configure: (proxy) => {
                        proxy.on('error', (err, _req) => {
                            console.error('[proxy] error:', err.message)
                        })
                        proxy.on('proxyReq', (proxyReq, req) => {
                            console.log(`[proxy] ${req.method} ${req.url} -> ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`)
                        })
                    },
                }
            },
        }
    }
})
