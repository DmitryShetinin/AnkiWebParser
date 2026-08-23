import React, { useState } from 'react';
 
import NotificationItem from '../NotificationItem.tsx';
import { Notification } from '../types';
import { 
  styles, 
  getSearchButtonStyle, 
  getStatusBadgeStyle, 
  getColorBoxStyle 
} from './styles/ProgramSection.styles.ts'; 

interface ProgramSectionProps { 
  notifications: Notification[];
  ankiConnected: boolean | null;
  checkingAnki: boolean;
  checkAnkiStatus: (showNotification?: boolean) => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id' | 'time'>) => void;
  clearNotifications: () => void;
  api: any;
}

const ProgramSection: React.FC<ProgramSectionProps> = ({
  notifications,
  ankiConnected,
  checkingAnki,
  checkAnkiStatus,
  addNotification,
  clearNotifications,
  api
}) => {
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(false);
  
   
const searchWord = async () => {
  if (!word.trim()) return;
  const searchTerm = word.trim();
  setLoading(true);
  try {
    const alreadyThere = await wordExistsInAnki(searchTerm);
    if (alreadyThere) {
      addNotification({
        word: searchTerm,
        type: 'info',
        message: `ℹ️ Слово "${searchTerm}" уже есть в Anki, повторно не добавляем`
      });
      setWord('');
      setLoading(false);
      return;
    }


    // Step 1: Parse word via backend
    const response = await api.post(`/api/cards?word=${encodeURIComponent(searchTerm)}`);
    const data = response.data;
    
    
    if (!data.success || !data.cards || data.cards.length === 0) {
      addNotification({
        word: searchTerm,
        type: 'error',
        message: data.message || `❌ Слово "${searchTerm}" не найдено или не удалось распарсить`
      });
      setWord('');
      return;
    }
    
    // Step 2: Send each card to AnkiConnect
    let importedCount = 0;
    const errors = [];

 
    for (const card of data.cards) {
      const ankiResult = await addNoteToAnki(card);
      if (ankiResult.error) {
        errors.push(`${card.word} (${card.partOfSpeech}): ${ankiResult.error}`);
      } else {
        importedCount++;
      }
    }
    
    // Step 3: Show result notification
    if (importedCount === data.cards.length) {
      addNotification({
        word: searchTerm,
        type: 'success',
        message: `✅ Слово "${searchTerm}" полностью добавлено в Anki (${importedCount} карточек)`
      });
    } else if (importedCount > 0) {
      addNotification({
        word: searchTerm,
        type: 'warning',
        message: `⚠️ Слово "${searchTerm}" добавлено частично: ${importedCount} из ${data.cards.length} карточек`,
        details: errors
      });
    } else {
      addNotification({
        word: searchTerm,
        type: 'error',
        message: `❌ Не удалось добавить карточки для "${searchTerm}" в Anki`,
        details: errors
      });
    }
    
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
// Проверка, есть ли слово в Anki
async function wordExistsInAnki(word: string): Promise<boolean> {
  const payload = {
    action: 'findNotes',
    version: 6,
    params: {
      query: `deck:MyDeck Word:${word}`
    }
  };
  
  try {
    const response = await fetch('http://localhost:8765', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    return data.result && data.result.length > 0;
  } catch (err) {
    console.error('Error checking word existence:', err);
    return false; // если ошибка, пробуем добавить
  }
}

// Добавление одной карточки (с уникальным CardIndex, но это уже не критично)
async function addNoteToAnki(card) {
  const payload = {
    action: 'addNote',
    version: 6,
    params: {
      note: {
        deckName: 'MyDeck',
        modelName: 'record type for MyDeckNew',
        fields: {
   
          Word: card.word,
          Meaning: card.definitions?.[0] || '',
          Example: card.examples?.[0] || '',
          Synonyms: (card.synonyms || []).join(', '),
          Antonyms: (card.antonyms || []).join(', '),
          PartOfSpeech: card.partOfSpeech || ''
        },
        tags: 'vocab-bot',
        options: {
          allowDuplicate: false,
          duplicateScope: 'deck'
        }
      }
    }
  };

  const response = await fetch('http://localhost:8765', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return response.json();
}


  return (
    <div style={styles.container}>
      {/* Шапка */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          🎴 Vocabulary Bot
        </h1>
        <p style={styles.subtitle}>Найди слово → Автоматически добавь в Anki</p>
        
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
                Добавляем...
              </>
            ) : (
              <>
                <span style={{ marginRight: '0.5rem' }}>🔍</span>
                Найти и добавить
              </>
            )}
          </button>
        </div>
        
        {/* Подсказка */}
        <div style={styles.hint}>
          💡 Введите слово на английском → Нажмите Enter → Слово автоматически добавится в Anki
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