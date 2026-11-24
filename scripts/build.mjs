import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import pkg from '../package.json' with { type: 'json' }

await build({
  absWorkingDir: fileURLToPath(new URL('..', import.meta.url)),
  entryPoints: ['src/client.js'],
  outfile: 'dist/client.js',
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  loader: { '.css': 'text' },
  banner: {
    js: `window.__ModuleLoader__.load({ id: ${JSON.stringify(pkg.name)}, factory: () => { const module = { exports: {} };`,
  },
  footer: { js: 'return module.exports; } });' },
})
