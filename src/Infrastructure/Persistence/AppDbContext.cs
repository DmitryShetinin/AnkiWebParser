







using Core.Models.User;
using Core.Models.Collection;
using Core.Models;
using Infrastructure.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class AppDbContext : DbContext
{


  public DbSet<Profile> Profiles => Set<Profile>();
  public DbSet<SavedCard> SavedCards => Set<SavedCard>();
  public DbSet<Deck> Decks => Set<Deck>();
  public DbSet<DeckCard> DeckCards => Set<DeckCard>();
 
public DbSet<User> Users => Set<User>();

  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {

    modelBuilder.ApplyConfiguration(new ProfileConfiguration());
    modelBuilder.ApplyConfiguration(new UserConfiguration());
    modelBuilder.ApplyConfiguration(new SavedCardConfiguration());
    modelBuilder.ApplyConfiguration(new DeckConfiguration());
    modelBuilder.ApplyConfiguration(new DeckCardConfiguration());
    


  }
}
