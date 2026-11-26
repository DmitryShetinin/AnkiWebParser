using Core.Models.Collection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public sealed class SavedCardConfiguration : IEntityTypeConfiguration<SavedCard>
{
    public void Configure(EntityTypeBuilder<SavedCard> builder)
    {
        builder.ToTable("SavedCards");
        builder.HasKey(card => card.Id);
        builder.HasAlternateKey(card => new { card.Id, card.UserId });
        builder.Property(card => card.ExternalId).HasMaxLength(200).IsRequired();
        builder.Property(card => card.Word).HasMaxLength(200).IsRequired();
        builder.Property(card => card.PartOfSpeech).HasMaxLength(100).IsRequired();
        builder.Property(card => card.Definition).IsRequired();
        builder.Property(card => card.Examples).HasColumnType("text[]");
        builder.Property(card => card.Synonyms).HasColumnType("text[]");
        builder.Property(card => card.Antonyms).HasColumnType("text[]");
        builder.Property(card => card.RelatedWords).HasColumnType("text[]");
        builder.HasIndex(card => new { card.UserId, card.ExternalId }).IsUnique();

        builder.HasOne(card => card.User)
            .WithMany(user => user.SavedCards)
            .HasForeignKey(card => card.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
