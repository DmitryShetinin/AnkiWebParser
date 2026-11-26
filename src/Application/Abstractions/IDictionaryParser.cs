

using Application.Merriam;
using Core.Models;

namespace Application.Abstractions; 



public interface IDictionaryParser
{
    WordEntry Parse(IReadOnlyList<MerriamEntryDto> entries);
    WordEntry Parse(IReadOnlyList<MerriamEntryDto> entries, DictionarySettings settings);
}
