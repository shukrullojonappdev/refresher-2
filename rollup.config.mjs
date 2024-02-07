import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/content.js',
    output: {
      file: 'dist/content.js',
      format: 'cjs',
      plugins: [terser()]
    }
  },
  {
    input: 'src/background.js',
    output: {
      file: 'dist/background.js',
      format: 'cjs',
      plugins: [terser()]
    }
  },
]