import puppeteer from 'puppeteer'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'http'
import { readFileSync, existsSync } from 'fs'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const port = 4173

const routes = [
  '/',
  '/services',
  '/services/interior-package',
  '/services/exterior-package',
  '/services/full-wash-package',
  '/locations/guilford-county',
  '/locations/forsyth-county',
  '/locations/davidson-county',
  '/locations/randolph-county',
  '/locations/stokes-county',
  '/locations/surry-county',
  '/locations/yadkin-county',
  '/gallery',
  '/blog',
  '/videos',
  '/about',
  '/contact',
  '/booking',
]

// Start preview server
async function startServer() {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      let filePath = join(distDir, req.url === '/' ? 'index.html' : req.url)
      
      // Handle routes - serve index.html for all routes
      if (!filePath.includes('.')) {
        filePath = join(distDir, 'index.html')
      }
      
      if (existsSync(filePath) && !filePath.endsWith('.html')) {
        const content = readFileSync(filePath)
        const ext = filePath.split('.').pop()
        const contentType = {
          js: 'application/javascript',
          css: 'text/css',
          json: 'application/json',
          png: 'image/png',
          jpg: 'image/jpeg',
          svg: 'image/svg+xml',
        }[ext] || 'text/plain'
        
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(content)
      } else {
        const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf-8')
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(indexHtml)
      }
    })
    
    server.listen(port, () => {
      console.log(`Preview server running on http://localhost:${port}`)
      resolve(server)
    })
    
    server.on('error', reject)
  })
}

// Prerender routes
async function prerender() {
  console.log('Starting prerender...')
  
  const server = await startServer()
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  
  for (const route of routes) {
    try {
      console.log(`Prerendering ${route}...`)
      await page.goto(`http://localhost:${port}${route}`, {
        waitUntil: 'networkidle0',
      })
      
      const html = await page.content()
      const fileName = route === '/' ? 'index.html' : `${route}/index.html`
      const filePath = join(distDir, fileName)
      
      // Create directory if it doesn't exist
      const dir = dirname(filePath)
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true })
      }
      
      writeFileSync(filePath, html)
      console.log(`✓ Prerendered ${route}`)
    } catch (error) {
      console.error(`✗ Failed to prerender ${route}:`, error.message)
    }
  }
  
  await browser.close()
  server.close()
  console.log('Prerender complete!')
}

prerender().catch(console.error)
