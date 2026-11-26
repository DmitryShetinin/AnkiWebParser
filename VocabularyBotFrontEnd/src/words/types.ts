export interface DictionaryCard {
  word: string;
  partOfSpeech: string;
  definition: string;
  externalId: string;
  examples: string[];
  synonyms: string[];
  antonyms: string[];
  relatedWords: string[];
}

export interface StoredWord extends DictionaryCard {
  id: string;
  addedAt: string;
}
