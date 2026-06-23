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

async function exportPdf() {
  if (existsSync(TMP)) rmSync(TMP, { recursive: true })
  mkdirSync(TMP)

  console.log('🚀 Abrindo browser...')
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  // 1920×1080 px — matches 16:9 slide ratio
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 })

  console.log(`📄 Capturando ${TOTAL_SLIDES} slides...`)
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' })
  await new Promise(r => setTimeout(r, 1500))

  const shotPaths = []

  for (let i = 0; i < TOTAL_SLIDES; i++) {
    await new Promise(r => setTimeout(r, 700))

    const shotPath = resolve(TMP, `slide-${String(i).padStart(2, '0')}.jpg`)
    await page.screenshot({ type: 'jpeg', quality: 92, path: shotPath })
    shotPaths.push(shotPath)
    console.log(`  ✓ Slide ${String(i + 1).padStart(2, '0')}/${TOTAL_SLIDES}`)

    if (i < TOTAL_SLIDES - 1) {
      await page.keyboard.press('ArrowRight')
    }
  }

  await browser.close()

  // Build PDF with pdf-lib from JPEG screenshots
  console.log('\n🖨  Montando PDF com pdf-lib...')
  const pdfDoc = await PDFDocument.create()

  // A4 landscape in points (1pt = 1/72 inch)
  // 16:9 at A4 width: 841.89 × 473.56 pt
  const W = 841.89
  const H = W * (9 / 16)

  for (let i = 0; i < shotPaths.length; i++) {
    const jpegBytes = readFileSync(shotPaths[i])
    const jpegImage = await pdfDoc.embedJpg(jpegBytes)

    const page = pdfDoc.addPage([W, H])
    page.drawImage(jpegImage, { x: 0, y: 0, width: W, height: H })
    process.stdout.write(`  📃 Página ${i + 1}/${TOTAL_SLIDES}\r`)
  }

  const pdfBytes = await pdfDoc.save()
  writeFileSync(OUT, pdfBytes)

  // Cleanup
  rmSync(TMP, { recursive: true })

  const mb = (pdfBytes.byteLength / 1024 / 1024).toFixed(1)
  console.log(`\n\n✅ PDF gerado: ${OUT}`)
  console.log(`   ${TOTAL_SLIDES} slides · 16:9 landscape · ${mb}MB`)
}

exportPdf().catch((err) => {
  console.error('❌ Erro:', err.message)
  process.exit(1)
})
