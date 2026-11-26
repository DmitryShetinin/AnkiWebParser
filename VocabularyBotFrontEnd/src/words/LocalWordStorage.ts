import { WordStorage } from './WordStorage.ts';
import { StoredWord } from './types.ts';

const STORAGE_KEY = 'vocabulary-bot.guest-collection.v1';

export class LocalWordStorage implements WordStorage {
  async add(word: StoredWord): Promise<void> {
    const words = await this.getAll();

    if (words.some((storedWord) => storedWord.id === word.id)) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...words, word]));
  }

  async getAll(): Promise<StoredWord[]> {
    const serializedWords = localStorage.getItem(STORAGE_KEY);

    if (!serializedWords) {
      return [];
    }

    try {
      const words = JSON.parse(serializedWords);
      return Array.isArray(words) ? words : [];
    } catch {
      return [];
    }
  }

  async remove(id: string): Promise<void> {
    const words = await this.getAll();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(words.filter((word) => word.id !== id)),
    );
  }
}
