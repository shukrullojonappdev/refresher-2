import terser from '@rollup/plugin-terser';
import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy';

export default [
  {
    input: 'src/content.js',
    output: {
      file: 'dist/content.js',
      format: 'cjs',
      plugins: [terser()]
    },
    plugins: [
      del({ targets: 'dist/*' }),
      copy({ targets: [{ src: 'public/*', dest: 'dist' }] })
    ]
  },
  {
    input: 'src/background.js',
    output: {
      file: 'dist/background/background.js',
      format: 'cjs',
      plugins: [terser()]
    }
  }
]