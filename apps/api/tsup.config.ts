import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'], // 'cjs' for Node.js
  clean: true,
  bundle: true,
  sourcemap: true,
  splitting: false,
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
});
