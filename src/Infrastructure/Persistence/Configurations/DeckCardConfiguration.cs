using Core.Models.Collection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public sealed class DeckCardConfiguration : IEntityTypeConfiguration<DeckCard>
{
    public void Configure(EntityTypeBuilder<DeckCard> builder)
    {
        builder.ToTable("DeckCards");
        builder.HasKey(membership => new { membership.DeckId, membership.SavedCardId });
        builder.Property(membership => membership.AddedAt).IsRequired();
        builder.HasIndex(membership => new { membership.SavedCardId, membership.UserId });

        builder.HasOne(membership => membership.SavedCard)
            .WithMany(card => card.DeckMemberships)
            .HasForeignKey(membership => new { membership.SavedCardId, membership.UserId })
            .HasPrincipalKey(card => new { card.Id, card.UserId })
            .OnDelete(DeleteBehavior.Cascade);
    }
}
