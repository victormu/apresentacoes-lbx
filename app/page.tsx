'use client'

import { useState, useEffect, useCallback } from 'react'
import { SLIDES } from '@/lib/slides'
import {
  CoverSlide,
  IntroSlide,
  ImageListSlide,
  FiveRolesSlide,
  FlowSlide,
  MisalignmentSlide,
  CrisisActionSlide,
  DataGridSlide,
  XraySlide,
  ResearchSlide,
  VennSlide,
  ChannelsSlide,
  CalendarSlide,
  PlanFlowSlide,
  MetricsSlide,
  TransformSlide,
  CaseStudySlide,
  ActionCycleSlide,
  CommandmentsSlide,
  ConclusionSlide,
} from '@/components/slides'
import type { Slide } from '@/lib/slides'

const T = {
  bg: '#0f0f0d',
  muted: 'rgba(247,247,244,0.40)',
  accent: '#3D7FFF',
  line: 'rgba(247,247,244,0.10)',
  font: 'var(--font-inter), system-ui, -apple-system, sans-serif',
}

const STEP_SLIDE_TYPES = ['flow', 'plan-flow']

function renderSlide(slide: Slide, activeStep?: number) {
  switch (slide.type) {
    case 'cover':         return <CoverSlide slide={slide} />
    case 'intro':         return <IntroSlide slide={slide} />
    case 'image-list':    return <ImageListSlide slide={slide} />
    case 'five-roles':    return <FiveRolesSlide slide={slide} />
    case 'flow':          return <FlowSlide slide={slide} activeStep={activeStep} />
    case 'misalignment':  return <MisalignmentSlide slide={slide} />
    case 'crisis-action': return <CrisisActionSlide slide={slide} />
    case 'data-grid':     return <DataGridSlide slide={slide} />
    case 'xray':          return <XraySlide slide={slide} />
    case 'research':      return <ResearchSlide slide={slide} />
    case 'venn':          return <VennSlide slide={slide} />
    case 'channels':      return <ChannelsSlide slide={slide} />
    case 'calendar':      return <CalendarSlide slide={slide} />
    case 'plan-flow':     return <PlanFlowSlide slide={slide} activeStep={activeStep} />
    case 'metrics':       return <MetricsSlide slide={slide} />
    case 'transform':     return <TransformSlide slide={slide} />
    case 'case-study':    return <CaseStudySlide slide={slide} />
    case 'action-cycle':  return <ActionCycleSlide slide={slide} />
    case 'commandments':  return <CommandmentsSlide slide={slide} />
    case 'conclusion':    return <ConclusionSlide slide={slide} />
    default:              return null
  }
}

export default function Presentation() {
  const [current, setCurrent] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const total = SLIDES.length

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= total) return
    setCurrent(index)
    setAnimKey(k => k + 1)
    setStepIndex(0)
  }, [total])

  const prev = useCallback(() => {
    const slide = SLIDES[current]
    if (STEP_SLIDE_TYPES.includes(slide.type) && stepIndex > 0) {
      setStepIndex(s => s - 1)
    } else {
      goTo(current - 1)
    }
  }, [current, stepIndex, goTo])

  const next = useCallback(() => {
    const slide = SLIDES[current]
    const totalSteps = slide.steps?.length ?? 0
    if (STEP_SLIDE_TYPES.includes(slide.type) && stepIndex < totalSteps - 1) {
      setStepIndex(s => s + 1)
    } else {
      goTo(current + 1)
    }
  }, [current, stepIndex, goTo])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft')                   { e.preventDefault(); prev() }
      if (e.key === 'Home')                        { e.preventDefault(); goTo(0) }
      if (e.key === 'End')                         { e.preventDefault(); goTo(total - 1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, goTo, total])

  const slide = SLIDES[current]
  const isStepSlide = STEP_SLIDE_TYPES.includes(slide.type)
  const activeStep = isStepSlide ? stepIndex : undefined
  const progress = ((current + 1) / total) * 100

  return (
    <div style={{ width: '100vw', height: '100vh', background: T.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: T.font }}>
      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: 'rgba(247,247,244,0.06)', zIndex: 50 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: T.accent, transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1)' }} />
      </div>

      {/* Slide stage */}
      <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <div key={animKey} className="slide-enter" style={{ position: 'absolute', inset: 0 }}>
          {renderSlide(slide, activeStep)}
        </div>
      </main>

      {/* Bottom nav */}
      <nav
        aria-label="Navegação da apresentação"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: 52, borderTop: `1px solid ${T.line}`, flexShrink: 0 }}
      >
        <button
          onClick={prev}
          disabled={current === 0}
          aria-label="Slide anterior"
          style={{ background: 'none', border: 'none', color: current === 0 ? T.line : T.muted, cursor: current === 0 ? 'default' : 'pointer', fontSize: 18, padding: '8px 12px', transition: 'color 0.2s', lineHeight: 1 }}
        >
          ←
        </button>

        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir para slide ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
              style={{ width: i === current ? 20 : 6, height: 6, borderRadius: 3, background: i === current ? T.accent : T.line, border: 'none', padding: 0, cursor: 'pointer', transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)' }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: T.font, fontSize: 11, letterSpacing: '2px', color: T.muted, fontWeight: 600 }}>
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button
            onClick={next}
            disabled={current === total - 1}
            aria-label="Próximo slide"
            style={{ background: 'none', border: 'none', color: current === total - 1 ? T.line : T.muted, cursor: current === total - 1 ? 'default' : 'pointer', fontSize: 18, padding: '8px 12px', transition: 'color 0.2s', lineHeight: 1 }}
          >
            →
          </button>
        </div>
      </nav>
    </div>
  )
}
