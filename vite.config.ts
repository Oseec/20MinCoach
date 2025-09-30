import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [react(), mode === 'development' && componentTagger()].filter(
    Boolean
  ),
  test: {
    globals: true, // usar describe, it, expect sin importar nada
    environment: 'jsdom', // simular navegador (para React o DOM APIs)
    coverage: {
      provider: 'istanbul', // o 'v8'
      reporter: ['text', 'html'],
    },
    setupFiles: './src/setupTests.ts', // inicialización global de tests
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
