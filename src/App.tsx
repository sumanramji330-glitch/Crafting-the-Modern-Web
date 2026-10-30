/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AccessibilityLab } from './components/AccessibilityLab';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { A11ySvgFilters } from './components/A11ySvgFilters';
import { VisionFilter } from './types';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [visionFilter, setVisionFilter] = useState<VisionFilter>('normal');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Sync theme with HTML document element attributes and localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync reduced motion simulation class
  useEffect(() => {
    const root = document.documentElement;
    if (reducedMotion) {
      root.classList.add('simulated-reduced-motion');
    } else {
      root.classList.remove('simulated-reduced-motion');
    }
  }, [reducedMotion]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Determine vision filter class for main content
  const getVisionFilterClass = () => {
    switch (visionFilter) {
      case 'protanopia':
        return 'filter-protanopia';
      case 'deuteranopia':
        return 'filter-deuteranopia';
      case 'tritanopia':
        return 'filter-tritanopia';
      case 'achromatopsia':
        return 'filter-achromatopsia';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-color)] text-[var(--text-main)] transition-colors duration-200">
      {/* SVG Color Matrix Filters for Vision Simulation */}
      <A11ySvgFilters />

      {/* Header & Sticky Navigation */}
      <Header theme={theme} onToggleTheme={toggleTheme} />

      {/* Main Content with Optional Perception Filter applied */}
      <main
        id="main-content"
        role="main"
        className={`flex-1 transition-all duration-300 ${getVisionFilterClass()}`}
      >
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <AccessibilityLab
          visionFilter={visionFilter}
          onVisionFilterChange={setVisionFilter}
          reducedMotion={reducedMotion}
          onReducedMotionChange={setReducedMotion}
        />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
