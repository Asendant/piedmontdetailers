import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const projectRoot = process.cwd()
const distDir = path.join(projectRoot, 'dist')
const serverEntry = path.join(distDir, 'server', 'entry-server.js')

const routesToPrerender = [
  '/',
  '/services',
  '/gallery',
  '/blog',
  '/videos',
  '/about',
  '/contact',
  '/booking',
  // This is disallowed in robots.txt, but prerendering keeps deep links working on static hosts.
  '/admin',
]

const templatePath = path.join(distDir, 'index.html')
const template = await fs.readFile(templatePath, 'utf-8')

const { render } = await import(pathToFileURL(serverEntry).href)

const writeRouteHtml = async (route) => {
  const appHtml = render(route)
  const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  )

  const outDir =
    route === '/' ? distDir : path.join(distDir, route.replace(/^\//, ''))
  await fs.mkdir(outDir, { recursive: true })
  await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf-8')
}

await Promise.all(routesToPrerender.map(writeRouteHtml))

// Provide a static-host friendly 404 fallback that still boots the SPA and renders <NotFound />.
// Many static hosts (Netlify, GitHub Pages, S3/CloudFront) will serve /404.html on unknown routes.
const notFoundHtml = template.replace(
  '<div id="root"></div>',
  `<div id="root">${render('/__notfound__')}</div>`,
)
await fs.writeFile(path.join(distDir, '404.html'), notFoundHtml, 'utf-8')

