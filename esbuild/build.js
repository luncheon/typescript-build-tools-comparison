const fs = require('fs')
const path = require('path')
const esbuild = require('esbuild')

const watching = process.argv.includes('-w')
const name = path.basename(__dirname)
const htmlContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
  </head>
  <body>
    <script src="${name}.js"></script>
  </body>
</html>
`

const build = async () => {
  const startedAt = Date.now()
  const entry = path.resolve(__dirname, '../src/index.tsx')
  const outfile = path.resolve(__dirname, `../dist/${name}.js`)
  console.log(`Bundling ${entry}`)
  try {
    await esbuild.build({
      stdio: 'inherit',
      entryPoints: [entry],
      outfile,
      minify: true,
      bundle: true,
      define: { 'process.env.NODE_ENV': '"production"' },
    })
  } catch (error) {
    console.error(error)
    if (!watching) {
      process.exit(1)
    }
  }
  await fs.promises.writeFile(`../dist/${name}.html`, htmlContent, 'utf8')
  console.log(`Bundled ${path.resolve(__dirname, `../dist/${name}.js`)} in ${Date.now() - startedAt} [ms]`)
}

build().then(() => {
  if (watching) {
    console.log('Watching...')
    const sane = require('sane')
    sane('../src', { glob: ['**/*.ts', '**/*.tsx'] }).on('change', build)
  }
})
