import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config({
	path: '../../.env'
});

export default defineConfig({
	plugins: [react()],
	server: {
		port: Number(process.env.CLIENT_PORT),
		strictPort: true
	},
	envDir: '../../',
	envPrefix: 'PUBLIC_',
	resolve: {
		alias: {
			$src: './src',
			_packages: '../../packages'
		}
	}
});
