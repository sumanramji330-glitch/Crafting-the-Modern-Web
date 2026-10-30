import React, { useState } from 'react';
import { Eye, Shield, Sliders, Check, AlertCircle, RefreshCw, Zap } from 'lucide-react';
import { calculateContrast } from '../utils/contrast';
import { VisionFilter } from '../types';

interface AccessibilityLabProps {
  visionFilter: VisionFilter;
  onVisionFilterChange: (filter: VisionFilter) => void;
  reducedMotion: boolean;
  onReducedMotionChange: (val: boolean) => void;
}

export const AccessibilityLab: React.FC<AccessibilityLabProps> = ({
  visionFilter,
  onVisionFilterChange,
  reducedMotion,
  onReducedMotionChange,
}) => {
  // Contrast checker state
  const [textColor, setTextColor] = useState('#111827');
  const [bgColor, setBgColor] = useState('#ffffff');

  const contrast = calculateContrast(textColor, bgColor);

  // Preset color pairings
  const colorPresets = [
    { label: 'Deep Slate on White', text: '#111827', bg: '#ffffff' },
    { label: 'Primary Blue on White', text: '#1d4ed8', bg: '#ffffff' },
    { label: 'Light Blue on Deep Slate', text: '#60a5fa', bg: '#0f172a' },
    { label: 'Muted Gray on White', text: '#4b5563', bg: '#ffffff' },
    { label: 'Low Contrast Failure', text: '#9ca3af', bg: '#f3f4f6' },
  ];

  const visionOptions: { id: VisionFilter; name: string; desc: string }[] = [
    { id: 'normal', name: 'Normal Vision', desc: 'Standard trichromatic color vision' },
    { id: 'protanopia', name: 'Protanopia', desc: 'Red-blind (L-cone absence ~1% of males)' },
    { id: 'deuteranopia', name: 'Deuteranopia', desc: 'Green-blind (M-cone absence ~5% of males)' },
    { id: 'tritanopia', name: 'Tritanopia', desc: 'Blue-blind (S-cone absence ~0.01% of population)' },
    { id: 'achromatopsia', name: 'Achromatopsia', desc: 'Monochromacy / Complete lack of color cones' },
  ];

  return (
    <section id="a11y-lab" aria-labelledby="lab-heading" className="py-20 md:py-28 border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold tracking-wider uppercase text-[var(--primary-color)] mb-3">
            Interactive Diagnostic Suite
          </p>
          <h2 id="lab-heading" className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] tracking-tight">
            Accessibility & Contrast Lab
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-muted)]">
            Test WCAG 2.2 color contrast compliance in real time and simulate various visual perception conditions to verify inclusive usability.
          </p>
        </div>

        {/* Dual Column Lab: Left Contrast Checker, Right Vision Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tool 1: WCAG Color Contrast Engine */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] shadow-[var(--shadow)] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-[var(--primary-color)]" aria-hidden="true" />
                <h3 className="text-lg font-bold text-[var(--text-main)]">WCAG Contrast Analyzer</h3>
              </div>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[var(--bg-color)] border border-[var(--border-color)] text-[var(--text-muted)]">
                WCAG 2.2 Level AAA/AA
              </span>
            </div>

            {/* Color Pickers & Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="text-color-input" className="block text-xs font-bold text-[var(--text-main)] mb-1.5">
                  Foreground Text Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="text-color-picker"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-10 h-10 rounded border border-[var(--border-color)] cursor-pointer bg-transparent"
                    aria-label="Pick foreground color visually"
                  />
                  <input
                    id="text-color-input"
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs font-mono rounded border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-main)]"
                    maxLength={7}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bg-color-input" className="block text-xs font-bold text-[var(--text-main)] mb-1.5">
                  Background Canvas Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="bg-color-picker"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded border border-[var(--border-color)] cursor-pointer bg-transparent"
                    aria-label="Pick background color visually"
                  />
                  <input
                    id="bg-color-input"
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs font-mono rounded border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-main)]"
                    maxLength={7}
                  />
                </div>
              </div>
            </div>

            {/* Presets */}
            <div>
              <p className="text-xs font-medium text-[var(--text-muted)] mb-2">Preset Combinations:</p>
              <div className="flex flex-wrap gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setTextColor(preset.text);
                      setBgColor(preset.bg);
                    }}
                    className="px-2.5 py-1 text-xs font-medium rounded border border-[var(--border-color)] bg-[var(--bg-color)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-all cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contrast Ratio Display Card */}
            <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-medium text-[var(--text-muted)]">Calculated Ratio</span>
                <div className="text-3xl font-extrabold text-[var(--text-main)] tabular-nums">
                  {contrast.ratio}:1
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {/* Normal AA */}
                <div className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 ${
                  contrast.aaNormal ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  {contrast.aaNormal ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  <span>AA Normal (4.5:1)</span>
                </div>

                {/* Normal AAA */}
                <div className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 ${
                  contrast.aaaNormal ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  {contrast.aaaNormal ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  <span>AAA Normal (7:1)</span>
                </div>

                {/* Large Text */}
                <div className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 ${
                  contrast.aaLarge ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  {contrast.aaLarge ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  <span>UI / Large (3:1)</span>
                </div>
              </div>
            </div>

            {/* Live Visual Sample Preview with chosen colors */}
            <div
              className="p-6 rounded-xl border border-[var(--border-color)] transition-colors"
              style={{ backgroundColor: bgColor, color: textColor }}
            >
              <h4 className="text-xl font-bold mb-2" style={{ color: textColor }}>
                Live Typography & Component Preview
              </h4>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: textColor }}>
                Accessible typography ensures readability for users with low contrast sensitivity, age-related vision degradation, or viewing under direct sunlight.
              </p>
              <button
                type="button"
                className="px-4 py-2 text-xs font-bold rounded-lg border cursor-pointer"
                style={{
                  borderColor: textColor,
                  color: textColor,
                  backgroundColor: 'transparent',
                }}
              >
                Sample Interactive Action
              </button>
            </div>
          </div>

          {/* Tool 2: Vision Deficiency & Motion Simulator */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] shadow-[var(--shadow)] space-y-6">
            <div className="flex items-center gap-2.5">
              <Eye className="w-5 h-5 text-[var(--primary-color)]" aria-hidden="true" />
              <h3 className="text-lg font-bold text-[var(--text-main)]">Perception Simulator</h3>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Activate real-time color perception filters to simulate how diverse users experience visual elements on this page.
            </p>

            <div className="space-y-2">
              {visionOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => onVisionFilterChange(opt.id)}
                  aria-pressed={visionFilter === opt.id}
                  className={`w-full p-3 text-left rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                    visionFilter === opt.id
                      ? 'border-[var(--primary-color)] bg-[var(--bg-color)] shadow-sm'
                      : 'border-[var(--border-color)] bg-transparent hover:border-[var(--primary-color)]'
                  }`}
                >
                  <div>
                    <div className="font-bold text-[var(--text-main)]">{opt.name}</div>
                    <div className="text-[11px] text-[var(--text-muted)]">{opt.desc}</div>
                  </div>
                  {visionFilter === opt.id && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary-color)] shrink-0" aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>

            {/* Motion Preference Toggle */}
            <div className="pt-4 border-t border-[var(--border-color)] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-main)]">Simulate Reduced Motion</h4>
                  <p className="text-[11px] text-[var(--text-muted)]">Forces zero animation duration for vestibular comfort</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={reducedMotion}
                  onClick={() => onReducedMotionChange(!reducedMotion)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    reducedMotion ? 'bg-[var(--primary-color)]' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      reducedMotion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Keyboard Focus Testing Affordance */}
              <div className="p-3 rounded-lg bg-[var(--bg-color)] border border-[var(--border-color)] text-xs space-y-2">
                <span className="font-semibold text-[var(--text-main)]">Focus Indicator Test</span>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Press Tab to navigate through the button below to verify the 3px high-contrast amber focus ring:
                </p>
                <button
                  type="button"
                  className="w-full py-2 text-xs font-semibold rounded bg-[var(--surface-color)] border border-[var(--border-color)] text-[var(--text-main)] hover:border-[var(--primary-color)] cursor-pointer focus-visible:ring-3"
                >
                  Test Tab Focus Appearance
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
