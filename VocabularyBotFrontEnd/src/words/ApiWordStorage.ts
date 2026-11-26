import { apiClient } from '../api/client.ts';
import { WordStorage } from './WordStorage.ts';
import { StoredWord } from './types.ts';

export class ApiWordStorage implements WordStorage {
  async add(word: StoredWord): Promise<void> {
    await apiClient.post('/api/collection/import', [word]);
  }

  async getAll(): Promise<StoredWord[]> {
    const { data } = await apiClient.get<StoredWord[]>('/api/collection');

    return data.map((card) => ({
      ...card,
      id: card.externalId,
      addedAt: card.addedAt ?? '',
    }));
  }

  async remove(_id: string): Promise<void> {
    throw new Error('Removing cloud cards is not implemented yet.');
  }
}
