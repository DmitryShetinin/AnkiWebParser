 
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5055',  
  timeout: 30000,
});


// Проверка соединения с Anki
export const checkAnkiStatus = async () => {
  try {
    const response = await api.get('/api/status');
    return response.data;
  } catch (error) {
    console.error('Error checking Anki status:', error);
    return { connected: false, error: 'Cannot connect to server' };
  }
};

// Добавление слова
export const addWord = async (word: string, deckName: string = 'Default') => {
  try {
    // Вариант 1: через query параметры (как у тебя)
    const response = await api.post(`/api/cards?word=${encodeURIComponent(word)}&deck=${deckName}`);
    return response.data;
    
    // Вариант 2: через body (более правильно)
    // const response = await api.post('/api/cards', { word, deckName });
    // return response.data;
  } catch (error: any) {
    console.error('Error adding word:', error);
    throw error;
  }
};

// Создание колоды
export const createDeck = async (deckName?: string) => {
  try {
    const response = await api.post('/api/anki/deck/create', { deckName });
    return response.data;
  } catch (error) {
    console.error('Error creating deck:', error);
    throw error;
  }
};

// Получение списка колод
export const getDecks = async () => {
  try {
    const response = await api.get('/api/anki/decks');
    return response.data;
  } catch (error) {
    console.error('Error getting decks:', error);
    return [];
  }
};