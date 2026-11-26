import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { styles } from '../sections/styles/DeckManagerSection.styles.ts';
import { apiClient } from '../../api/client.ts';

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
const PAGE_SIZE = 12;

// ─── Компонент ───────────────────────────────────────────────────────────────
const DeckManagerSection: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [markedCards, setMarkedCards] = useState<Set<string>>(new Set());
  const [showOnlyMarked, setShowOnlyMarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    apiClient.get<Deck[]>('/api/decks')
      .then(({ data }) => {
        if (!cancelled) setDecks(data);
      })
      .catch((error) => {
        if (cancelled) return;
        setLoadError(error.response?.status === 401
          ? 'Войдите в аккаунт, чтобы открыть колоды из базы данных.'
          : 'Не удалось загрузить колоды из базы данных. Проверьте подключение к серверу.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  // Активная колода
  const activeDeck = useMemo(
    () => decks.find((deck) => deck.id === activeDeckId) || null,
    [activeDeckId, decks]
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
          {decks.map((deck) => (
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
          {isLoading && <div style={styles.sidebarMessage}>Загружаю колоды…</div>}
          {loadError && <div style={styles.sidebarMessage}>{loadError}</div>}
          {!isLoading && !loadError && decks.length === 0 && (
            <div style={styles.sidebarMessage}>Колоды появятся после сохранения первой карточки.</div>
          )}
        </div>
      </aside>

      {/* Основная область */}
      <main style={styles.main}>
        {!activeDeck ? (
          <div style={styles.placeholder}>
            <div style={styles.placeholderIcon}>🃏</div>
            <div style={styles.placeholderText}>
              {loadError || (isLoading
                ? 'Загружаю колоды…'
                : decks.length > 0
                  ? 'Выберите колоду слева, чтобы увидеть карточки'
                  : 'Сохраните первую карточку, чтобы создать колоду.')}
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
