import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenA11yModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  return (
    <>
      {/* Skip link for keyboard accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Top Navigation Bar adhering to the Top Bar Contract */}
      <header
        role="banner"
        className="sticky top-0 z-50 w-full transition-colors duration-200 border-b border-[var(--border-color)] bg-[var(--surface-color)]/95 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark (single text element) */}
          <a
            href="#home"
            className="text-xl font-extrabold tracking-tight text-[var(--text-main)] whitespace-nowrap shrink-0 hover:text-[var(--primary-color)] transition-colors focus-visible:ring-2"
            aria-label="Alex Smith Home"
          >
            Alex Smith
          </a>

          {/* Zone 2: 4–5 concise single-line text navigation links */}
          <nav aria-label="Main Navigation" role="navigation" className="hidden md:flex items-center gap-8 text-sm font-semibold text-[var(--text-muted)]">
            <a
              href="#about"
              className="hover:text-[var(--primary-color)] transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#projects"
              className="hover:text-[var(--primary-color)] transition-colors whitespace-nowrap shrink-0"
            >
              Projects
            </a>
            <a
              href="#architecture"
              className="hover:text-[var(--primary-color)] transition-colors whitespace-nowrap shrink-0"
            >
              Architecture
            </a>
            <a
              href="#a11y-lab"
              className="hover:text-[var(--primary-color)] transition-colors whitespace-nowrap shrink-0"
            >
              A11y Lab
            </a>
            <a
              href="#contact"
              className="hover:text-[var(--primary-color)] transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Theme Toggle & Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              id="theme-toggle"
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-full border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-main)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-all cursor-pointer whitespace-nowrap"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700" aria-hidden="true" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            <a
              href="#contact"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded-lg text-white bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] transition-colors shadow-sm whitespace-nowrap cursor-pointer"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </header>
    </>
  );
};
