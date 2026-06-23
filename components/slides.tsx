'use client'

import Image from 'next/image'
import type { Slide } from '@/lib/slides'

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  bg: '#0f0f0d',
  surface: 'rgba(247,247,244,0.05)',
  surfaceMid: 'rgba(247,247,244,0.08)',
  text: '#f7f7f4',
  body: 'rgba(247,247,244,0.70)',
  muted: 'rgba(247,247,244,0.40)',
  accent: '#3D7FFF',
  accentDim: 'rgba(61,127,255,0.12)',
  gold: '#c08532',
  goldDim: 'rgba(192,133,50,0.10)',
  err: '#cf2d56',
  errDim: 'rgba(207,45,86,0.08)',
  line: 'rgba(247,247,244,0.10)',
  lineStrong: 'rgba(247,247,244,0.18)',
  font: 'var(--font-inter), system-ui, -apple-system, sans-serif',
}

// ── Atoms ─────────────────────────────────────────────────────────────────────
function Label({ children }: { children: string }) {
  return (
    <span style={{ fontFamily: T.font, fontSize: 11, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' as const, color: T.accent, display: 'block', marginBottom: 18 }}>
      {children}
    </span>
  )
}

function VRule() {
  return <div style={{ width: 1, background: T.line, alignSelf: 'stretch', flexShrink: 0 }} />
}

function HRule() {
  return <div style={{ height: 1, background: T.line, width: '100%', margin: '16px 0' }} />
}

function QuoteBlock({ text }: { text: string }) {
  return (
    <blockquote style={{ fontFamily: T.font, fontSize: 17, fontWeight: 300, fontStyle: 'italic', color: T.gold, lineHeight: 1.65, borderLeft: `2px solid ${T.gold}`, paddingLeft: 20, marginTop: 28 }}>
      {text}
    </blockquote>
  )
}

// ── Slide components ──────────────────────────────────────────────────────────

export function CoverSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {slide.image && (
        <>
          <Image src={slide.image} alt="" fill style={{ objectFit: 'cover', opacity: 0.35 }} priority />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(150deg, rgba(15,15,13,0.88) 0%, rgba(15,15,13,0.55) 100%)' }} />
        </>
      )}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '0 10%', textAlign: 'center', flexDirection: 'column', gap: 32 }}>
        <h1 style={{ fontFamily: T.font, fontSize: 'clamp(28px,5vw,76px)', fontWeight: 300, letterSpacing: '-2px', lineHeight: 1.15, color: T.text, maxWidth: 860 }}>
          {slide.title}
        </h1>
        <div style={{ width: 48, height: 2, background: T.accent }} />
      </div>
    </div>
  )
}

export function IntroSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', padding: '60px 8%' }}>
      <div style={{ flex: '0 0 58%', paddingRight: 72 }}>
        {slide.label && <Label>{slide.label}</Label>}
        <h1 style={{ fontFamily: T.font, fontSize: 'clamp(26px,3.5vw,52px)', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.15, color: T.text, marginBottom: 24 }}>
          {slide.title}
        </h1>
        <HRule />
        <p style={{ fontFamily: T.font, fontSize: 17, fontWeight: 400, lineHeight: 1.7, color: T.body }}>
          {slide.subtitle}
        </p>
      </div>
      <VRule />
      <div style={{ flex: 1, paddingLeft: 60 }}>
        <p style={{ fontFamily: T.font, fontSize: 21, fontWeight: 300, lineHeight: 1.65, color: T.text }}>
          {slide.body}
        </p>
      </div>
    </div>
  )
}

export function ImageListSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <div style={{ flex: '0 0 44%', position: 'relative', overflow: 'hidden' }}>
        {slide.image && <Image src={slide.image} alt="" fill style={{ objectFit: 'cover', opacity: 0.55 }} />}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 40%, rgba(15,15,13,1) 100%)' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 72px 60px 56px' }}>
        {slide.label && <Label>{slide.label}</Label>}
        <h2 style={{ fontFamily: T.font, fontSize: 'clamp(22px,3vw,44px)', fontWeight: 400, letterSpacing: '-0.75px', lineHeight: 1.2, color: T.text, marginBottom: 32 }}>
          {slide.title}
        </h2>
        <p style={{ fontFamily: T.font, fontSize: 12, color: T.muted, marginBottom: 20, letterSpacing: '2px', textTransform: 'uppercase' as const, fontWeight: 600 }}>
          Muitas equipes acreditam que comunicação é:
        </p>
        <ol style={{ listStyle: 'none', padding: 0, marginBottom: 28 }}>
          {slide.items?.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
              <span style={{ fontFamily: T.font, fontSize: 30, fontWeight: 200, color: T.accent, lineHeight: 1, minWidth: 48 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontFamily: T.font, fontSize: 20, fontWeight: 400, color: T.text, borderBottom: `1px solid ${T.line}`, paddingBottom: 12, flex: 1 }}>
                {item}
              </span>
            </li>
          ))}
        </ol>
        {slide.body && (
          <p style={{ fontFamily: T.font, fontSize: 16, lineHeight: 1.65, color: T.body, borderLeft: `2px solid ${T.accent}`, paddingLeft: 20 }}>
            {slide.body}
          </p>
        )}
      </div>
    </div>
  )
}

export function FiveRolesSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 8%', height: '100%', gap: 32 }}>
      <div>
        {slide.label && <Label>{slide.label}</Label>}
        <h2 style={{ fontFamily: T.font, fontSize: 'clamp(20px,2.8vw,40px)', fontWeight: 400, letterSpacing: '-0.75px', color: T.text }}>
          {slide.title}
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
        {slide.roles?.map((role, i) => (
          <div key={i} style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 8, padding: '22px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span style={{ fontFamily: T.font, fontSize: 38, fontWeight: 200, color: T.accent, lineHeight: 1 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontFamily: T.font, fontSize: 14, fontWeight: 400, color: T.text, lineHeight: 1.45 }}>
              {role}
            </span>
          </div>
        ))}
      </div>
      {slide.quote && (
        <div style={{ background: T.accentDim, border: `1px solid rgba(245,78,0,0.20)`, borderRadius: 8, padding: '22px 28px' }}>
          <p style={{ fontFamily: T.font, fontSize: 19, fontWeight: 300, fontStyle: 'italic', color: T.text, lineHeight: 1.55 }}>
            &ldquo;{slide.quote}&rdquo;
          </p>
        </div>
      )}
    </div>
  )
}

export function FlowSlide({ slide }: { slide: Slide }) {
  const count = slide.steps?.length ?? 0
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 7%', gap: 40, overflow: 'hidden' }}>
      {slide.image && (
        <>
          <Image src={slide.image} alt="" fill style={{ objectFit: 'cover', opacity: 0.06 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(15,15,13,0.3) 0%, rgba(15,15,13,0.95) 75%)' }} />
        </>
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {slide.label && <Label>{slide.label}</Label>}
        <h2 style={{ fontFamily: T.font, fontSize: 'clamp(22px,3vw,44px)', fontWeight: 400, letterSpacing: '-1px', color: T.text }}>
          {slide.title}
        </h2>
      </div>
      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: `repeat(${count}, 1fr)`, gap: 0, alignItems: 'start' }}>
        {slide.steps?.map((step, i) => {
          const isFirst = i === 0
          const isLast = i === count - 1
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', minWidth: 0 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center' as const, padding: '0 4px' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: isFirst ? T.accent : T.surface, border: `1px solid ${isFirst ? T.accent : T.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: isFirst ? `0 0 20px rgba(61,127,255,0.35)` : 'none' }}>
                  <span style={{ fontFamily: T.font, fontSize: 12, fontWeight: 700, color: isFirst ? '#fff' : T.muted }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div style={{ fontFamily: T.font, fontSize: 'clamp(12px,1.1vw,15px)', fontWeight: isFirst ? 600 : 400, color: isFirst ? T.accent : T.text, lineHeight: 1.35 }}>
                  {step}
                </div>
                {slide.description?.[i] && (
                  <div style={{ fontFamily: T.font, fontSize: 'clamp(10px,0.9vw,12px)', color: T.muted, lineHeight: 1.4 }}>
                    {slide.description[i]}
                  </div>
                )}
              </div>
              {!isLast && (
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: 22, flexShrink: 0, width: 20 }}>
                  <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                    <path d="M0 5H16M16 5L11 1M16 5L11 9" stroke="rgba(247,247,244,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function MisalignmentSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 8%', height: '100%', gap: 24 }}>
      {slide.label && <Label>{slide.label}</Label>}
      <h2 style={{ fontFamily: T.font, fontSize: 'clamp(20px,2.8vw,38px)', fontWeight: 400, letterSpacing: '-0.75px', color: T.text }}>
        {slide.title}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {slide.voices?.map((voice, i) => (
          <div key={i} style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 8, padding: '18px 22px' }}>
            <span style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' as const, color: T.muted, marginBottom: 8, fontFamily: T.font }}>
              {['Secretaria', 'Secom', 'Prefeito'][i]}
            </span>
            <span style={{ fontFamily: T.font, fontSize: 16, color: T.body, lineHeight: 1.5 }}>{voice}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, height: 1, background: T.line }} />
        <span style={{ fontFamily: T.font, fontSize: 11, color: T.muted, letterSpacing: '2px', textTransform: 'uppercase' as const }}>Resultado</span>
        <div style={{ flex: 1, height: 1, background: T.line }} />
      </div>
      <div style={{ display: 'flex', gap: 14 }}>
        {slide.consequences?.map((c, i) => (
          <div key={i} style={{ flex: 1, background: T.errDim, border: `1px solid rgba(207,45,86,0.22)`, borderRadius: 8, padding: '14px 18px', fontFamily: T.font, fontSize: 16, fontWeight: 500, color: T.err, textAlign: 'center' as const }}>
            ✕ {c}
          </div>
        ))}
      </div>
      {slide.quote && <QuoteBlock text={slide.quote} />}
    </div>
  )
}

export function CrisisActionSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', padding: '60px 8%', gap: 56, alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        {slide.label && <Label>{slide.label}</Label>}
        <h2 style={{ fontFamily: T.font, fontSize: 'clamp(20px,2.5vw,36px)', fontWeight: 400, letterSpacing: '-0.5px', color: T.text, marginBottom: 24 }}>
          {slide.title}
        </h2>
        <div style={{ background: T.accentDim, border: `1px solid rgba(245,78,0,0.22)`, borderRadius: 8, padding: '14px 20px', fontFamily: T.font, fontSize: 16, fontWeight: 500, color: T.accent, marginBottom: 24 }}>
          ⚠ {slide.rule}
        </div>
        <p style={{ fontFamily: T.font, fontSize: 11, color: T.muted, marginBottom: 14, letterSpacing: '2px', textTransform: 'uppercase' as const, fontWeight: 600 }}>
          Primeiro:
        </p>
        {slide.steps?.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 24, height: 24, borderRadius: 4, background: T.surface, border: `1px solid ${T.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: T.accent }}>{i + 1}</span>
            </div>
            <span style={{ fontFamily: T.font, fontSize: 17, color: T.text }}>{step}</span>
          </div>
        ))}
      </div>
      <VRule />
      <div style={{ flex: '0 0 300px' }}>
        <p style={{ fontFamily: T.font, fontSize: 11, color: T.muted, marginBottom: 24, letterSpacing: '2px', textTransform: 'uppercase' as const, fontWeight: 600 }}>
          Perguntas-chave
        </p>
        {slide.questions?.map((q, i) => (
          <div key={i} style={{ fontFamily: T.font, fontSize: 26, fontWeight: 300, letterSpacing: '-0.25px', color: T.text, borderBottom: `1px solid ${T.line}`, paddingBottom: 20, marginBottom: 20 }}>
            {q}
          </div>
        ))}
      </div>
    </div>
  )
}

export function DataGridSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '44px 8%', height: '100%', gap: 24 }}>
      <div>
        {slide.label && <Label>{slide.label}</Label>}
        <h2 style={{ fontFamily: T.font, fontSize: 'clamp(18px,2.5vw,34px)', fontWeight: 400, letterSpacing: '-0.5px', color: T.text, marginBottom: 8 }}>
          {slide.title}
        </h2>
        <p style={{ fontFamily: T.font, fontSize: 16, color: T.body }}>{slide.intro}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {slide.sectors?.map((sector, i) => (
          <div key={i} style={{ background: T.surface, border: `1px solid ${T.line}`, borderTop: `2px solid ${T.accent}`, borderRadius: 8, padding: '22px 22px' }}>
            <h3 style={{ fontFamily: T.font, fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' as const, color: T.accent, marginBottom: 14 }}>
              {sector.name}
            </h3>
            {sector.items.map((item, j) => (
              <p key={j} style={{ fontFamily: T.font, fontSize: 15, color: T.body, marginBottom: 8, paddingBottom: 8, borderBottom: j < sector.items.length - 1 ? `1px solid ${T.line}` : 'none' }}>
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
      {slide.quote && <QuoteBlock text={slide.quote} />}
    </div>
  )
}

export function XraySlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 8%', height: '100%', gap: 36 }}>
      {slide.label && <Label>{slide.label}</Label>}
      <h2 style={{ fontFamily: T.font, fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 400, letterSpacing: '-1px', color: T.text }}>
        {slide.title}
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12 }}>
        {slide.items?.map((item, i) => (
          <div key={i} style={{ background: T.surface, border: `1px solid ${T.lineStrong}`, borderRadius: 999, padding: '13px 26px', fontFamily: T.font, fontSize: 18, fontWeight: 400, color: T.text }}>
            {item}
          </div>
        ))}
      </div>
      {slide.statement && (
        <div style={{ borderLeft: `3px solid ${T.accent}`, paddingLeft: 24, fontFamily: T.font, fontSize: 22, fontWeight: 300, color: T.text, lineHeight: 1.55 }}>
          {slide.statement}
        </div>
      )}
    </div>
  )
}

export function ResearchSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', padding: '60px 8%', gap: 56, alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        {slide.label && <Label>{slide.label}</Label>}
        <h2 style={{ fontFamily: T.font, fontSize: 'clamp(20px,2.5vw,36px)', fontWeight: 400, letterSpacing: '-0.5px', color: T.text, marginBottom: 20 }}>
          {slide.title}
        </h2>
        <p style={{ fontFamily: T.font, fontSize: 17, fontWeight: 300, fontStyle: 'italic', color: T.body, marginBottom: 12 }}>
          {slide.question}
        </p>
        {slide.body && (
          <p style={{ fontFamily: T.font, fontSize: 16, fontWeight: 400, color: T.text, marginBottom: 20 }}>
            {slide.body}
          </p>
        )}
        <p style={{ fontFamily: T.font, fontSize: 11, color: T.muted, letterSpacing: '2px', textTransform: 'uppercase' as const, fontWeight: 600, marginBottom: 14 }}>
          A pesquisa revela:
        </p>
        {slide.discoveries?.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent, flexShrink: 0 }} />
            <span style={{ fontFamily: T.font, fontSize: 16, color: T.text }}>{d}</span>
          </div>
        ))}
      </div>
      <VRule />
      <div style={{ flex: '0 0 42%' }}>
        <div style={{ background: T.goldDim, border: `1px solid rgba(192,133,50,0.22)`, borderRadius: 12, padding: '36px 30px' }}>
          <p style={{ fontFamily: T.font, fontSize: 'clamp(16px,2vw,24px)', fontWeight: 300, fontStyle: 'italic', color: T.gold, lineHeight: 1.65 }}>
            {slide.quote}
          </p>
        </div>
      </div>
    </div>
  )
}

export function VennSlide({ slide }: { slide: Slide }) {
  const [c0, c1, c2] = slide.circles ?? ['', '', '']
  // SVG viewBox 600×500. Three circles in triangle formation.
  // cx/cy for centers, r = radius
  const r = 150
  const cx = [180, 420, 300] // left, right, top
  const cy = [310, 310, 150]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '40px 8%', gap: 16 }}>
      {slide.label && <Label>{slide.label}</Label>}
      <h2 style={{ fontFamily: T.font, fontSize: 'clamp(20px,2.6vw,38px)', fontWeight: 400, letterSpacing: '-0.75px', color: T.text, textAlign: 'center' as const }}>
        {slide.title}
      </h2>

      {/* Venn SVG + floating labels */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 700, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 600 500" style={{ width: '100%', maxHeight: 360, overflow: 'visible' }}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Three circles */}
          {[0, 1, 2].map(i => (
            <circle key={i} cx={cx[i]} cy={cy[i]} r={r}
              fill={`rgba(61,127,255,0.08)`}
              stroke="rgba(61,127,255,0.35)"
              strokeWidth="1.5"
            />
          ))}

          {/* Center intersection highlight */}
          <circle cx={300} cy={268} r={42}
            fill="rgba(61,127,255,0.18)"
            stroke="rgba(61,127,255,0.5)"
            strokeWidth="1"
          />

          {/* Circle labels — inside each circle, away from intersection zone */}
          {/* c0: Necessidade da população — left circle, far-left quadrant */}
          {c0.split(' ').map((word, wi, arr) => {
            const mid = Math.ceil(arr.length / 2)
            const line1 = arr.slice(0, mid).join(' ')
            const line2 = arr.slice(mid).join(' ')
            if (wi !== 0) return null
            return (
              <g key="c0">
                <text x={90} y={cy[0] + 6} textAnchor="middle"
                  fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="400"
                  fill="rgba(247,247,244,0.80)">{line1}</text>
                {line2 && (
                  <text x={90} y={cy[0] + 24} textAnchor="middle"
                    fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="400"
                    fill="rgba(247,247,244,0.80)">{line2}</text>
                )}
              </g>
            )
          })}
          {/* c1: Prioridade da gestão — top circle, upper quadrant (y ~ 70-90) */}
          {(() => {
            const words = c1.split(' ')
            const mid = Math.ceil(words.length / 2)
            return (
              <g>
                <text x={300} y={72} textAnchor="middle"
                  fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="400"
                  fill="rgba(247,247,244,0.80)">{words.slice(0, mid).join(' ')}</text>
                <text x={300} y={90} textAnchor="middle"
                  fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="400"
                  fill="rgba(247,247,244,0.80)">{words.slice(mid).join(' ')}</text>
              </g>
            )
          })()}
          {/* c2: Capacidade de entrega — right circle, far-right quadrant */}
          {(() => {
            const words = c2.split(' ')
            const mid = Math.ceil(words.length / 2)
            return (
              <g>
                <text x={510} y={cy[1] + 6} textAnchor="middle"
                  fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="400"
                  fill="rgba(247,247,244,0.80)">{words.slice(0, mid).join(' ')}</text>
                <text x={510} y={cy[1] + 24} textAnchor="middle"
                  fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="400"
                  fill="rgba(247,247,244,0.80)">{words.slice(mid).join(' ')}</text>
              </g>
            )
          })()}

          {/* Center label pill */}
          <rect x="168" y="252" width="264" height="34" rx="17"
            fill="#3D7FFF" filter="url(#glow)" opacity="0.95" />
          <text x="300" y="274" textAnchor="middle"
            fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="600"
            fill="#ffffff" letterSpacing="0.5">{slide.intersection}</text>
        </svg>
      </div>
    </div>
  )
}

export function ChannelsSlide({ slide }: { slide: Slide }) {
  const cols = [
    { label: 'Externos', items: slide.external ?? [], color: T.accent },
    { label: 'Internos', items: slide.internal ?? [], color: T.gold },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 8%', height: '100%', gap: 28 }}>
      {slide.label && <Label>{slide.label}</Label>}
      <h2 style={{ fontFamily: T.font, fontSize: 'clamp(22px,2.8vw,40px)', fontWeight: 400, letterSpacing: '-0.75px', color: T.text }}>
        {slide.title}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        {cols.map((col) => (
          <div key={col.label}>
            <p style={{ fontFamily: T.font, fontSize: 11, fontWeight: 600, color: col.color, letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: 16 }}>
              {col.label}
            </p>
            {col.items.map((item, j) => (
              <div key={j} style={{ fontFamily: T.font, fontSize: 17, color: T.text, borderBottom: `1px solid ${T.line}`, paddingBottom: 11, marginBottom: 11 }}>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
      {slide.message && (
        <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 8, padding: '14px 22px', fontFamily: T.font, fontSize: 17, color: T.text }}>
          {slide.message}
        </div>
      )}
    </div>
  )
}

export function CalendarSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '44px 8%', height: '100%', gap: 22 }}>
      {slide.label && <Label>{slide.label}</Label>}
      <h2 style={{ fontFamily: T.font, fontSize: 'clamp(22px,2.8vw,40px)', fontWeight: 400, letterSpacing: '-0.75px', color: T.text }}>
        {slide.title}
      </h2>
      <p style={{ fontFamily: T.font, fontSize: 16, color: T.body }}>{slide.intro}</p>
      <div>
        {slide.rows?.map((row, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'center', gap: 24, padding: '18px 0', borderTop: `1px solid ${T.line}` }}>
            <span style={{ fontFamily: T.font, fontSize: 11, fontWeight: 600, color: T.accent, letterSpacing: '2px', textTransform: 'uppercase' as const }}>
              {row.sector}
            </span>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
              {row.items.map((item, j) => (
                <span key={j} style={{ fontFamily: T.font, fontSize: 14, color: T.text, background: T.surface, border: `1px solid ${T.line}`, borderRadius: 6, padding: '7px 14px' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${T.line}` }} />
      </div>
      {slide.message && (
        <p style={{ fontFamily: T.font, fontSize: 19, fontWeight: 300, color: T.text }}>{slide.message}</p>
      )}
    </div>
  )
}

export function PlanFlowSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', padding: '60px 8%', gap: 80, alignItems: 'center' }}>
      <div style={{ flex: '0 0 38%' }}>
        {slide.label && <Label>{slide.label}</Label>}
        <h2 style={{ fontFamily: T.font, fontSize: 'clamp(24px,3vw,48px)', fontWeight: 400, letterSpacing: '-1px', color: T.text, lineHeight: 1.2, marginBottom: 14 }}>
          {slide.title}
        </h2>
        <p style={{ fontFamily: T.font, fontSize: 15, color: T.body }}>{slide.subtitle}</p>
      </div>
      <div style={{ flex: 1 }}>
        {slide.steps?.map((step, i) => {
          const isLast = i === (slide.steps?.length ?? 0) - 1
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 18 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: i === 0 ? T.accent : T.surface, border: `1px solid ${i === 0 ? T.accent : T.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: T.font, fontSize: 13, fontWeight: 600, color: i === 0 ? '#fff' : T.muted }}>{i + 1}</span>
                </div>
                {!isLast && <div style={{ width: 1, flex: 1, background: T.line, minHeight: 18 }} />}
              </div>
              <div style={{ paddingBottom: isLast ? 0 : 22, paddingTop: 6 }}>
                <span style={{ fontFamily: T.font, fontSize: 22, fontWeight: i === 0 ? 500 : 400, color: i === 0 ? T.accent : T.text, letterSpacing: '-0.25px' }}>
                  {step}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function MetricsSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 8%', height: '100%', gap: 28 }}>
      {slide.label && <Label>{slide.label}</Label>}
      <h2 style={{ fontFamily: T.font, fontSize: 'clamp(22px,2.8vw,40px)', fontWeight: 400, letterSpacing: '-0.75px', color: T.text }}>
        {slide.title}
      </h2>
      <p style={{ fontFamily: T.font, fontSize: 16, color: T.body }}>{slide.intro}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12 }}>
        {slide.indicators?.map((ind, i) => (
          <div key={i} style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 8, padding: '14px 22px', fontFamily: T.font, fontSize: 16, fontWeight: 400, color: T.text }}>
            {ind}
          </div>
        ))}
      </div>
      {slide.quote && <QuoteBlock text={slide.quote} />}
    </div>
  )
}

export function TransformSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', padding: '60px 8%', gap: 72, alignItems: 'center' }}>
      <div style={{ flex: '0 0 44%' }}>
        {slide.label && <Label>{slide.label}</Label>}
        <h2 style={{ fontFamily: T.font, fontSize: 'clamp(22px,3vw,44px)', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.2, color: T.text, marginBottom: 18 }}>
          {slide.title}
        </h2>
        <p style={{ fontFamily: T.font, fontSize: 19, fontWeight: 300, fontStyle: 'italic', color: T.accent }}>
          {slide.subtitle}
        </p>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {slide.points?.map((point, i) => (
          <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', borderBottom: `1px solid ${T.line}`, paddingBottom: 18, marginBottom: 18 }}>
            <span style={{ fontFamily: T.font, fontSize: 40, fontWeight: 200, color: T.accent, lineHeight: 1, minWidth: 52, paddingTop: 4 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <p style={{ fontFamily: T.font, fontSize: 19, fontWeight: 400, color: T.text, lineHeight: 1.5, flex: 1, paddingTop: 8 }}>
              {point}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CaseStudySlide({ slide }: { slide: Slide }) {
  const cols = [
    { title: 'Problema', items: slide.problem ?? [], color: T.err, dim: T.errDim },
    { title: slide.solution ? 'Solução' : 'Ação', items: slide.solution ? [slide.solution, ...(slide.action ?? [])] : (slide.action ?? []), color: T.accent, dim: T.accentDim },
    { title: 'Resultado', items: slide.result ? [slide.result] : [], color: T.gold, dim: T.goldDim },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '44px 8%', height: '100%', gap: 28 }}>
      <div>
        {slide.label && <Label>{slide.label}</Label>}
        <h2 style={{ fontFamily: T.font, fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 400, letterSpacing: '-1px', color: T.text }}>
          {slide.title}
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {cols.map((col, i) => (
          <div key={i} style={{ background: col.dim, border: `1px solid ${col.color}40`, borderTop: `2px solid ${col.color}`, borderRadius: 8, padding: '22px 22px' }}>
            <h3 style={{ fontFamily: T.font, fontSize: 11, fontWeight: 600, color: col.color, letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: 14 }}>
              {col.title}
            </h3>
            {col.items.map((item, j) => (
              <p key={j} style={{ fontFamily: T.font, fontSize: 15, color: T.text, marginBottom: 8, lineHeight: 1.5 }}>
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
      {slide.quote && <QuoteBlock text={slide.quote} />}
    </div>
  )
}

export function ActionCycleSlide({ slide }: { slide: Slide }) {
  const count = slide.actions?.length ?? 0
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 5%', height: '100%', gap: 24, textAlign: 'center' as const }}>
      {slide.label && <Label>{slide.label}</Label>}
      <h2 style={{ fontFamily: T.font, fontSize: 'clamp(20px,2.4vw,36px)', fontWeight: 400, letterSpacing: '-0.75px', color: T.text }}>
        {slide.title}
      </h2>
      <p style={{ fontFamily: T.font, fontSize: 15, color: T.body }}>{slide.intro}</p>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${count}, 1fr)`, gap: 0, width: '100%', maxWidth: 1100, alignItems: 'center' }}>
        {slide.actions?.map((action, i) => {
          const isFirst = i === 0
          const isLast = i === count - 1
          const isEdge = isFirst || isLast
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
              <div style={{ flex: 1, background: isEdge ? T.accentDim : T.surface, border: `1px solid ${isEdge ? `${T.accent}44` : T.line}`, borderRadius: 8, padding: '14px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: T.font, fontSize: 10, fontWeight: 700, color: T.accent, letterSpacing: '1px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: T.font, fontSize: 'clamp(13px,1.2vw,16px)', fontWeight: isEdge ? 500 : 400, color: T.text, lineHeight: 1.3 }}>{action}</span>
              </div>
              {!isLast && (
                <div style={{ width: 12, height: 1, background: T.line, flexShrink: 0 }} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function CommandmentsSlide({ slide }: { slide: Slide }) {
  const half = Math.ceil((slide.items?.length ?? 0) / 2)
  const left = slide.items?.slice(0, half) ?? []
  const right = slide.items?.slice(half) ?? []
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '44px 8%', height: '100%', gap: 24 }}>
      {slide.label && <Label>{slide.label}</Label>}
      <h2 style={{ fontFamily: T.font, fontSize: 'clamp(18px,2.5vw,34px)', fontWeight: 400, letterSpacing: '-0.5px', color: T.text }}>
        {slide.title}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        {[left, right].map((col, ci) => (
          <div key={ci}>
            {col.map((item, i) => {
              const n = ci === 0 ? i + 1 : i + half + 1
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 16, borderBottom: `1px solid ${T.line}`, paddingBottom: 14, marginBottom: 14 }}>
                  <span style={{ fontFamily: T.font, fontSize: 30, fontWeight: 200, color: T.accent, lineHeight: 1, minWidth: 44, flexShrink: 0 }}>
                    {String(n).padStart(2, '0')}
                  </span>
                  <span style={{ fontFamily: T.font, fontSize: 16, fontWeight: 400, color: T.text, lineHeight: 1.45 }}>
                    {item}
                  </span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ConclusionSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px 12%', height: '100%', textAlign: 'center' as const, position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,78,0,0.05) 0%, transparent 70%)', pointerEvents: 'none' as const }} />
      <p style={{ fontFamily: T.font, fontSize: 11, fontWeight: 600, color: T.accent, letterSpacing: '3px', textTransform: 'uppercase' as const, marginBottom: 44 }}>
        CONCLUSÃO
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {slide.lines?.map((line, i) => (
          <p key={i} style={{ fontFamily: T.font, fontSize: i === 3 ? 'clamp(22px,3.5vw,46px)' : 'clamp(18px,2.5vw,34px)', fontWeight: i === 3 ? 400 : 300, letterSpacing: i >= 1 ? '-0.5px' : '0', color: i === 3 ? T.accent : i === 0 ? T.text : T.body, lineHeight: 1.4 }}>
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}
