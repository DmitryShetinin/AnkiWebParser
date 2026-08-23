// src/components/CardPreview.tsx
import React, { useState } from 'react';

interface CardPreviewProps {
  variant: 'Cyberpunk' | 'Tokyo' | 'Coffee';
}

const CardPreview: React.FC<CardPreviewProps> = ({ variant }) => {
  const [flipped, setFlipped] = useState(false);
  const toggleFlip = () => setFlipped(!flipped);

  // Стили в нейтральных цветах – строгие и стильные
  const getStyles = () => {
    switch (variant) {
      case 'Cyberpunk': // Dark Slate
        return {
          background: '#1e1e2e',
          color: '#cdd6f4',
          border: '1px solid #45475a',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          accentColor: '#89b4fa',       // мягкий синий
          secondaryAccent: '#a6adc8',   // серо-голубой
          textColor: '#cdd6f4',
        };
      case 'Tokyo': // Light Minimal
        return {
          background: '#fcfcfc',
          color: '#2d2d2d',
          border: '1px solid #e8e8e8',
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          accentColor: '#555555',
          secondaryAccent: '#888888',
          textColor: '#2d2d2d',
        };
      case 'Coffee': // Warm Sand
      default:
        return {
          background: '#f5efe6',
          color: '#3e2e23',
          border: '1px solid #d4c5b2',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          fontFamily: "'Georgia', 'Times New Roman', serif",
          accentColor: '#8b6b4d',
          secondaryAccent: '#b89a7a',
          textColor: '#3e2e23',
        };
    }
  };

  const style = getStyles();

  return (
    <div
      style={{
        perspective: '1000px',
        width: '100%',
        maxWidth: '320px',
        cursor: 'pointer',
        borderRadius: '16px',
        margin: '0 auto',
      }}
      onClick={toggleFlip}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '140%',
          borderRadius: '16px',
          boxShadow: style.boxShadow,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
        >
          {/* ЛИЦЕВАЯ СТОРОНА */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              borderRadius: '16px',
              padding: '1.8rem',
              overflowY: 'auto',
              boxSizing: 'border-box',
              background: style.background,
              color: style.textColor,
              fontFamily: style.fontFamily,
              border: style.border,
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div
              style={{
                fontSize: '1.8rem',
                fontWeight: 600,
                textAlign: 'center',
                marginBottom: '1.2rem',
                paddingBottom: '0.5rem',
                borderBottom: `2px solid ${style.accentColor}40`,
                color: style.accentColor,
                letterSpacing: '-0.3px',
              }}
            >
              Serendipity
            </div>
            <div style={{ marginTop: '1rem' }}>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '0.5rem',
                  color: style.secondaryAccent,
                }}
              >
                📚 Examples
              </div>
              <div
                style={{
                  fontStyle: 'italic',
                  margin: '0.5rem 0',
                  lineHeight: '1.5',
                  fontSize: '0.95rem',
                  background: 'rgba(255,255,255,0.05)',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  borderLeft: `3px solid ${style.accentColor}`,
                }}
              >
                “A serendipitous encounter changed his life.”
              </div>
              <div
                style={{
                  fontStyle: 'italic',
                  margin: '0.5rem 0',
                  lineHeight: '1.5',
                  fontSize: '0.95rem',
                  background: 'rgba(255,255,255,0.05)',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  borderLeft: `3px solid ${style.accentColor}`,
                }}
              >
                “Finding that book was pure serendipity.”
              </div>
            </div>
          </div>

          {/* ОБРАТНАЯ СТОРОНА */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderRadius: '16px',
              padding: '1.8rem',
              overflowY: 'auto',
              boxSizing: 'border-box',
              background: style.background,
              color: style.textColor,
              fontFamily: style.fontFamily,
              border: style.border,
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div
              style={{
                fontSize: '1.8rem',
                fontWeight: 600,
                textAlign: 'center',
                marginBottom: '1.2rem',
                paddingBottom: '0.5rem',
                borderBottom: `2px solid ${style.accentColor}40`,
                color: style.accentColor,
                letterSpacing: '-0.3px',
              }}
            >
              Serendipity
            </div>
            <div style={{ marginBottom: '0.8rem' }}>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '0.3rem',
                  color: style.secondaryAccent,
                }}
              >
                📖 Meaning
              </div>
              <div style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                The occurrence of events by chance in a happy or beneficial way.
              </div>
            </div>
            <div style={{ marginBottom: '0.8rem' }}>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '0.3rem',
                  color: style.secondaryAccent,
                }}
              >
                🔄 Synonyms
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {['chance', 'fortuity', 'providence', 'happy accident'].map((word) => (
                  <span
                    key={word}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      padding: '0.2rem 0.7rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      border: `1px solid ${style.accentColor}30`,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '0.8rem' }}>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '0.3rem',
                  color: style.secondaryAccent,
                }}
              >
                ⚡ Antonyms
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {['misfortune', 'calamity', 'doom'].map((word) => (
                  <span
                    key={word}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      padding: '0.2rem 0.7rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      border: `1px solid #ef444440`,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '0.8rem' }}>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '0.3rem',
                  color: style.secondaryAccent,
                }}
              >
                📚 Part of Speech
              </div>
              <div style={{ fontWeight: 600, fontStyle: 'italic', color: style.accentColor }}>
                Noun
              </div>
            </div>
            <div>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '0.3rem',
                  color: style.secondaryAccent,
                }}
              >
                🔗 Related Words
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {['serendipitous (adj.)', 'serendipitously (adv.)'].map((word) => (
                  <span
                    key={word}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      padding: '0.2rem 0.7rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      border: `1px solid ${style.accentColor}30`,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary, #888)' }}>
        Кликни, чтобы перевернуть
      </div>
    </div>
  );
};

export default CardPreview;