import { StoredWord } from './types.ts';

export interface WordStorage {
  add(word: StoredWord): Promise<void>;
  getAll(): Promise<StoredWord[]>;
  remove(id: string): Promise<void>;
}
