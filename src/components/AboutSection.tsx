import React, { useState } from 'react';
import { Layers, Grid, Palette, Accessibility, Check } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<'cascade' | 'grid' | 'tokens' | 'wcag'>('cascade');

  const pillars = [
    {
      id: 'cascade' as const,
      name: 'Cascade Layers (@layer)',
      icon: Layers,
      summary: 'Deterministic specificity management',
      details:
        'By orchestrating styles across reset, theme, layout, components, and utilities layers, cascading conflicts and !important hacks are completely eradicated.',
      code: `@layer reset, theme, layout, components, utilities;

@layer theme {
  :root { --surface: #ffffff; }
}
@layer components {
  .card { background: var(--surface); }
}`,
    },
    {
      id: 'grid' as const,
      name: 'CSS Grid & Subgrid',
      icon: Grid,
      summary: 'True 2-dimensional alignment',
      details:
        'Utilizing subgrid allows card children—such as headers, badges, and action buttons—to align track-to-track across varying card heights with zero JavaScript.',
      code: `.container-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
.card-item {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}`,
    },
    {
      id: 'tokens' as const,
      name: 'Tokenized CSS Variables',
      icon: Palette,
      summary: 'Single-source-of-truth theming',
      details:
        'Scoped custom properties adapt instantly between Light, Dark, and High-Contrast modes without layout thrashing or client-side style re-evaluations.',
      code: `:root {
  --text-main: #111827;
  --bg-color: #f9fafb;
}
[data-theme="dark"] {
  --text-main: #f8fafc;
  --bg-color: #0f172a;
}`,
    },
    {
      id: 'wcag' as const,
      name: 'WCAG 2.2 by Default',
      icon: Accessibility,
      summary: 'Inclusive interactive geometry',
      details:
        'Enforcing visible :focus-visible outlines, 4.5:1 to 7:1 contrast ratios, 44px touch targets, and prefers-reduced-motion queries into baseline components.',
      code: `*:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 4px;
}
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; }
}`,
    },
  ];

  const currentPillar = pillars.find((p) => p.id === activePillar) || pillars[0];

  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 md:py-28 border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Grid: Left Text + Right Architectural Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-[var(--primary-color)] mb-3">
              Philosophy & Standards
            </p>
            <h2 id="about-heading" className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] mb-6 tracking-tight">
              About Me
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
              <p>
                I specialize in translating complex design systems into robust, maintainable CSS architectures.
                My focus is on Mobile-First workflows, CSS Grid, and custom variable-driven themes.
              </p>
              <p>
                I ensure that all digital experiences meet stringent WCAG guidelines because a beautiful web must
                also be an inclusive web.
              </p>
              <p className="text-sm">
                From micro-interactions that respect <code className="text-xs px-1.5 py-0.5 rounded bg-[var(--surface-color)] border border-[var(--border-color)] text-[var(--text-main)] font-mono">prefers-reduced-motion</code> to
                deeply nested layout subgrids, my methodology bridges the divide between visual craft and software engineering discipline.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex flex-wrap gap-y-3 gap-x-6 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--primary-color)]" aria-hidden="true" />
                <span>WCAG 2.2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--primary-color)]" aria-hidden="true" />
                <span>CSS Subgrid & Container Queries</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[var(--primary-color)]" aria-hidden="true" />
                <span>Semantic HTML5 Landmarks</span>
              </div>
            </div>
          </div>

          {/* Visual Container with high-fidelity asset and fallback */}
          <div className="relative rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--surface-color)] shadow-[var(--shadow)]">
            <div className="aspect-[16/10] relative overflow-hidden bg-slate-900">
              <img
                src="/src/assets/images/hero_css_architecture_1793382327821.jpg"
                alt="Abstract representation of CSS layout architecture with responsive grid planes and coordinates"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                width={800}
                height={500}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback container
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add('flex', 'items-center', 'justify-center', 'p-8', 'text-white', 'bg-slate-900');
                  }
                }}
              />
            </div>
            <div className="p-4 bg-[var(--surface-color)] border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span className="font-mono">CSS Architecture Wireframe</span>
              <span>Intrinsic Fluid Grid System</span>
            </div>
          </div>
        </div>

        {/* Interactive Architecture Pillars Explorer */}
        <div id="architecture" className="mt-20 pt-16 border-t border-[var(--border-color)]">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">
              Core Architectural Pillars
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              Select a pillar below to inspect the architectural principles and native code patterns that power modern, accessible web apps.
            </p>
          </div>

          {/* Pillar Selector Tabs (Interactive functional controls) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-xl mb-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              const isActive = activePillar === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar.id)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-[var(--primary-color)] text-white shadow-sm'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-color)]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{pillar.name.split(' ')[0]} {pillar.name.split(' ')[1] || ''}</span>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Details Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] shadow-[var(--shadow)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--bg-color)] border border-[var(--border-color)] flex items-center justify-center text-[var(--primary-color)]">
                  <currentPillar.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[var(--text-main)]">{currentPillar.name}</h4>
                  <p className="text-xs text-[var(--text-muted)]">{currentPillar.summary}</p>
                </div>
              </div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {currentPillar.details}
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-[var(--border-color)] bg-slate-950 text-slate-100 font-mono text-xs">
                <div className="px-4 py-2 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>architecture-spec.css</span>
                  <span>Modern CSS Spec</span>
                </div>
                <pre className="p-4 overflow-x-auto text-slate-200 leading-relaxed">
                  <code>{currentPillar.code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
