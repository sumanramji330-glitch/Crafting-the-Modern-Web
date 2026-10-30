import React, { useEffect, useRef, useState } from 'react';
import { X, CheckCircle2, Copy, Check, ExternalLink, Code, ShieldCheck, Layers } from 'lucide-react';
import { Project } from '../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'wcag' | 'snippet'>('architecture');
  const [copied, setCopied] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // Close on Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(project.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Body */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] shadow-2xl z-10 transition-all text-[var(--text-main)]"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 px-6 py-4 border-b border-[var(--border-color)] bg-[var(--surface-color)]/95 backdrop-blur-md flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)]">
              <span>Case Study</span>
              <span aria-hidden="true">·</span>
              <span>{project.tags.join(' · ')}</span>
            </div>
            <h2 id="case-study-title" className="text-xl sm:text-2xl font-bold text-[var(--text-main)] tracking-tight">
              {project.title}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close case study modal"
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-color)] border border-transparent hover:border-[var(--border-color)] transition-colors focus-visible:ring-2 cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Hero Banner inside modal */}
          <div className="rounded-xl overflow-hidden border border-[var(--border-color)] bg-slate-950 max-h-72">
            <img
              src={project.image}
              alt={project.imageAlt}
              className="w-full h-full object-cover"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Metrics bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[var(--bg-color)] border border-[var(--border-color)]">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="space-y-0.5">
                <p className="text-xs text-[var(--text-muted)]">{m.label}</p>
                <p className="text-base font-bold text-[var(--text-main)] tabular-nums">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Overview Section */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[var(--text-main)]">Executive Summary</h3>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Tabs Navigation for Technical Deep Dive */}
          <div>
            <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3 mb-6">
              <button
                onClick={() => setActiveTab('architecture')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'architecture'
                    ? 'bg-[var(--primary-color)] text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-color)]'
                }`}
              >
                <Layers className="w-4 h-4" aria-hidden="true" />
                CSS Architecture
              </button>
              <button
                onClick={() => setActiveTab('wcag')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'wcag'
                    ? 'bg-[var(--primary-color)] text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-color)]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                WCAG Compliance
              </button>
              <button
                onClick={() => setActiveTab('snippet')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'snippet'
                    ? 'bg-[var(--primary-color)] text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-color)]'
                }`}
              >
                <Code className="w-4 h-4" aria-hidden="true" />
                Code Implementation
              </button>
            </div>

            {/* Tab: CSS Architecture */}
            {activeTab === 'architecture' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-[var(--text-main)]">Engineered Architecture Patterns</h4>
                <ul className="space-y-3">
                  {project.cssArchitectures.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                      <span className="w-5 h-5 rounded-full bg-[var(--bg-color)] border border-[var(--border-color)] text-[var(--primary-color)] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tab: WCAG */}
            {activeTab === 'wcag' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-[var(--text-main)]">Accessibility & WCAG Verification</h4>
                <ul className="space-y-3">
                  {project.wcagHighlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tab: Code Snippet */}
            {activeTab === 'snippet' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[var(--text-main)]">Production Stylesheet</h4>
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded border border-[var(--border-color)] bg-[var(--bg-color)] hover:text-[var(--primary-color)] transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="rounded-xl overflow-hidden border border-[var(--border-color)] bg-slate-950 font-mono text-xs">
                  <pre className="p-4 text-slate-100 overflow-x-auto leading-relaxed">
                    <code>{project.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[var(--border-color)] bg-[var(--bg-color)] flex items-center justify-between">
          <p className="text-xs text-[var(--text-muted)]">
            Built with modern standards: CSS Grid, Subgrid, Custom Props & WCAG AA/AAA.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-lg text-white bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] transition-colors cursor-pointer"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
