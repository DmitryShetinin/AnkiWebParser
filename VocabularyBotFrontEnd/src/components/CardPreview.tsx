// src/components/CardPreview.tsx
import React, { useState } from 'react';

interface CardPreviewProps {
  variant: 'Cyberpunk' | 'Tokyo' | 'Coffee';
}

const CardPreview: React.FC<CardPreviewProps> = ({ variant }) => {
  const [flipped, setFlipped] = useState(false);
  const toggleFlip = () => setFlipped(!flipped);

  const isFlashcardStyle = variant === 'Cyberpunk';

  const getStyles = () => {
    switch (variant) {
      case 'Cyberpunk':
        return {
          background: 'linear-gradient(135deg, #253039 0%, #1a2329 100%)',
          color: '#e6edf3',
          border: '1px solid #3a4a54',
          boxShadow:
            '0 20px 40px -12px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)',
          fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          accentColor: '#a78bfa',
          secondaryAccent: '#9aabb8',
          textColor: '#e6edf3',
          meaningColor: '#bcc9d4',
          borderRadius: '28px',
          chipSynBg: 'rgba(16, 185, 129, 0.15)',
          chipSynColor: '#6ee7b7',
          chipSynBorder: '1px solid rgba(16, 185, 129, 0.3)',
          chipAntBg: 'rgba(239, 68, 68, 0.15)',
          chipAntColor: '#fca5a5',
          chipAntBorder: '1px solid rgba(239, 68, 68, 0.3)',
          chipRelBg: 'rgba(59, 130, 246, 0.15)',
          chipRelColor: '#93c5fd',
          chipRelBorder: '1px solid rgba(59, 130, 246, 0.3)',
          badgeBg: 'rgba(124, 58, 237, 0.18)',
          badgeBorder: '1px solid rgba(167, 139, 250, 0.3)',
          badgeColor: '#c4b5fd',
          decorTop: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
          decorBottom: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
          exampleBg: 'rgba(167, 139, 250, 0.08)',
        };
      case 'Tokyo':
        return {
          background: 'linear-gradient(135deg, #143233 0%, #0a1e1f 100%)',
          color: '#d7f5f0',
          border: '1px solid #1e4a4a',
          boxShadow: '0 20px 40px -12px rgba(0,0,0,0.55)',
          fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          accentColor: '#5eead4',
          secondaryAccent: '#7ba8a4',
          textColor: '#d7f5f0',
          meaningColor: '#a7f3d0',
          borderRadius: '20px',
          chipSynBg: 'rgba(16, 185, 129, 0.15)',
          chipSynColor: '#6ee7b7',
          chipSynBorder: '1px solid rgba(16, 185, 129, 0.3)',
          chipAntBg: 'rgba(239, 68, 68, 0.15)',
          chipAntColor: '#fca5a5',
          chipAntBorder: '1px solid rgba(239, 68, 68, 0.3)',
          chipRelBg: 'rgba(59, 130, 246, 0.15)',
          chipRelColor: '#93c5fd',
          chipRelBorder: '1px solid rgba(59, 130, 246, 0.3)',
          badgeBg: 'rgba(20, 184, 166, 0.18)',
          badgeBorder: '1px solid rgba(94, 234, 212, 0.3)',
          badgeColor: '#a7f3d0',
          decorTop: 'linear-gradient(135deg, #0d9488 0%, #5eead4 100%)',
          decorBottom: 'linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)',
          exampleBg: 'rgba(94, 234, 212, 0.08)',
        };
      case 'Coffee':
      default:
        return {
          background: 'linear-gradient(135deg, #fffaf3 0%, #fdf2e9 100%)',
          color: '#3d2e23',
          border: '1px solid #f0e2d3',
          boxShadow: '0 20px 40px -12px rgba(180,130,90,0.18)',
          fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
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
        };
    }
  };

  const style = getStyles();

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    marginBottom: '0.5rem',
    color: style.accentColor,
  };

  const chipStyle = (kind: 'syn' | 'ant' | 'rel'): React.CSSProperties => {
    const map = {
      syn: {
        background: style.chipSynBg,
        color: style.chipSynColor,
        border: style.chipSynBorder,
      },
      ant: {
        background: style.chipAntBg,
        color: style.chipAntColor,
        border: style.chipAntBorder,
      },
      rel: {
        background: style.chipRelBg,
        color: style.chipRelColor,
        border: style.chipRelBorder,
      },
    };
    return {
      display: 'inline-block',
      padding: '6px 14px',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: 500,
      ...map[kind],
    };
  };

  const exampleStyle: React.CSSProperties = {
    fontStyle: 'italic',
    margin: '0.6rem 0',
    lineHeight: '1.6',
    fontSize: '16px',
    background: style.exampleBg,
    padding: '0.7rem 1.1rem',
    borderRadius: '10px',
    borderLeft: `3px solid ${style.accentColor}`,
    color: style.secondaryAccent,
  };

  const wordHeaderStyle: React.CSSProperties = {
    fontSize: '2.4rem',
    fontWeight: 800,
    letterSpacing: '-1px',
    textAlign: 'center',
    marginBottom: '1rem',
    paddingBottom: '0.6rem',
    borderBottom: `2px solid ${style.accentColor}40`,
    color: style.accentColor,
    lineHeight: 1.15,
    wordBreak: 'break-word',
  };

  const posBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '6px 16px',
    borderRadius: '999px',
    background: style.badgeBg,
    border: style.badgeBorder,
    color: style.badgeColor,
    fontSize: '13px',
    fontWeight: 600,
    fontStyle: 'italic',
    letterSpacing: '0.3px',
  };

  const faceBase: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    borderRadius: style.borderRadius,
    padding: '2rem 1.6rem',
    overflow: 'hidden',
    boxSizing: 'border-box',
    background: style.background,
    color: style.textColor,
    fontFamily: style.fontFamily,
    border: style.border,
  };

  return (
    <div
      style={{
        perspective: '1400px',
        width: '100%',
        maxWidth: '420px',
        cursor: 'pointer',
        margin: '0 auto',
      }}
      onClick={toggleFlip}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '640px',
          display: 'grid',
          boxShadow: style.boxShadow,
          borderRadius: style.borderRadius,
        }}
      >
        {/* Сетка-невидимка для высоты */}
        <div
          style={{
            visibility: 'hidden',
            pointerEvents: 'none',
            padding: '2rem 1.6rem',
            borderRadius: style.borderRadius,
            fontSize: '0.95rem',
            fontFamily: style.fontFamily,
            boxSizing: 'border-box',
          }}
        >
          <div style={wordHeaderStyle}>Serendipity</div>
          <div style={{ marginBottom: '0.8rem' }}>
            <div style={{ ...labelStyle, color: 'transparent' }}>M</div>
            <div style={{ lineHeight: '1.5' }}>
              The occurrence of events by chance in a happy or beneficial way.
            </div>
          </div>
          <div style={{ marginBottom: '0.8rem' }}>
            <div style={{ ...labelStyle, color: 'transparent' }}>S</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['chance', 'fortuity', 'providence', 'happy accident'].map((w) => (
                <span
                  key={w}
                  style={{
                    ...chipStyle('syn'),
                    color: 'transparent',
                    border: '1px solid transparent',
                    background: 'transparent',
                  }}
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '0.8rem' }}>
            <div style={{ ...labelStyle, color: 'transparent' }}>A</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['misfortune', 'calamity', 'doom'].map((w) => (
                <span
                  key={w}
                  style={{
                    ...chipStyle('ant'),
                    color: 'transparent',
                    border: '1px solid transparent',
                    background: 'transparent',
                  }}
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '0.8rem' }}>
            <div style={{ ...labelStyle, color: 'transparent' }}>P</div>
            <div style={{ fontWeight: 600, fontStyle: 'italic' }}>Noun</div>
          </div>
          <div>
            <div style={{ ...labelStyle, color: 'transparent' }}>R</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['serendipitous (adj.)', 'serendipitously (adv.)'].map((w) => (
                <span
                  key={w}
                  style={{
                    ...chipStyle('rel'),
                    color: 'transparent',
                    border: '1px solid transparent',
                    background: 'transparent',
                  }}
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Ротатор */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
        >
          {/* ЛИЦЕВАЯ */}
          <div
            style={{
              ...faceBase,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {/* Декор */}
            <div
              style={{
                position: 'absolute',
                top: '-60px',
                right: '-60px',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: style.decorTop,
                opacity: 0.12,
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-80px',
                left: '-80px',
                width: '240px',
                height: '240px',
                borderRadius: '50%',
                background: style.decorBottom,
                opacity: 0.08,
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '18px',
              }}
            >
              <div
                style={{
                  fontSize: '2.8rem',
                  fontWeight: 800,
                  letterSpacing: '-1px',
                  color: style.textColor,
                  lineHeight: 1.15,
                  wordBreak: 'break-word',
                }}
              >
                Serendipity
              </div>

              <div style={posBadgeStyle}>Noun</div>

              <div
                style={{
                  ...exampleStyle,
                  maxWidth: '360px',
                  textAlign: 'left',
                }}
              >
                "A serendipitous encounter changed his life."
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                fontSize: '12px',
                color: style.secondaryAccent,
                opacity: 0.6,
                letterSpacing: '0.4px',
              }}
            >
              👆 Кликни, чтобы перевернуть
            </div>
          </div>

          {/* ОБРАТНАЯ */}
          <div
            style={{
              ...faceBase,
              transform: 'rotateY(180deg)',
            }}
          >
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={wordHeaderStyle}>Serendipity</div>

              <div style={{ marginBottom: '0.9rem' }}>
                <div style={labelStyle}>
                  <span>📖</span>
                  <span>Meaning</span>
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.6,
                    color: style.meaningColor,
                  }}
                >
                  The occurrence of events by chance in a happy or beneficial way.
                </div>
              </div>

              <div style={{ marginBottom: '0.9rem' }}>
                <div style={labelStyle}>
                  <span>🔄</span>
                  <span>Synonyms</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['chance', 'fortuity', 'providence', 'happy accident'].map((w) => (
                    <span key={w} style={chipStyle('syn')}>
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '0.9rem' }}>
                <div style={labelStyle}>
                  <span>⚡</span>
                  <span>Antonyms</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['misfortune', 'calamity', 'doom'].map((w) => (
                    <span key={w} style={chipStyle('ant')}>
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '0.9rem' }}>
                <div style={labelStyle}>
                  <span>📚</span>
                  <span>Part of Speech</span>
                </div>
                <div style={posBadgeStyle}>Noun</div>
              </div>

              <div>
                <div style={labelStyle}>
                  <span>🔗</span>
                  <span>Related Words</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['serendipitous (adj.)', 'serendipitously (adv.)'].map((w) => (
                    <span key={w} style={chipStyle('rel')}>
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;