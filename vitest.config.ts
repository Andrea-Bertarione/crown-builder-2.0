
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
    plugins: [svelte({ hot: !process.env.VITEST })],
    resolve: {
        alias: {
            $lib: path.resolve('./src/lib'),
            $components: path.resolve('./src/components')
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: [],
        pool: 'forks',
        include: ['src/lib/**/*.test.ts', 'src/**/*.test.ts'],
        exclude: ['node_modules', '.svelte-kit', 'build'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'src/lib/__test__/',
                '.svelte-kit/',
                'build/'
            ]
        }
    }
});