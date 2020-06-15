import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import html from '@rollup/plugin-html'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'

const transpiler = process.env.transpiler || 'typescript'
const name = `rollup-${transpiler}`

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
    transpiler === 'typescript' &&
      require('@rollup/plugin-typescript')({
        tsconfig: '../tsconfig.json',
        include: ['../src/**/*.ts', '../src/**/*.tsx'],
      }),
    transpiler === 'sucrase' &&
      require('@rollup/plugin-sucrase')({
        transforms: ['typescript', 'jsx'],
        include: ['../src/**/*.ts', '../src/**/*.tsx'],
      }),
    transpiler === 'esbuild' && require('rollup-plugin-esbuild')(),
    terser({ warnings: true }),
    html({ fileName: `${name}.html` }),
  ],
  watch: { clearScreen: false },
}
