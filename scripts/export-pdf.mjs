import puppeteer from 'puppeteer'
import { PDFDocument } from 'pdf-lib'
import { writeFileSync, mkdirSync, readFileSync, rmSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TOTAL_SLIDES = 21
const BASE_URL = 'http://localhost:3000'
const OUT = resolve(__dirname, '../presentation-lbx.pdf')
const TMP = resolve(__dirname, '../.pdf-tmp')

async function waitForImages(page) {
  await page.evaluate(() =>
    Promise.all(
      Array.from(document.querySelectorAll('img')).map(img => {
        if (img.complete && img.naturalHeight !== 0) return Promise.resolve()
        return new Promise(resolve => {
          img.addEventListener('load', resolve, { once: true })
          img.addEventListener('error', resolve, { once: true })
          setTimeout(resolve, 4000)
        })
      })
    )
  )
}

async function exportPdf() {
  if (existsSync(TMP)) rmSync(TMP, { recursive: true })
  mkdirSync(TMP)

  console.log('🚀 Abrindo browser...')
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 })

  console.log(`📄 Capturando ${TOTAL_SLIDES} slides...`)
  await page.goto(`${BASE_URL}?pdf=1`, { waitUntil: 'networkidle0' })
  await waitForImages(page)
  await new Promise(r => setTimeout(r, 800))

  const shotPaths = []

  for (let i = 0; i < TOTAL_SLIDES; i++) {
    await waitForImages(page)
    await new Promise(r => setTimeout(r, 500))

    const shotPath = resolve(TMP, `slide-${String(i).padStart(2, '0')}.jpg`)
    await page.screenshot({ type: 'jpeg', quality: 92, path: shotPath })
    shotPaths.push(shotPath)
    console.log(`  ✓ Slide ${String(i + 1).padStart(2, '0')}/${TOTAL_SLIDES}`)

    if (i < TOTAL_SLIDES - 1) {
      await page.keyboard.press('ArrowRight')
    }
  }

  await browser.close()

  console.log('\n🖨  Montando PDF com pdf-lib...')
  const pdfDoc = await PDFDocument.create()

  const W = 2560
  const H = 1440

  for (let i = 0; i < shotPaths.length; i++) {
    const jpegBytes = readFileSync(shotPaths[i])
    const jpegImage = await pdfDoc.embedJpg(jpegBytes)

    const page = pdfDoc.addPage([W, H])
    page.drawImage(jpegImage, { x: 0, y: 0, width: W, height: H })
    process.stdout.write(`  📃 Página ${i + 1}/${TOTAL_SLIDES}\r`)
  }

  const pdfBytes = await pdfDoc.save()
  writeFileSync(OUT, pdfBytes)

  rmSync(TMP, { recursive: true })

  const mb = (pdfBytes.byteLength / 1024 / 1024).toFixed(1)
  console.log(`\n\n✅ PDF gerado: ${OUT}`)
  console.log(`   ${TOTAL_SLIDES} slides · 16:9 landscape · ${mb}MB`)
}

exportPdf().catch((err) => {
  console.error('❌ Erro:', err.message)
  process.exit(1)
})
