// src/components/CardPreview.tsx
import React, { useState } from 'react';

interface CardPreviewProps {
  variant: 'Style 1' | 'Style 2' | 'Style 3';
}

const CardPreview: React.FC<CardPreviewProps> = ({ variant }) => {
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = () => setFlipped(!flipped);

  const versionClass =
    variant === 'Style 1' ? 'version-1' : variant === 'Style 2' ? 'version-2' : 'version-3';

  return (
    <div
      style={{
        perspective: '1000px',
        width: '100%',
        maxWidth: '320px',
        cursor: 'pointer',
        borderRadius: '20px',
      }}
      onClick={toggleFlip}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '140%',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
        }}
        className={versionClass}
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
              borderRadius: '20px',
              padding: '1.8rem',
              overflowY: 'auto',
              scrollbarGutter: 'stable',
              boxSizing: 'border-box',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
              backgroundColor: variant === 'Style 1' ? '#ffffff' : variant === 'Style 2' ? '#f8faff' : '#0b1120',
              color: variant === 'Style 3' ? '#e2e8f0' : '#1e293b',
              fontFamily: variant === 'Style 1' ? 'Georgia, serif' : 'Inter, sans-serif',
            }}
          >
            <div
              style={{
                fontSize: variant === 'Style 1' ? '30px' : variant === 'Style 2' ? '28px' : '30px',
                fontWeight: 700,
                textAlign: 'center',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom:
                  variant === 'Style 1'
                    ? '3px double #c9a84c'
                    : variant === 'Style 2'
                    ? '3px solid #3b82f6'
                    : '2px solid #facc15',
                color:
                  variant === 'Style 1' ? '#1e3a5f' : variant === 'Style 2' ? '#0f172a' : '#facc15',
                letterSpacing: '-0.3px',
              }}
            >
              Serendipity
            </div>
            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #e9edf2' }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '6px',
                  color: variant === 'Style 1' ? '#8b6b2c' : variant === 'Style 2' ? '#3b82f6' : '#facc15',
                }}
              >
                📚 Examples
              </div>
              <div
                style={{
                  fontStyle: 'italic',
                  margin: '4px 0',
                  lineHeight: '1.4',
                  fontSize: '14px',
                  background: variant === 'Style 1' ? '#f8fafc' : variant === 'Style 2' ? '#eef2ff' : '#1e293b',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  borderLeft: variant === 'Style 1' ? '4px solid #c9a84c' : variant === 'Style 2' ? '4px solid #3b82f6' : '4px solid #10b981',
                  color: variant === 'Style 1' ? '#2d6a4f' : variant === 'Style 2' ? '#1e40af' : '#a7f3d0',
                }}
              >
                “A serendipitous encounter changed his life.”
              </div>
              <div
                style={{
                  fontStyle: 'italic',
                  margin: '4px 0',
                  lineHeight: '1.4',
                  fontSize: '14px',
                  background: variant === 'Style 1' ? '#f8fafc' : variant === 'Style 2' ? '#eef2ff' : '#1e293b',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  borderLeft: variant === 'Style 1' ? '4px solid #c9a84c' : variant === 'Style 2' ? '4px solid #3b82f6' : '4px solid #10b981',
                  color: variant === 'Style 1' ? '#2d6a4f' : variant === 'Style 2' ? '#1e40af' : '#a7f3d0',
                  marginTop: '4px',
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
              borderRadius: '20px',
              padding: '1.8rem',
              overflowY: 'auto',
              scrollbarGutter: 'stable',
              boxSizing: 'border-box',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
              backgroundColor: variant === 'Style 1' ? '#ffffff' : variant === 'Style 2' ? '#f8faff' : '#0b1120',
              color: variant === 'Style 3' ? '#e2e8f0' : '#1e293b',
              fontFamily: variant === 'Style 1' ? 'Georgia, serif' : 'Inter, sans-serif',
            }}
          >
            <div
              style={{
                fontSize: variant === 'Style 1' ? '30px' : variant === 'Style 2' ? '28px' : '30px',
                fontWeight: 700,
                textAlign: 'center',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom:
                  variant === 'Style 1'
                    ? '3px double #c9a84c'
                    : variant === 'Style 2'
                    ? '3px solid #3b82f6'
                    : '2px solid #facc15',
                color:
                  variant === 'Style 1' ? '#1e3a5f' : variant === 'Style 2' ? '#0f172a' : '#facc15',
                letterSpacing: '-0.3px',
              }}
            >
              Serendipity
            </div>
            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #e9edf2' }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '6px',
                  color: variant === 'Style 1' ? '#8b6b2c' : variant === 'Style 2' ? '#3b82f6' : '#facc15',
                }}
              >
                📖 Meaning
              </div>
              <div style={{ fontSize: '15px', lineHeight: '1.5', color: variant === 'Style 3' ? '#f1f5f9' : '#1e293b' }}>
                The occurrence of events by chance in a happy or beneficial way.
              </div>
            </div>
            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #e9edf2' }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '6px',
                  color: variant === 'Style 1' ? '#8b6b2c' : variant === 'Style 2' ? '#3b82f6' : '#facc15',
                }}
              >
                🔄 Synonyms
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}>
                {['chance', 'fortuity', 'providence', 'happy accident'].map((word) => (
                  <span
                    key={word}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      background: variant === 'Style 1' ? '#f1f5f9' : variant === 'Style 2' ? '#e2e8f0' : '#1e293b',
                      color: variant === 'Style 3' ? '#cbd5e1' : '#1e293b',
                      border: variant === 'Style 1' ? '1px solid #d1d9e6' : variant === 'Style 2' ? '1px solid #cbd5e1' : '1px solid #334155',
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #e9edf2' }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '6px',
                  color: variant === 'Style 1' ? '#8b6b2c' : variant === 'Style 2' ? '#3b82f6' : '#facc15',
                }}
              >
                ⚡ Antonyms
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}>
                {['misfortune', 'calamity', 'doom'].map((word) => (
                  <span
                    key={word}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      background: variant === 'Style 1' ? '#f1f5f9' : variant === 'Style 2' ? '#e2e8f0' : '#1e293b',
                      color: variant === 'Style 3' ? '#cbd5e1' : '#1e293b',
                      border: variant === 'Style 1' ? '1px solid #d1d9e6' : variant === 'Style 2' ? '1px solid #cbd5e1' : '1px solid #334155',
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #e9edf2' }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '6px',
                  color: variant === 'Style 1' ? '#8b6b2c' : variant === 'Style 2' ? '#3b82f6' : '#facc15',
                }}
              >
                📚 Part of Speech
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontStyle: 'italic',
                  color: variant === 'Style 1' ? '#6b4c2a' : variant === 'Style 2' ? '#8b5cf6' : '#a78bfa',
                }}
              >
                Noun
              </div>
            </div>
            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #e9edf2' }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '6px',
                  color: variant === 'Style 1' ? '#8b6b2c' : variant === 'Style 2' ? '#3b82f6' : '#facc15',
                }}
              >
                🔗 Related Words
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px' }}>
                {['serendipitous (adj.)', 'serendipitously (adv.)'].map((word) => (
                  <span
                    key={word}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      background: variant === 'Style 1' ? '#f1f5f9' : variant === 'Style 2' ? '#e2e8f0' : '#1e293b',
                      color: variant === 'Style 3' ? '#cbd5e1' : '#1e293b',
                      border: variant === 'Style 1' ? '1px solid #d1d9e6' : variant === 'Style 2' ? '1px solid #cbd5e1' : '1px solid #334155',
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
      <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.8rem', color: '#6b7280' }}>
        Кликни, чтобы перевернуть
      </div>
    </div>
  );
};

export default CardPreview;