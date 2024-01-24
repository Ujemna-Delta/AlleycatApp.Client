import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react()],
        server: {
            proxy: {
                "/api": {
                    target: env.PERSISTENCE_URL ? env.PERSISTENCE_URL : "http://localhost:8000",
                    changeOrigin: true,
                    secure: env.PERSISTENCE_SECURE ? env.PERSISTENCE_SECURE == "true" : false
                }
            }
        }
    }
})
