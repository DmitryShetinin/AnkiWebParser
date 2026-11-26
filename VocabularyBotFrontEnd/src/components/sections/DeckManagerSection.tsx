import React, { useState, useMemo, useCallback } from 'react';
import { styles } from '../sections/styles/DeckManagerSection.styles.ts';

// ─── Типы ─────────────────────────────────────────────────────────────────────
export interface DeckCard {
  id: string;
  word: string;
  partOfSpeech: string;
  definition: string;
  externalId?: string;
  examples: string[];
  synonyms: string[];
  antonyms: string[];
  relatedWords: string[];
}

export interface Deck {
  id: string;
  name: string;
  description?: string;
  cards: DeckCard[];
}

// ─── Моковые данные ─────────────────────────────────────────────────────────
const mockDecks: Deck[] = [
  {
    id: '1',
    name: 'Английский – базовый',
    description: 'Повседневные слова и фразы',
    cards: [
      {
        id: 'a1',
        word: 'apple',
        partOfSpeech: 'noun',
        definition: 'яблоко',
        examples: ['I eat an apple.', 'She bought apples.'],
        synonyms: ['fruit'],
        antonyms: [],
        relatedWords: ['orchard', 'pie'],
      },
      {
        id: 'a2',
        word: 'run',
        partOfSpeech: 'verb',
        definition: 'бежать',
        examples: ['I run every morning.', 'He runs fast.'],
        synonyms: ['sprint', 'jog'],
        antonyms: ['walk'],
        relatedWords: ['runner', 'race'],
      },
      {
        id: 'a3',
        word: 'beautiful',
        partOfSpeech: 'adjective',
        definition: 'красивый',
        examples: ['A beautiful sunset.', 'She is beautiful.'],
        synonyms: ['pretty', 'gorgeous'],
        antonyms: ['ugly'],
        relatedWords: ['beauty'],
      },
      ...Array.from({ length: 35 }, (_, i) => ({
        id: `a${i + 4}`,
        word: `word${i + 4}`,
        partOfSpeech: 'noun',
        definition: `определение ${i + 4}`,
        examples: [`Пример ${i + 4}`],
        synonyms: [],
        antonyms: [],
        relatedWords: [],
      })),
    ],
  },
  {
    id: '2',
    name: 'Испанский – глаголы',
    description: 'Основные глаголы и спряжения',
    cards: [
      {
        id: 's1',
        word: 'ser',
        partOfSpeech: 'verb',
        definition: 'быть',
        examples: ['Yo soy estudiante.', 'Ella es doctora.'],
        synonyms: ['estar (временно)'],
        antonyms: [],
        relatedWords: ['ser humano'],
      },
      {
        id: 's2',
        word: 'estar',
        partOfSpeech: 'verb',
        definition: 'находиться',
        examples: ['Estoy en casa.', '¿Dónde estás?'],
        synonyms: ['quedarse'],
        antonyms: [],
        relatedWords: ['estado'],
      },
      {
        id: 's3',
        word: 'tener',
        partOfSpeech: 'verb',
        definition: 'иметь',
        examples: ['Tengo un perro.', 'Ella tiene 20 años.'],
        synonyms: ['poseer'],
        antonyms: [],
        relatedWords: ['tenedor'],
      },
      ...Array.from({ length: 20 }, (_, i) => ({
        id: `s${i + 4}`,
        word: `verb${i + 4}`,
        partOfSpeech: 'verb',
        definition: `глагол ${i + 4}`,
        examples: [`Пример ${i + 4}`],
        synonyms: [],
        antonyms: [],
        relatedWords: [],
      })),
    ],
  },
  {
    id: '3',
    name: 'Немецкий – существительные',
    description: 'Слова с артиклями',
    cards: [
      {
        id: 'g1',
        word: 'Haus',
        partOfSpeech: 'noun',
        definition: 'дом',
        examples: ['Das Haus ist groß.', 'Wir wohnen in einem Haus.'],
        synonyms: ['Gebäude'],
        antonyms: [],
        relatedWords: ['Hausaufgabe'],
      },
      {
        id: 'g2',
        word: 'Auto',
        partOfSpeech: 'noun',
        definition: 'машина',
        examples: ['Das Auto ist neu.', 'Er fährt mit dem Auto.'],
        synonyms: ['Wagen'],
        antonyms: [],
        relatedWords: ['Autobahn'],
      },
      {
        id: 'g3',
        word: 'Buch',
        partOfSpeech: 'noun',
        definition: 'книга',
        examples: ['Ich lese ein Buch.', 'Das Buch ist interessant.'],
        synonyms: ['Lektüre'],
        antonyms: [],
        relatedWords: ['Bücherei'],
      },
    ],
  },
];

const PAGE_SIZE = 12;

// ─── Компонент ───────────────────────────────────────────────────────────────
const DeckManagerSection: React.FC = () => {
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [markedCards, setMarkedCards] = useState<Set<string>>(new Set());
  const [showOnlyMarked, setShowOnlyMarked] = useState(false);

  // Активная колода
  const activeDeck = useMemo(
    () => mockDecks.find((deck) => deck.id === activeDeckId) || null,
    [activeDeckId]
  );

  // Фильтрация карточек
  const filteredCards = useMemo(() => {
    if (!activeDeck) return [];

    const query = searchQuery.trim().toLowerCase();
    let result = activeDeck.cards;

    if (query) {
      result = result.filter(
        (card) =>
          card.word.toLowerCase().includes(query) ||
          card.definition.toLowerCase().includes(query) ||
          (card.examples &&
            card.examples.some((ex) => ex.toLowerCase().includes(query)))
      );
    }

    if (showOnlyMarked) {
      result = result.filter((card) => markedCards.has(card.id));
    }

    return result;
  }, [activeDeck, searchQuery, showOnlyMarked, markedCards]);

  // Пагинация
  const totalPages = Math.ceil(filteredCards.length / PAGE_SIZE);

  // Сброс страницы при изменении фильтров
  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    resetPage();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    resetPage();
  };

  const handleToggleMarked = (cardId: string) => {
    setMarkedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const handleDeckClick = (deckId: string) => {
    if (activeDeckId === deckId) {
      setActiveDeckId(null);
      setSearchQuery('');
      setMarkedCards(new Set());
      setShowOnlyMarked(false);
    } else {
      setActiveDeckId(deckId);
      setSearchQuery('');
      setMarkedCards(new Set());
      setShowOnlyMarked(false);
    }
    resetPage();
  };

  // Текущие карточки для отображения
  const paginatedCards = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredCards.slice(start, start + PAGE_SIZE);
  }, [filteredCards, currentPage]);

  // Обработчики пагинации
  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={styles.container}>
      {/* Список колод */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarTitle}>📚 Колоды</h2>
        </div>
        <div style={styles.deckList}>
          {mockDecks.map((deck) => (
            <div
              key={deck.id}
              style={{
                ...styles.deckItem,
                ...(deck.id === activeDeckId ? styles.deckItemActive : {}),
              }}
              onClick={() => handleDeckClick(deck.id)}
            >
              <div style={styles.deckItemInfo}>
                <div style={styles.deckName}>{deck.name}</div>
                <div style={styles.deckDescription}>{deck.description || ''}</div>
              </div>
              <span style={styles.deckCount}>{deck.cards.length}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Основная область */}
      <main style={styles.main}>
        {!activeDeck ? (
          <div style={styles.placeholder}>
            <div style={styles.placeholderIcon}>🃏</div>
            <div style={styles.placeholderText}>
              Выберите колоду слева, чтобы увидеть карточки
            </div>
          </div>
        ) : (
          <div style={styles.deckContent}>
            {/* Заголовок колоды */}
            <div style={styles.deckHeader}>
              <div>
                <h1 style={styles.deckTitle}>{activeDeck.name}</h1>
                <p style={styles.deckSubtitle}>{activeDeck.description || ''}</p>
              </div>
              <label style={styles.filterCheckbox}>
                <input
                  type="checkbox"
                  checked={showOnlyMarked}
                  onChange={(e) => {
                    setShowOnlyMarked(e.target.checked);
                    resetPage();
                  }}
                />
                Показывать только на доске
              </label>
            </div>

            {/* Поиск */}
            <div style={styles.searchBox}>
              <input
                type="text"
                placeholder="Поиск по слову, определению или примеру..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={styles.searchInput}
              />
              {searchQuery && (
                <button style={styles.clearButton} onClick={handleClearSearch}>
                  ✕
                </button>
              )}
            </div>

            {/* Информация о количестве */}
            <div style={styles.resultsInfo}>
              Найдено: {filteredCards.length} из {activeDeck.cards.length}
            </div>

            {/* Обёртка для списка карточек с прокруткой */}
            <div style={styles.cardsWrapper}>
              <div style={styles.cardsList}>
                {paginatedCards.length === 0 ? (
                  <div style={styles.noResults}>Ничего не найдено</div>
                ) : (
                  paginatedCards.map((card) => (
                    <div key={card.id} style={styles.cardItem}>
                      <div style={styles.cardTop}>
                        <input
                          type="checkbox"
                          style={styles.cardCheckbox}
                          checked={markedCards.has(card.id)}
                          onChange={() => handleToggleMarked(card.id)}
                        />
                        <span style={styles.cardWord}>{card.word}</span>
                        <span style={styles.cardPos}>{card.partOfSpeech || ''}</span>
                      </div>
                      <div style={styles.cardDefinition}>{card.definition}</div>
                      {card.examples.length > 0 && (
                        <div style={styles.cardExample}>{card.examples[0]}</div>
                      )}
                      <div style={styles.cardExtra}>
                        {card.synonyms.length > 0 && (
                          <span>Синонимы: {card.synonyms.join(', ')}</span>
                        )}
                        {card.antonyms.length > 0 && (
                          <span>Антонимы: {card.antonyms.join(', ')}</span>
                        )}
                        {card.relatedWords.length > 0 && (
                          <span>Связанные: {card.relatedWords.join(', ')}</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Пагинация – всегда внизу */}
            {totalPages > 1 && (
              <div style={styles.pagination}>
                <button
                  style={styles.pageButton}
                  disabled={currentPage <= 1}
                  onClick={goToPrevPage}
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    style={{
                      ...styles.pageButton,
                      ...(page === currentPage ? styles.pageButtonActive : {}),
                    }}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  style={styles.pageButton}
                  disabled={currentPage >= totalPages}
                  onClick={goToNextPage}
                >
                  ›
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default DeckManagerSection;