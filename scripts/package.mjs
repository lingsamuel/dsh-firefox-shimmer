import { execFileSync } from 'node:child_process'
import { mkdir, readdir, rm, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import pkg from '../package.json' with { type: 'json' }

const root = fileURLToPath(new URL('..', import.meta.url))
const artifacts = join(root, 'artifacts')
const cache = join(root, '.runtime', 'npm-cache')
await mkdir(artifacts, { recursive: true })
const archive = execFileSync(process.execPath, [
  process.env.npm_execpath, 'pack', '--quiet', '--ignore-scripts', '--pack-destination', artifacts, '--cache', cache,
], { cwd: root, encoding: 'utf8' }).trim()

// 清理本插件的旧归档，最多保留本次构建和最近三次历史构建。
const pattern = new RegExp(`^${RegExp.escape(pkg.name)}-[0-9][\\w.+-]*\\.tgz$`)
const previous = await Promise.all((await readdir(artifacts, { withFileTypes: true }))
  .filter(file => file.isFile() && file.name !== archive && pattern.test(file.name))
  .map(async file => {
    const path = join(artifacts, file.name)
    return { path, modified: (await stat(path)).mtimeMs }
  }))
previous.sort((a, b) => b.modified - a.modified)
for (const { path } of previous.slice(3)) await rm(path)
console.log(join(artifacts, archive))
