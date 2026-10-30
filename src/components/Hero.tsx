import React from 'react';
import { ArrowDown, Code2, ShieldCheck, Compass, Sliders } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative border-b border-[var(--border-color)] bg-[var(--surface-color)] transition-colors duration-200">
      {/* Decorative Subtle Architecture Grid Backdrop */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--text-main) 1px, transparent 1px), linear-gradient(90deg, var(--text-main) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-3xl mx-auto text-center">
          {/* Natural human editorial kicker */}
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[var(--primary-color)] mb-4">
            CSS Architecture & Accessibility Engineering
          </p>

          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-main)] mb-6 leading-tight [text-wrap:balance]"
          >
            Crafting the Modern Web
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Advanced CSS Architect & Accessibility Specialist. Building resilient, semantic, and pixel-perfect applications for everyone.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] rounded-lg transition-all shadow-sm focus-visible:ring-3"
              aria-label="View my featured projects and case studies"
            >
              View My Work
              <ArrowDown className="w-4 h-4 ml-2" aria-hidden="true" />
            </a>

            <a
              href="#a11y-lab"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-[var(--text-main)] bg-[var(--bg-color)] border border-[var(--border-color)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] rounded-lg transition-all focus-visible:ring-3"
              aria-label="Explore the interactive Accessibility and Contrast Lab"
            >
              <Sliders className="w-4 h-4 mr-2" aria-hidden="true" />
              Interactive A11y Lab
            </a>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency Row: Key Technical Standards (Full-width row below hero) */}
        <div className="mt-16 pt-10 border-t border-[var(--border-color)] grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="space-y-1">
            <div className="text-xs font-medium text-[var(--text-muted)]">Compliance Standard</div>
            <div className="text-2xl font-bold tracking-tight text-[var(--text-main)] tabular-nums">
              WCAG 2.2 AAA
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Full keyboard accessibility & 7:1+ enhanced contrast.
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-medium text-[var(--text-muted)]">Layout Overhead</div>
            <div className="text-2xl font-bold tracking-tight text-[var(--text-main)] tabular-nums">
              0 KB Runtime
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Native CSS Grid, Subgrid, and Flexbox without JS shims.
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-medium text-[var(--text-muted)]">Design Tokenization</div>
            <div className="text-2xl font-bold tracking-tight text-[var(--text-main)] tabular-nums">
              100% Native
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Variable-driven themes responding instantly to OS modes.
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-medium text-[var(--text-muted)]">Screen Reader Testing</div>
            <div className="text-2xl font-bold tracking-tight text-[var(--text-main)] tabular-nums">
              NVDA & VoiceOver
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Semantic HTML landmarks and verified ARIA hierarchies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
