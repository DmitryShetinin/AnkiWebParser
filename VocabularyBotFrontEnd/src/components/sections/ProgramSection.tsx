import React, { useState } from 'react';
 
import NotificationItem from '../NotificationItem.tsx';
import { Notification } from '../types';
import { DictionaryCard } from '../../words/types.ts';
import { 
  styles, 
  getSearchButtonStyle, 
  getStatusBadgeStyle
} from './styles/ProgramSection.styles.ts'; 

interface ProgramSectionProps { 
  notifications: Notification[];
  ankiConnected: boolean | null;
  checkingAnki: boolean;
  checkAnkiStatus: (showNotification?: boolean) => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id' | 'time'>) => void;
  clearNotifications: () => void;
  api: any;
  onAddCards: (cards: DictionaryCard[]) => Promise<number>;
}

const ProgramSection: React.FC<ProgramSectionProps> = ({
  notifications,
  ankiConnected,
  checkingAnki,
  checkAnkiStatus,
  addNotification,
  clearNotifications,
  api,
  onAddCards,
}) => {
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(false);
  
   
  const searchWord = async () => {
  if (!word.trim()) return;
  const searchTerm = word.trim();
  setLoading(true);
  try {
    const response = await api.post<DictionaryCard[]>('/api/words', null, {
      params: {
        word: searchTerm,
        maxSynonyms: Number(localStorage.getItem('dictionary.maxSynonyms') ?? 5),
        maxAntonyms: Number(localStorage.getItem('dictionary.maxAntonyms') ?? 3),
        maxRelatedWords: Number(localStorage.getItem('dictionary.maxRelatedWords') ?? 5),
        maxExamples: Number(localStorage.getItem('dictionary.maxExamples') ?? 2),
      },
    });
    const cards = response.data;

    if (cards.length === 0) {
      addNotification({
        word: searchTerm,
        type: 'error',
        message: `❌ Слово "${searchTerm}" не найдено или не удалось распарсить`,
      });
      setWord('');
      return;
    }
    const addedCount = await onAddCards(cards);
    addNotification({
      word: searchTerm,
      type: 'success',
      message: addedCount > 0
        ? `✅ В коллекцию добавлено карточек: ${addedCount}.`
        : 'ℹ️ Эти карточки уже есть в коллекции.',
    });
    setWord('');
  } catch (error) {
    // Error handling as before
    console.error('Error searching word:', error);
    let errorMessage = 'Неизвестная ошибка';
    if (error.response) {
      if (error.response.status === 404) {
        errorMessage = `Слово "${searchTerm}" не найдено`;
      } else if (error.response.status === 400) {
        errorMessage = 'Некорректный запрос';
      } else if (error.response.status === 500) {
        errorMessage = 'Ошибка сервера';
      } else {
        errorMessage = error.response.data?.message || `Ошибка ${error.response.status}`;
      }
    } else if (error.request) {
      errorMessage = 'Нет ответа от сервера. Проверьте, запущен ли .NET API';
    } else {
      errorMessage = error.message;
    }
    addNotification({
      word: searchTerm,
      type: 'error',
      message: `❌ ${errorMessage}`
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={styles.container}>
      {/* Шапка */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          🎴 Vocabulary Bot
        </h1>
        <p style={styles.subtitle}>Найди слово → Добавь в свою коллекцию</p>
        
        {/* Статус Anki */}
        <div style={styles.statusContainer}>
          <button
            onClick={() => checkAnkiStatus(true)}
            disabled={checkingAnki}
            style={styles.statusButton}
          >
            {checkingAnki ? '🔄 Проверка...' : '🔄 Проверить Anki'}
          </button>
          
          {ankiConnected !== null && (
            <span style={getStatusBadgeStyle(ankiConnected)}>
              {ankiConnected ? '✅ Anki подключен' : '❌ Anki отключен'}
            </span>
          )}
        </div>
      </div>

      {/* Панель поиска */}
      <div style={styles.searchPanel}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && searchWord()}
            placeholder="Введите английское слово..."
            style={{
              ...styles.input,
              opacity: loading ? 0.6 : 1
            }}
            disabled={loading}
          />
          <button
            onClick={searchWord}
            disabled={loading || !word.trim()}
            style={getSearchButtonStyle(loading || !word.trim())}
          >
            {loading ? (
              <>
                <span style={{ marginRight: '0.5rem' }}>⏳</span>
                Ищем...
              </>
            ) : (
              <>
                <span style={{ marginRight: '0.5rem' }}>🔍</span>
                Найти слово
              </>
            )}
          </button>
        </div>
        
        {/* Подсказка */}
        <div style={styles.hint}>
          💡 Найдите слово — карточки сразу попадут в вашу коллекцию
        </div>
      </div>

      {/* Список уведомлений */}
      <div style={styles.notificationsPanel}>
        <div style={styles.panelHeader}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={styles.panelTitle}>
              История ({notifications.length})
            </h2>
            {notifications.length > 0 && (
              <button
                onClick={clearNotifications}
                style={styles.clearButton}
              >
                Очистить всё
              </button>
            )}
          </div>
        </div>

        {/* Прокручиваемая область */}
        <div style={styles.notificationsList}>
          {notifications.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={{ fontSize: '1.125rem' }}>Нет уведомлений</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Найдите первое слово</p>
            </div>
          ) : (
            <div>
              {notifications.map((item) => (
                <div key={item.id} style={{ marginBottom: '1rem' }}>
                  <NotificationItem
                    word={item.word}
                    type={item.type}
                    time={item.time}
                    message={item.message}
                    details={item.details}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

  

     
    </div>
  );
};

export default ProgramSection;
