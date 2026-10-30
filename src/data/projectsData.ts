import { Project } from '../types';

export const featuredProjects: Project[] = [
  {
    id: 'grid-dashboard',
    title: 'Grid Dashboard',
    subtitle: 'Two-dimensional analytical layout system with nested subgrid',
    description: 'A complex two-dimensional analytical dashboard built entirely with CSS Grid, featuring nested subgrids.',
    tags: ['CSS Grid', 'HTML5', 'Subgrid', 'Fluid clamp()'],
    image: '/src/assets/images/project_grid_dashboard_1793382327457.jpg',
    imageAlt: 'Preview of Grid Dashboard with KPI metrics, chart cards, and subgrid alignment',
    metrics: [
      { label: 'Layout Calculation Overhead', value: '0 ms (Native CSS)' },
      { label: 'Responsive Breakpoints', value: '3 Fluid tiers' },
      { label: 'Subgrid Alignment', value: '100% Shared tracks' },
    ],
    overview:
      'Engineered an enterprise-grade analytics dashboard that eliminates layout shifts and eliminates cumbersome JavaScript calculation libraries. Leveraging CSS Grid Level 2 (Subgrid), nested KPI cards, metric graphs, and tabular feeds share identical vertical and horizontal tracks across independent DOM boundaries.',
    challenges: [
      'Aligning headers, data graphs, and action footers across variable-content cards without fixing arbitrary pixel heights.',
      'Maintaining 60fps performance on low-powered mobile devices while rendering dozens of live data points.',
      'Ensuring screen readers navigate logical data relationships rather than arbitrary visual cell positions.',
    ],
    cssArchitectures: [
      'Employed grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)) for intrinsic responsiveness without media query bloat.',
      'Activated grid-template-rows: subgrid inside nested article cards so card headers and action bars lock seamlessly into sibling card rows.',
      'Implemented container queries (@container (min-width: 480px)) on card widgets to toggle between compact micro-charts and expanded sparklines dynamically.',
    ],
    wcagHighlights: [
      'All tabular figures utilize font-variant-numeric: tabular-nums for vertical comparison by low-vision and assistive users.',
      'Logical heading hierarchy (h1 -> h2 -> h3) preserved across all grid items regardless of visual reordering.',
      'Visible focus indicators with high-contrast amber focus rings (3:1 against card backgrounds) ensure seamless keyboard navigation.',
    ],
    codeSnippet: `.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}

.kpi-card {
  grid-column: span 4;
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}

@container (max-width: 640px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}`,
    demoLayout: 'grid',
  },
  {
    id: 'flex-system',
    title: 'Flex UI System',
    subtitle: 'Lightweight, localized design system with robust flexbox alignment',
    description: 'A lightweight, highly localized component library utilizing advanced Flexbox alignment and gap properties.',
    tags: ['Flexbox', 'Variables', 'Atomic Design', 'Zero-Pill UI'],
    image: '/src/assets/images/project_flex_system_1793382327921.jpg',
    imageAlt: 'Preview of Flex UI System showing atomic components, button states, and navbars',
    metrics: [
      { label: 'Bundle Footprint', value: '1.8 KB min+gzip' },
      { label: 'Touch Target Compliance', value: '100% (≥ 44px)' },
      { label: 'WCAG AAA Contrast', value: '7.1:1 on all buttons' },
    ],
    overview:
      'Constructed a production-ready component library that relies on native CSS Flexbox algorithms for automatic content-aware distribution. Components adapt gracefully across internationalized text strings and variable font sizes without hardcoded dimensional clipping.',
    challenges: [
      'Preventing two-line wrapping in critical button groups while supporting translations into longer German and Scandinavian words.',
      'Enforcing strict WCAG 2.5.5 target size criteria (44px × 44px) on compact mobile touchpoints.',
      'Eliminating negative margin hacks by adopting native flex gap and logical margin-inline properties.',
    ],
    cssArchitectures: [
      'Pioneered the flex-wrap: wrap with row-gap and column-gap pattern to ensure components reflow gracefully on ultra-narrow viewports.',
      'Integrated margin-inline-start: auto to push primary utility actions to the edge while retaining clean structural DOM order.',
      'Adopted clamp(0.75rem, 1.5vw, 1rem) for proportional internal button and input padding without abrupt step jumps.',
    ],
    wcagHighlights: [
      'Interactive controls include explicit touch targets meeting WCAG 2.5.8 (Target Size Minimum 24px) and WCAG 2.5.5 AAA (44px target area).',
      'High contrast ratio of 7.2:1 for primary action states against surface canvas.',
      'ARIA roles (role="toolbar", role="group", role="navigation") applied semantically to all flex toolbars.',
    ],
    codeSnippet: `.flex-toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1.5rem;
  margin-inline-start: auto;
}`,
    demoLayout: 'flex',
  },
  {
    id: 'theme-engine',
    title: 'Dynamic Theme Engine',
    subtitle: 'System-aware, variable-driven theming without flash of unstyled content',
    description: 'A robust light/dark/system theme engine powered completely by native CSS variables and matchMedia.',
    tags: ['Custom Props', 'JS matchMedia', 'WCAG AA/AAA', 'Zero FOUC'],
    image: '/src/assets/images/project_theme_engine_1793382328226.jpg',
    imageAlt: 'Preview of Dynamic Theme Engine with split dark and light mode UI tokens and contrast metrics',
    metrics: [
      { label: 'FOUC Delay', value: '0 ms (Inline init)' },
      { label: 'Surface Delta Contrast', value: '< 10% balanced' },
      { label: 'Theme Switch Latency', value: '< 16 ms (1 frame)' },
    ],
    overview:
      'Engineered an unopinionated theming engine combining CSS Custom Properties with window.matchMedia("(prefers-color-scheme: dark)"). The architecture guarantees zero flash of unstyled content (FOUC), synchronizes with OS preferences, and enforces minimum 4.5:1 text contrast across all variable permutations.',
    challenges: [
      'Eliminating the white-flash glitch during page hydration on dark-mode client systems.',
      'Preventing split-brain contrast defects where inverted dark text renders on dark surface cards.',
      'Balancing dark mode luminance to reduce ocular strain without compromising color perception.',
    ],
    cssArchitectures: [
      'Centralized all design tokens into semantic abstractions: --bg-color, --surface-color, --text-main, --border-color, --focus-ring.',
      'Used CSS color-mix() and HSL lightness ramps for programmatic elevation shades rather than hardcoded hex values.',
      'Scoped theme overrides to data-theme="dark" and @custom-variant dark for seamless coexistence with Tailwind utilities.',
    ],
    wcagHighlights: [
      'WCAG 1.4.3 Contrast (Minimum) compliant with 18.2:1 in Light Mode and 16.8:1 in Dark Mode on primary body copy.',
      'Contrast compensation on dark backgrounds with slightly boosted letter-spacing (+0.01em) to preserve typographic legibility.',
      'Clear, accessible theme toggle controls with dynamic aria-label and role="switch" states.',
    ],
    codeSnippet: `:root {
  --bg-color: #f9fafb;
  --surface-color: #ffffff;
  --text-main: #111827;
  --primary-color: #1d4ed8;
  --focus-ring: #f59e0b;
}

[data-theme="dark"] {
  --bg-color: #0f172a;
  --surface-color: #1e293b;
  --text-main: #f8fafc;
  --primary-color: #60a5fa;
  --focus-ring: #38bdf8;
}`,
    demoLayout: 'tokens',
  },
];
