import resolve from 'rollup-plugin-node-resolve';


export default {
  input: ['index.js'],
  output: {
    file: 'dist/index.js', 
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve()
  ]
};
