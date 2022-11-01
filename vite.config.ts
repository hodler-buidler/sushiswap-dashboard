import eslintPlugin from '@nabla/vite-plugin-eslint'
import ViteRequireContext from '@originjs/vite-plugin-require-context'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import istanbul from 'rollup-plugin-istanbul'
import { defineConfig } from 'vite'
import vitePluginRequire from 'vite-plugin-require'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => ({
  base: import.meta?.env?.PROD ? '/sushi-dashboard/' : './',
  resolve: {
    alias: {
      process: path.resolve(__dirname, 'polyfills/process-es6.js'),
      'readable-stream': 'vite-compatible-readable-stream',
    },
  },
  plugins: [
    vitePluginRequire(),
    ViteRequireContext(),
    tsconfigPaths(),
    react(),
    eslintPlugin(),
    mode === 'test' &&
      istanbul({
        include: ['src/**/*.tsx']
      })
  ]
}))
