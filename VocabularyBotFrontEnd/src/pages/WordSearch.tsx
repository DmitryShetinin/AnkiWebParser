import React, { useEffect, useState } from 'react';

import Sidebar from '../components/Sidebar.tsx';
import ProgramSection from '../components/sections/ProgramSection.tsx';
import SettingsSection from '../components/sections/SettingsSection.tsx';
import AboutSection from '../components/sections/AboutSection.tsx';
import RegistrationSection from '../components/sections/RegistrationSection.tsx';
import InstructionSection from '../components/sections/InstructionSection.tsx';
import { useAuth } from '../auth/AuthProvider.tsx';

import FlashcardBoard from '../components/sections/FlashcardBoard.tsx';
import { Flashcard } from '../components/sections/FlashcardBoard.tsx';
import { apiClient } from '../api/client.ts';
import { LocalWordStorage } from '../words/LocalWordStorage.ts';
import { ApiWordStorage } from '../words/ApiWordStorage.ts';
import { DictionaryCard, StoredWord } from '../words/types.ts';
import DeckManagerSection from '../components/sections/DeckManagerSection.tsx';

const wordStorage = new LocalWordStorage();
const apiWordStorage = new ApiWordStorage();
const api = apiClient;

export interface Notification {
  id: number;
  word: string;
  type: 'success' | 'error' | 'info';
  time: string;
  message: string;
  details?: string[];
}

export interface CSSProperties {
  [key: string]: string | number;
}

export interface MenuItem {
  id: string;
  title: string;
  emoji: string;
  component: React.ReactNode;
  badge?: number;
}

function WordSearch() {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [collection, setCollection] = useState<StoredWord[]>([]);
  const [guestCardsToImport, setGuestCardsToImport] = useState<StoredWord[]>([]);
  const [ankiConnected, setAnkiConnected] = useState<boolean | null>(null);
  const [checkingAnki, setCheckingAnki] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>('program');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const loadCollection = async () => {
      if (!isAuthenticated) {
        setGuestCardsToImport([]);
        setCollection(await wordStorage.getAll());
        return;
      }

      const [cloudCards, guestCards] = await Promise.all([
        apiWordStorage.getAll(),
        wordStorage.getAll(),
      ]);

      setCollection(cloudCards);
      setGuestCardsToImport(guestCards);
    };

    void loadCollection();
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && activeMenu === 'auth') {
      setActiveMenu('program');
    }
  }, [activeMenu, isAuthenticated]);

  const addCardsToCollection = async (cards: DictionaryCard[]) => {
    const existingIds = new Set(collection.map((card) => card.externalId));
    const cardsToAdd = cards
      .filter((card) => !existingIds.has(card.externalId))
      .map((card) => ({
        ...card,
        id: card.externalId,
        addedAt: new Date().toISOString(),
      }));

    const storage = isAuthenticated ? apiWordStorage : wordStorage;
    await Promise.all(cardsToAdd.map((card) => storage.add(card)));
    setCollection((currentCollection) => [...currentCollection, ...cardsToAdd]);

    return cardsToAdd.length;
  };

  const importGuestCards = async () => {
    await Promise.all(guestCardsToImport.map((card) => apiWordStorage.add(card)));
    setCollection(await apiWordStorage.getAll());
    setGuestCardsToImport([]);
    addNotification({
      word: '',
      type: 'success',
      message: '✅ Локальные карточки перенесены в аккаунт.',
    });
  };

  const flashcards: Flashcard[] = collection.map((card) => ({
    id: card.id,
    front: card.word,
    back: {
      meaning: card.definition,
      example: card.examples[0],
      partOfSpeech: card.partOfSpeech,
      synonyms: card.synonyms,
      antonyms: card.antonyms,
      relatedWords: card.relatedWords,
    },
  }));

  const addNotification = (
    notification: Omit<Notification, 'id' | 'time'>
  ) => {
    const newNotification: Notification = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      ...notification,
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const saveApiKey = async (apiKey: string) => {
    try {
      await api.post(
        `/api/settings?request=${encodeURIComponent(apiKey)}`
      );

      addNotification({
        word: '',
        type: 'success',
        message: '✅ API ключ установлен',
      });
    } catch (error) {
      console.error('Failed to save API key:', error);

      addNotification({
        word: '',
        type: 'error',
        message: '❌ API ключ не установился',
      });
    }
  };

  const checkAnkiStatus = async (
    showNotification: boolean = true
  ) => {
    setCheckingAnki(true);

    try {
      const response = await api.get('/api/status');

      const isConnected = response.status === 200;

      setAnkiConnected(isConnected);

      if (!showNotification) {
        return;
      }

      if (isConnected) {
        addNotification({
          word: '',
          type: 'success',
          message: `✅ Anki подключен (колод: ${response.data.decks?.length || 0
            })`,
        });
      } else {
        addNotification({
          word: '',
          type: 'error',
          message:
            '❌ Anki не подключен. Запустите Anki с плагином AnkiConnect',
        });
      }
    } catch (error) {
      console.error('Error checking Anki status:', error);

      setAnkiConnected(false);

      if (showNotification) {
        addNotification({
          word: '',
          type: 'error',
          message: '❌ Не удалось подключиться к серверу',
        });
      }
    } finally {
      setCheckingAnki(false);
    }
  };

  const menuItems: MenuItem[] = [
    {
      id: 'program',
      title: 'Программа',
      emoji: '🎴',
      component: (
        <ProgramSection
          notifications={notifications}
          ankiConnected={ankiConnected}
          checkingAnki={checkingAnki}
          checkAnkiStatus={checkAnkiStatus}
          addNotification={addNotification}
          clearNotifications={clearNotifications}
          api={apiClient}
          onAddCards={addCardsToCollection}
        />
      ),
      badge:
        notifications.length > 0
          ? notifications.length
          : undefined,
    },
    {
      id: 'flashcards',
      title: 'Карточки',
      emoji: '🃏',
      component: <FlashcardBoard cards={flashcards} />,
    },
    {
    id: 'decks',
    title: 'Колоды',
    emoji: '📚',
    component: <DeckManagerSection />,
    },
    {
      id: 'instructions',
      title: 'Инструкция',
      emoji: '📖',
      component: <InstructionSection />,
    },

    // 👇 НОВЫЙ ПУНКТ МЕНЮ — КАРТОЧКИ


    {
      id: 'settings',
      title: 'Настройки',
      emoji: '⚙️',
      component: (
        <SettingsSection
          ankiConnected={ankiConnected}
          checkingAnki={checkingAnki}
          checkAnkiStatus={checkAnkiStatus}
          saveApiKey={saveApiKey}
        />
      ),
    },

    {
      id: 'about',
      title: 'О нас',
      emoji: 'ℹ️',
      component: <AboutSection />,
    },

    ...(!isAuthenticated ? [{
      id: 'auth',
      title: 'Войти / Регистрация',
      emoji: '👤',
      component: <RegistrationSection />,
    }] : []),

  ];

  const styles: { [key: string]: CSSProperties } = {
    container: {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: 'var(--bg)',
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },

    contentArea: {
      flex: 1,
      width: '100%',
      minWidth: 0,
      minHeight: '100vh',

      marginLeft: sidebarCollapsed
        ? '0'
        : '250px',

      padding: '2rem',

      boxSizing: 'border-box',

      transition: 'margin-left 0.3s ease',

      overflowX: 'hidden',
      overflowY: 'auto',
    },

    contentWrapper: {
      width: '100%',
      maxWidth: 'none',
      margin: '0',
      padding: '0',
      boxSizing: 'border-box',
    },

    toggleButton: {
      position: 'fixed',

      top: '1rem',

      left: sidebarCollapsed
        ? '1rem'
        : 'calc(250px + 1rem)',

      width: '40px',
      height: '40px',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      backgroundColor: 'var(--primary)',
      color: 'white',

      border: 'none',
      borderRadius: '0.5rem',

      cursor: 'pointer',

      zIndex: 1000,

      transition: 'left 0.3s ease, background-color 0.2s ease',

      boxShadow:
        '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
  };

  const activeComponent = menuItems.find(
    (item) => item.id === activeMenu
  )?.component;

  return (
    <div style={styles.container}>

      <Sidebar
        menuItems={menuItems}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        collapsed={sidebarCollapsed}
      />

      <main style={styles.contentArea}>

        <button
          onClick={toggleSidebar}
          style={styles.toggleButton}
          title={
            sidebarCollapsed
              ? 'Показать меню'
              : 'Скрыть меню'
          }
        >
          {sidebarCollapsed ? '→' : '←'}
        </button>

        <div style={styles.contentWrapper}>
          {isAuthenticated && guestCardsToImport.length > 0 && (
            <div style={{
              marginBottom: '1rem', padding: '1rem', borderRadius: '0.75rem',
              backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)',
            }}>
              В локальной коллекции {guestCardsToImport.length} карточек. Импортировать их в аккаунт?
              <button onClick={importGuestCards} style={{ marginLeft: '1rem' }}>Импортировать</button>
              <button onClick={() => setGuestCardsToImport([])} style={{ marginLeft: '0.5rem' }}>Позже</button>
            </div>
          )}
          {activeComponent}
        </div>

      </main>

    </div>
  );
}

export default WordSearch;
