export type CardStyle = 'Cyberpunk' | 'Tokyo' | 'Coffee';

export interface FlashcardTheme {
  background: string;
  color: string;
  border: string;
  boxShadow: string;
  accentColor: string;
  secondaryAccent: string;
  textColor: string;
  meaningColor: string;
  borderRadius: string;
  chipSynBg: string;
  chipSynColor: string;
  chipSynBorder: string;
  chipAntBg: string;
  chipAntColor: string;
  chipAntBorder: string;
  chipRelBg: string;
  chipRelColor: string;
  chipRelBorder: string;
  badgeBg: string;
  badgeBorder: string;
  badgeColor: string;
  decorTop: string;
  decorBottom: string;
  exampleBg: string;
}

const commonChips = {
  chipSynBg: 'rgba(16, 185, 129, 0.15)',
  chipSynColor: '#6ee7b7',
  chipSynBorder: '1px solid rgba(16, 185, 129, 0.3)',
  chipAntBg: 'rgba(239, 68, 68, 0.15)',
  chipAntColor: '#fca5a5',
  chipAntBorder: '1px solid rgba(239, 68, 68, 0.3)',
  chipRelBg: 'rgba(59, 130, 246, 0.15)',
  chipRelColor: '#93c5fd',
  chipRelBorder: '1px solid rgba(59, 130, 246, 0.3)',
};

const themes: Record<CardStyle, FlashcardTheme> = {
  Cyberpunk: {
    background: 'linear-gradient(135deg, #253039 0%, #1a2329 100%)',
    color: '#e6edf3',
    border: '1px solid #3a4a54',
    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)',
    accentColor: '#a78bfa',
    secondaryAccent: '#9aabb8',
    textColor: '#e6edf3',
    meaningColor: '#bcc9d4',
    borderRadius: '28px',
    ...commonChips,
    badgeBg: 'rgba(124, 58, 237, 0.18)',
    badgeBorder: '1px solid rgba(167, 139, 250, 0.3)',
    badgeColor: '#c4b5fd',
    decorTop: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
    decorBottom: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
    exampleBg: 'rgba(167, 139, 250, 0.08)',
  },
  Tokyo: {
    background: 'linear-gradient(135deg, #143233 0%, #0a1e1f 100%)',
    color: '#d7f5f0',
    border: '1px solid #1e4a4a',
    boxShadow: '0 20px 40px -12px rgba(0,0,0,0.55)',
    accentColor: '#5eead4',
    secondaryAccent: '#7ba8a4',
    textColor: '#d7f5f0',
    meaningColor: '#a7f3d0',
    borderRadius: '20px',
    ...commonChips,
    badgeBg: 'rgba(20, 184, 166, 0.18)',
    badgeBorder: '1px solid rgba(94, 234, 212, 0.3)',
    badgeColor: '#a7f3d0',
    decorTop: 'linear-gradient(135deg, #0d9488 0%, #5eead4 100%)',
    decorBottom: 'linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)',
    exampleBg: 'rgba(94, 234, 212, 0.08)',
  },
  Coffee: {
    background: 'linear-gradient(135deg, #fffaf3 0%, #fdf2e9 100%)',
    color: '#3d2e23',
    border: '1px solid #f0e2d3',
    boxShadow: '0 20px 40px -12px rgba(180,130,90,0.18)',
    accentColor: '#c4715a',
    secondaryAccent: '#a68a78',
    textColor: '#3d2e23',
    meaningColor: '#5a4a3d',
    borderRadius: '20px',
    chipSynBg: 'rgba(16, 185, 129, 0.12)',
    chipSynColor: '#047857',
    chipSynBorder: '1px solid rgba(16, 185, 129, 0.25)',
    chipAntBg: 'rgba(239, 68, 68, 0.12)',
    chipAntColor: '#991b1b',
    chipAntBorder: '1px solid rgba(239, 68, 68, 0.25)',
    chipRelBg: 'rgba(59, 130, 246, 0.12)',
    chipRelColor: '#1e40af',
    chipRelBorder: '1px solid rgba(59, 130, 246, 0.25)',
    badgeBg: 'rgba(196, 113, 90, 0.15)',
    badgeBorder: '1px solid rgba(196, 113, 90, 0.3)',
    badgeColor: '#8b5a48',
    decorTop: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)',
    decorBottom: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
    exampleBg: 'rgba(196, 113, 90, 0.08)',
  },
};

export const getFlashcardTheme = (style: CardStyle): FlashcardTheme => themes[style];

export const getSavedCardStyle = (): CardStyle => {
  const savedStyle = localStorage.getItem('cardStyle');
  return savedStyle === 'Tokyo' || savedStyle === 'Coffee' ? savedStyle : 'Cyberpunk';
};
