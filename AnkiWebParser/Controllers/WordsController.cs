
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("words")]
public class WordsController : ControllerBase
{
  private readonly IWordService _wordService;


  public WordsController(
      IWordService wordService)
  {
    _wordService = wordService;
  }


  [HttpPost]
public async Task<IActionResult> Send(
    string word,
    CancellationToken token)
{
    await _wordService.GetCardsAsync(
        word,
        token);

  

    return NoContent();
}
}