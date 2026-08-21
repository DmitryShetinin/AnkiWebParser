
using Core.Models;

namespace Core.Extensions; 


public static class WordEntryExtensions
{
    public static IReadOnlyList<Card> ToCards(
        this WordEntry wordEntry)
    {
         var cards = new List<Card>();

        foreach (var entry in wordEntry.Entries)
        {
            foreach (var meaning in entry.Meanings)
            {
                cards.Add(new Card
                {

                    ExternalId = entry.ExternalId,
                    Word = wordEntry.Word,
                    PartOfSpeech = entry.PartOfSpeech,
                    Definition = meaning.Definition,
                    Examples = meaning.Examples,
                    Synonyms = meaning.Synonyms,
                    RelatedWords = meaning.RelatedWords
                });
            }
        }

        return cards;
    }
}

