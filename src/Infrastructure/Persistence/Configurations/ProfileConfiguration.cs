
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public sealed class ProfileConfiguration
    : IEntityTypeConfiguration<Profile>
{
    public void Configure(
        EntityTypeBuilder<Profile> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .ValueGeneratedNever();

        ConfigureAccount(builder);
        ConfigureDictionary(builder);
      
        ConfigureAppearance(builder);
    }

    private static void ConfigureAccount(
        EntityTypeBuilder<Profile> builder)
    {
        builder.OwnsOne(
            x => x.Account,
            account =>
            {
                account.Property(x => x.Avatar)
                    .HasMaxLength(500);
            });
    }

    private static void ConfigureDictionary(
        EntityTypeBuilder<Profile> builder)
    {
        builder.OwnsOne(
            x => x.Dictionary,
            dictionary =>
            {
                dictionary.Property(x => x.MaxSynonyms)
                    .IsRequired();

                dictionary.Property(x => x.MaxAntonyms)
                    .IsRequired();

                dictionary.Property(x => x.MaxRelatedWords)
                    .IsRequired();

                dictionary.Property(x => x.MaxExamples)
                    .IsRequired();
            });
    }

  

    private static void ConfigureAppearance(
        EntityTypeBuilder<Profile> builder)
    {
        builder.OwnsOne(
            x => x.Appearance,
            appearance =>
            {
                appearance.Property(x => x.CardStyle)
                    .IsRequired();

                appearance.Property(x => x.Theme)
                    .HasMaxLength(30)
                    .IsRequired();
            });
    }
}