import { ContrastResult } from '../types';

function hexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return [0, 0, 0];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function getLuminance(r: number, g: number, b: number): number {
  const [sR, sG, sB] = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sR + 0.7152 * sG + 0.0722 * sB;
}

export function calculateContrast(textColor: string, bgColor: string): ContrastResult {
  const [r1, g1, b1] = hexToRgb(textColor);
  const [r2, g2, b2] = hexToRgb(bgColor);

  const lum1 = getLuminance(r1, g1, b1);
  const lum2 = getLuminance(r2, g2, b2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  const ratio = (brightest + 0.05) / (darkest + 0.05);
  const roundedRatio = Math.round(ratio * 100) / 100;

  const aaNormal = roundedRatio >= 4.5;
  const aaLarge = roundedRatio >= 3.0;
  const aaaNormal = roundedRatio >= 7.0;
  const aaaLarge = roundedRatio >= 4.5;

  let scoreGrade: 'AAA' | 'AA' | 'Fail' = 'Fail';
  if (aaaNormal) {
    scoreGrade = 'AAA';
  } else if (aaNormal) {
    scoreGrade = 'AA';
  }

  return {
    ratio: roundedRatio,
    aaNormal,
    aaLarge,
    aaaNormal,
    aaaLarge,
    scoreGrade,
  };
}
