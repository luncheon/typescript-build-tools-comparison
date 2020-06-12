import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import html from '@rollup/plugin-html'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import sucrase from '@rollup/plugin-sucrase'
import path from 'path'
import { terser } from 'rollup-plugin-terser'

const name = path.basename(__dirname)

export default {
  input: '../src/index.tsx',
  output: {
    file: `../dist/${name}.js`,
    format: 'iife',
    sourcemap: false,
  },
  plugins: [
    resolve({ extensions: ['.ts', '.tsx', '.mjs', '.js'] }),
    commonjs(),
    alias({
      entries: {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
      },
    }),
    replace({ 'process.env.NODE_ENV': '"production"' }),
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['typescript', 'jsx'],
    }),
    terser({ warnings: true }),
    html({ fileName: `${name}.html` }),
  ],
  watch: { clearScreen: false },
}
