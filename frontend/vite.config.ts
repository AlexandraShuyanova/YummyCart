import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: process.env.NODE_ENV === 'production' ? '/YummyCart/' : '/',
	server: {
		watch: {
			usePolling: true
		},
		proxy: {
			'/pizza-api': {
				target: 'http://backend:3001',
				changeOrigin: true
			}
		}
	}
});
