







using Core.Models.User;
using Infrastructure.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class AppDbContext : DbContext
{


  public DbSet<Profile> Profiles => Set<Profile>();
 
public DbSet<User> Users => Set<User>();

  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {

    modelBuilder.ApplyConfiguration(new ProfileConfiguration());
    modelBuilder.ApplyConfiguration(new UserConfiguration());
    


  }
}
