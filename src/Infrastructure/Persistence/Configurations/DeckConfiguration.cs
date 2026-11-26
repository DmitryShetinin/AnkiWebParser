using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public sealed class DeckConfiguration : IEntityTypeConfiguration<Deck>
{
    public void Configure(EntityTypeBuilder<Deck> builder)
    {
        builder.ToTable("Decks");
        builder.HasKey(deck => deck.Id);
        builder.HasAlternateKey(deck => new { deck.Id, deck.UserId });

        builder.Property(deck => deck.Id).ValueGeneratedNever();
        builder.Property(deck => deck.Name).HasMaxLength(120).IsRequired();
        builder.Property(deck => deck.Description).HasMaxLength(500);
        builder.Property(deck => deck.CreatedAt).IsRequired();
        builder.Property(deck => deck.UpdatedAt).IsRequired();
        builder.HasIndex(deck => new { deck.UserId, deck.Name }).IsUnique();

        builder.HasOne(deck => deck.User)
            .WithMany(user => user.Decks)
            .HasForeignKey(deck => deck.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(deck => deck.Cards)
            .WithOne(membership => membership.Deck)
            .HasForeignKey(membership => new { membership.DeckId, membership.UserId })
            .HasPrincipalKey(deck => new { deck.Id, deck.UserId })
            .OnDelete(DeleteBehavior.Cascade);

        builder.Navigation(deck => deck.Cards)
            .UsePropertyAccessMode(PropertyAccessMode.Field);
    }
}
