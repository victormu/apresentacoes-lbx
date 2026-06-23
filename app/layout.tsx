import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Comunicação Pública — Da divulgação à transformação da gestão",
  description: "Como a comunicação ajuda a melhorar serviços, prevenir crises e gerar resultados para a população.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
