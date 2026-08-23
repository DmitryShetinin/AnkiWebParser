using Application.Abstractions;

public sealed class MerriamTextFormatter : IMerriamTextFormatter
{
    public string Format(string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return string.Empty;

        return text
            .Replace("{it}", "<i>")
            .Replace("{/it}", "</i>")
            .Replace("{b}", "<b>")
            .Replace("{/b}", "</b>")
            .Replace("{bc}", "<b>:</b>")
            .Replace("{wi}", "<i>")
            .Replace("{/wi}", "</i>")
            .Replace("{inf}", "<i>")
            .Replace("{/inf}", "</i>")
            .Replace("{sup}", "<sup>")
            .Replace("{/sup}", "</sup>")
            .Replace("{sub}", "<sub>")
            .Replace("{/sub}", "</sub>")
            .Replace("{...}", "...")
            .Trim();
    }
}