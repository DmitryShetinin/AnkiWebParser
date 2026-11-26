using Core.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/words")]
public sealed class WordsController : ControllerBase
{
  private readonly IWordService _wordService;


  public WordsController(
      IWordService wordService)
  {
    _wordService = wordService;
  }

    [HttpPost]
    public async Task<ActionResult<IReadOnlyList<Card>>> Search(
        [FromQuery] string word,
        [FromQuery] int? maxSynonyms,
        [FromQuery] int? maxAntonyms,
        [FromQuery] int? maxRelatedWords,
        [FromQuery] int? maxExamples,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(word))
        {
            return BadRequest("Word is required.");
        }

        var settings = new DictionarySettings
        {
            MaxSynonyms = Math.Clamp(maxSynonyms ?? 5, 0, 50),
            MaxAntonyms = Math.Clamp(maxAntonyms ?? 3, 0, 50),
            MaxRelatedWords = Math.Clamp(maxRelatedWords ?? 5, 0, 50),
            MaxExamples = Math.Clamp(maxExamples ?? 2, 0, 20)
        };
        var cards = await _wordService.GetCardsAsync(word, settings, cancellationToken);

        return Ok(cards);
    }
}
