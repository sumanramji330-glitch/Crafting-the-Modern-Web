export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  metrics: {
    label: string;
    value: string;
  }[];
  overview: string;
  challenges: string[];
  cssArchitectures: string[];
  wcagHighlights: string[];
  codeSnippet: string;
  demoLayout: 'grid' | 'flex' | 'tokens';
}

export type VisionFilter = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export interface ContrastResult {
  ratio: number;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
  scoreGrade: 'AAA' | 'AA' | 'Fail';
}
