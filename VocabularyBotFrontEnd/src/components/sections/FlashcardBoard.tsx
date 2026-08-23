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
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const handleRating = (rating: 'again' | 'bad' | 'good') => {
    if (onCardReviewed) {
      onCardReviewed(currentCard.id, rating);
    }

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
        <p>Нет карточек для изучения.</p>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div style={styles.completedContainer}>
        <h2 style={styles.completedTitle}>🎉 Поздравляю!</h2>
        <p style={styles.completedText}>Все карточки пройдены. Отличная работа!</p>
        <button onClick={reset} style={styles.resetButton}>
          Начать заново
        </button>
      </div>
    );
  }

  const back = currentCard.back;

  return (
    <div style={styles.container}>
      {/* Прогресс */}
      <div style={styles.progressContainer}>
        <span style={styles.progressText}>
          {currentIndex + 1} / {cards.length}
        </span>
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${((currentIndex) / cards.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Карточка */}
      <div style={styles.cardWrapper} onClick={handleFlip}>
        <div
          style={{
            ...styles.cardInner,
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
          }}
        >
          {/* Лицевая сторона */}
          <div style={styles.cardFront}>
            <div style={styles.cardWord}>{currentCard.front}</div>
            {back.partOfSpeech && (
              <div style={styles.cardPos}>{back.partOfSpeech}</div>
            )}
          </div>

          {/* Обратная сторона */}
          <div style={styles.cardBack}>
            <div style={styles.cardWordBack}>{currentCard.front}</div>

            <div style={styles.block}>
              <div style={styles.label}>📖 Meaning</div>
              <div style={styles.meaningText}>{back.meaning}</div>
            </div>

            {back.synonyms && back.synonyms.length > 0 && (
              <div style={styles.block}>
                <div style={styles.label}>🔄 Synonyms</div>
                <div style={styles.chipContainer}>
                  {back.synonyms.map((syn) => (
                    <span key={syn} style={styles.chip}>
                      {syn}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {back.antonyms && back.antonyms.length > 0 && (
              <div style={styles.block}>
                <div style={styles.label}>⚡ Antonyms</div>
                <div style={styles.chipContainer}>
                  {back.antonyms.map((ant) => (
                    <span key={ant} style={{ ...styles.chip, ...styles.chipAntonym }}>
                      {ant}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {back.partOfSpeech && (
              <div style={styles.block}>
                <div style={styles.label}>📚 Part of Speech</div>
                <div style={styles.posValue}>{back.partOfSpeech}</div>
              </div>
            )}

            {back.relatedWords && back.relatedWords.length > 0 && (
              <div style={styles.block}>
                <div style={styles.label}>🔗 Related Words</div>
                <div style={styles.chipContainer}>
                  {back.relatedWords.map((rel) => (
                    <span key={rel} style={styles.chip}>
                      {rel}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Кнопки управления – цветные как раньше */}
      <div style={styles.actionsContainer}>
        <button
          style={{ ...styles.btnAgain, backgroundColor: '#ef4444' }}
          onClick={() => handleRating('again')}
        >
          🔄 Again
        </button>
        <button
          style={{ ...styles.btnBad, backgroundColor: '#f59e0b' }}
          onClick={() => handleRating('bad')}
        >
          ⚡ Bad
        </button>
        <button
          style={{ ...styles.btnGood, backgroundColor: '#10b981' }}
          onClick={() => handleRating('good')}
        >
          ✅ Good
        </button>
      </div>
    </div>
  );
};

export default FlashcardBoard;