using AnkiIntegration.AnkiConnect;
using Microsoft.Extensions.Options;

public sealed class AnkiModelInitializer : IAnkiModelInitializer
{
    private readonly IAnkiConnectClient _ankiClient;
    private readonly AnkiOptions _options;

    public AnkiModelInitializer(
        IAnkiConnectClient ankiClient,
        IOptions<AnkiOptions> options)
    {
        _ankiClient = ankiClient;
        _options = options.Value;
    }

    public async Task InitializeAsync(
        CancellationToken cancellationToken = default)
    {
        await EnsureDeckExistsAsync(cancellationToken);
        await EnsureModelExistsAsync(cancellationToken);
    }

    private async Task EnsureDeckExistsAsync(
        CancellationToken cancellationToken)
    {
        var response =
            await _ankiClient.SendRequestAsync<List<string>>(
                new
                {
                    action = "deckNames",
                    version = 6
                },
                cancellationToken);

        if (!response.Success)
        {
            throw new InvalidOperationException(
                response.Error ?? "Failed to get Anki decks.");
        }

        if (response.Result?.Contains(_options.DeckName) == true)
            return;

        var createResponse =
            await _ankiClient.SendRequestAsync<object>(
                new
                {
                    action = "createDeck",
                    version = 6,
                    @params = new
                    {
                        deck = _options.DeckName
                    }
                },
                cancellationToken);

        if (!createResponse.Success)
        {
            throw new InvalidOperationException(
                createResponse.Error ?? "Failed to create Anki deck.");
        }
    }

    private async Task EnsureModelExistsAsync(
        CancellationToken cancellationToken)
    {
        var response =
            await _ankiClient.SendRequestAsync<List<string>>(
                new
                {
                    action = "modelNames",
                    version = 6
                },
                cancellationToken);

        if (!response.Success)
        {
            throw new InvalidOperationException(
                response.Error ?? "Failed to get Anki models.");
        }

        if (response.Result?.Contains(_options.ModelName) == true)
            return;

        var createResponse =
            await _ankiClient.SendRequestAsync<object>(
                new
                {
                    action = "createModel",
                    version = 6,

                    @params = new
                    {
                        modelName = _options.ModelName,

                        inOrderFields = new[]
                        {
                            "DictionaryId",
                            "Word",
                            "PartOfSpeech",
                            "Meaning",
                            "Examples",
                            "Antonyms",
                            "Synonyms",
                            "RelatedWords"
                        },

                        css = GetCardCss(),

                        isCloze = false,

                        cardTemplates = new[]
                        {
                            new
                            {
                                Name = "Vocabulary Card",
                                Front = GetCardFrontTemplate(),
                                Back = GetCardBackTemplate()
                            }
                        }
                    }
                },
                cancellationToken);

        if (!createResponse.Success)
        {
            throw new InvalidOperationException(
                createResponse.Error ?? "Failed to create Anki model.");
        }
    }

    private static string GetCardCss()
    {
        return """
        .card {
            font-family: Arial, sans-serif;
            font-size: 18px;
            text-align: left;
            color: black;
            background-color: white;
            padding: 20px;
        }

        .word-list {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .word-list br {
            display: none;
        }

        .word-list {
            white-space: normal;
            word-break: break-word;
        }

        .word-item {
            display: inline-block;
        }

        .word-header {
            font-size: 28px;
            font-weight: bold;
            color: #2c3e50;
            text-align: center;
            margin-bottom: 15px;
        }

        .section {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 2px solid #ecf0f1;
        }

        .section-title {
            font-weight: bold;
            color: #8e44ad;
            font-size: 18px;
            margin-bottom: 10px;
        }

        .meaning-text {
            line-height: 1.5;
        }

        .pos-text {
            font-style: italic;
            font-weight: bold;
        }

        .example {
            color: #27ae60;
            font-style: italic;
            margin: 5px 0;
            line-height: 1.5;
        }
        """;
    }

    private static string GetCardFrontTemplate()
    {
        return """
        <div class="card front">

            <div class="word-header">
                {{Word}}
            </div>

            <div class="section">

                <div class="section-title">
                    📚 Examples
                </div>

                <div class="example">
                    {{Examples}}
                </div>

            </div>

        </div>
        """;
    }

    private static string GetCardBackTemplate()
    {
        return """
        <div class="card back">

            <div class="word-header">
                {{Word}}
            </div>

            <div class="section">

                <div class="section-title">
                    📖 Meaning
                </div>

                <div class="meaning-text">
                    {{Meaning}}
                </div>

            </div>

            <div class="section">

                <div class="section-title">
                    🔄 Synonyms
                </div>

                <div class="word-list">
                    {{Synonyms}}
                </div>

            </div>

            <div class="section">

                <div class="section-title">
                    ⚡ Antonyms
                </div>

                <div class="word-list">
                    {{Antonyms}}
                </div>

            </div>

            <div class="section">

                <div class="section-title">
                    📚 Part of Speech
                </div>

                <div class="pos-text">
                    {{PartOfSpeech}}
                </div>

            </div>

            <div class="section">

                <div class="section-title">
                    🔗 Related Words
                </div>

                <div class="word-list">
                    {{RelatedWords}}
                </div>

            </div>

        </div>
        """;
    }
}