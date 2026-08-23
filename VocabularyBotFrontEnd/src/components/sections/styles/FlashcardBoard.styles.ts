// src/components/FlashcardBoard.styles.ts
import { CSSProperties } from 'react';

export const styles: { [key: string]: CSSProperties } = {
  container: {
    width: '90%',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#1f2a30',
    color: '#e6edf3',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    border: '1px solid #3a4a54',
  },

  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    color: '#9aabb8',
  },

  completedContainer: {
    textAlign: 'center',
    padding: '3rem 0',
  },

  completedTitle: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#e6edf3',
  },

  completedText: {
    color: '#9aabb8',
    marginBottom: '2rem',
    fontSize: '1.1rem',
  },

  resetButton: {
    padding: '0.8rem 2rem',
    backgroundColor: '#4a5a68',
    color: '#e6edf3',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },

  progressContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    color: '#9aabb8',
    fontSize: '0.9rem',
  },

  progressText: {
    flexShrink: 0,
    marginRight: '1.5rem',
    fontWeight: 500,
  },

  progressBar: {
    flex: 1,
    height: '6px',
    backgroundColor: '#2d3a44',
    borderRadius: '999px',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#7a8b9b',
    borderRadius: '999px',
    transition: 'width 0.4s ease',
  },

  cardWrapper: {
    perspective: '1000px',
    marginBottom: '2rem',
    cursor: 'pointer',
    width: '100%',
    height: '520px',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },

  cardInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    transformStyle: 'preserve-3d' as const,
    boxSizing: 'border-box',
  },

  cardFront: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden' as const,
    borderRadius: '24px',
    padding: '2.5rem',
    backgroundColor: '#1f2a30',
    boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
    border: '1px solid #3a4a54',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
  },

  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden' as const,
    transform: 'rotateY(180deg)',
    borderRadius: '24px',
    padding: '2rem 1.8rem',
    backgroundColor: '#1f2a30',
    boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
    border: '1px solid #3a4a54',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-start',
    overflowY: 'auto' as const,
    boxSizing: 'border-box',
  },

  cardWord: {
    fontSize: '3rem',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: '0.5rem',
    color: '#e6edf3',
    lineHeight: '1.2',
    letterSpacing: '-0.5px',
  },

  cardWordBack: {
    fontSize: '1.8rem',
    fontWeight: 600,
    textAlign: 'center',
    color: '#e6edf3',
    marginBottom: '1rem',
    borderBottom: '2px solid #3a4a54',
    paddingBottom: '0.5rem',
  },

  cardPos: {
    fontWeight: 500,
    color: '#7a8b9b',
    textAlign: 'center',
    fontSize: '1rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },

  block: {
    marginBottom: '0.9rem',
  },

  label: {
    fontWeight: 500,
    fontSize: '0.7rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    color: '#9aabb8',
    marginBottom: '0.3rem',
  },

  meaningText: {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#bcc9d4',
  },

  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.3rem',
    justifyContent: 'center',     // ← теперь чипы по центру
    maxWidth: '100%',            // ← чтобы не вылезали
  },

  chip: {
    background: 'rgba(255,255,255,0.06)',
    padding: '0.15rem 0.7rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    color: '#bcc9d4',
    border: '1px solid #3a4a54',
    lineHeight: '1.6',
  },

  chipAntonym: {
    borderColor: '#5a4a4a',
    color: '#b08888',
  },

  posValue: {
    fontWeight: 600,
    fontStyle: 'italic',
    color: '#7a8b9b',
    fontSize: '1rem',
  },

  actionsContainer: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  },

  btnAgain: {
    minWidth: '120px',
    padding: '0.8rem 1.5rem',
    border: 'none',
    borderRadius: '14px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    color: 'white',
    transition: 'background 0.2s, transform 0.1s',
  },

  btnBad: {
    minWidth: '120px',
    padding: '0.8rem 1.5rem',
    border: 'none',
    borderRadius: '14px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    color: 'white',
    transition: 'background 0.2s, transform 0.1s',
  },

  btnGood: {
    minWidth: '120px',
    padding: '0.8rem 1.5rem',
    border: 'none',
    borderRadius: '14px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    color: 'white',
    transition: 'background 0.2s, transform 0.1s',
  },
};