// src/components/FlashcardBoard.tsx
import React, { useState, useEffect } from 'react';
import { styles } from '../../components/sections/styles/FlashcardBoard.styles.ts';

export interface Flashcard {
  id: string;
  front: string;
  back: {
    meaning: string;
    example?: string;
    partOfSpeech?: string;
    synonyms?: string[];
    antonyms?: string[];
    relatedWords?: string[];
  };
}

interface FlashcardBoardProps {
  cards: Flashcard[];
  onCardReviewed?: (cardId: string, rating: 'again' | 'bad' | 'good') => void;
}

const FlashcardBoard: React.FC<FlashcardBoardProps> = ({ cards, onCardReviewed }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentCard = cards[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsCompleted(false);
  }, [cards]);

  const handleFlip = () => {
    if (!isFlipped) setIsFlipped(true);
  };

  const handleRating = (rating: 'again' | 'bad' | 'good') => {
    onCardReviewed?.(currentCard.id, rating);

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      setIsCompleted(true);
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsCompleted(false);
  };

  if (!cards || cards.length === 0) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyIcon}>📭</div>
        <p style={styles.emptyText}>Нет карточек для изучения.</p>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div style={styles.completedContainer}>
        <div style={styles.completedIcon}>🎉</div>
        <h2 style={styles.completedTitle}>Поздравляю!</h2>
        <p style={styles.completedText}>Все карточки пройдены. Отличная работа!</p>
        <button onClick={reset} style={styles.resetButton}>
          Начать заново
        </button>
      </div>
    );
  }

  const back = currentCard.back;
  const progress = ((currentIndex + (isFlipped ? 0.5 : 0)) / cards.length) * 100;

  return (
    <div style={styles.container}>
      {/* Прогресс */}
      <div style={styles.progressContainer}>
        <div style={styles.progressHeader}>
          <span style={styles.progressLabel}>Прогресс</span>
          <span style={styles.progressText}>
            {currentIndex + 1} / {cards.length}
          </span>
        </div>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>
      </div>

      {/* Карточка */}
      <div style={styles.cardWrapper} onClick={handleFlip}>
        <div
          style={{
            ...styles.cardInner,
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* ЛИЦЕВАЯ СТОРОНА */}
          <div style={styles.cardFront}>
            <div style={styles.frontDecorTop} />
            <div style={styles.frontDecorBottom} />
            <div style={styles.frontContent}>
              <div style={styles.cardWord}>{currentCard.front}</div>

              {back.partOfSpeech && (
                <div style={styles.frontPosBadge}>{back.partOfSpeech}</div>
              )}

              {back.example && (
                <div
                  dangerouslySetInnerHTML={{ __html: back.example }}
                  style={styles.frontExample}
                />
              )}

              <div style={styles.flipHint}>👆 Нажми, чтобы перевернуть</div>
            </div>
          </div>

          {/* ОБРАТНАЯ СТОРОНА */}
          <div style={styles.cardBack}>
            <div style={styles.backHeader}>
              <div style={styles.backWord}>{currentCard.front}</div>
              {back.partOfSpeech && (
                <div style={styles.backPosBadge}>{back.partOfSpeech}</div>
              )}
            </div>

            <div style={styles.backScroll}>
              <div style={styles.block}>
                <div style={styles.label}>
                  <span style={styles.labelIcon}>📖</span>
                  <span>Meaning</span>
                </div>
                <div style={styles.meaningText}>{back.meaning}</div>
              </div>

              {back.synonyms && back.synonyms.length > 0 && (
                <div style={styles.block}>
                  <div style={styles.label}>
                    <span style={styles.labelIcon}>🔄</span>
                    <span>Synonyms</span>
                  </div>
                  <div style={styles.chipContainer}>
                    {back.synonyms.map((syn) => (
                      <span key={syn} style={styles.chipSyn}>
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {back.antonyms && back.antonyms.length > 0 && (
                <div style={styles.block}>
                  <div style={styles.label}>
                    <span style={styles.labelIcon}>⚡</span>
                    <span>Antonyms</span>
                  </div>
                  <div style={styles.chipContainer}>
                    {back.antonyms.map((ant) => (
                      <span key={ant} style={styles.chipAnt}>
                        {ant}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {back.relatedWords && back.relatedWords.length > 0 && (
                <div style={styles.block}>
                  <div style={styles.label}>
                    <span style={styles.labelIcon}>🔗</span>
                    <span>Related Words</span>
                  </div>
                  <div style={styles.chipContainer}>
                    {back.relatedWords.map((rel) => (
                      <span key={rel} style={styles.chipRel}>
                        {rel}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Кнопки управления */}
      <div style={styles.actionsContainer}>
        <button
          style={styles.btnAgain}
          onClick={() => handleRating('again')}
        >
          <span style={styles.btnIcon}>🔄</span>
          <span>Again</span>
        </button>
        <button
          style={styles.btnBad}
          onClick={() => handleRating('bad')}
        >
          <span style={styles.btnIcon}>⚡</span>
          <span>Bad</span>
        </button>
        <button
          style={styles.btnGood}
          onClick={() => handleRating('good')}
        >
          <span style={styles.btnIcon}>✅</span>
          <span>Good</span>
        </button>
      </div>
    </div>
  );
};

export default FlashcardBoard;