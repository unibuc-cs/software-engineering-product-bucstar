using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class DatabaseContext : DbContext
{
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Participation> Participations { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<User> Users { get; set; }
    
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Notification - User
        modelBuilder.Entity<User>()
            .HasMany(u => u.Notifications)
            .WithOne(n => n.User)
            .HasForeignKey(n => n.UserId);
        
        // Event - Tag
        modelBuilder.Entity<Event>()
            .HasMany(e => e.Tags)
            .WithOne(t => t.Event)
            .HasForeignKey(t => t.EventId);

        // User - Participation - Event
        modelBuilder.Entity<Participation>()
            .HasAlternateKey(p => new { p.UserId, p.EventId });
        
        // User - Participation
        modelBuilder.Entity<User>()
            .HasMany(u => u.Participations)
            .WithOne(p => p.User)
            .HasForeignKey(p => p.UserId);
        
        // Event - Participation
        modelBuilder.Entity<Event>()
            .HasMany(e => e.Participations)
            .WithOne(p => p.Event)
            .HasForeignKey(p => p.EventId);
        
        // User - Event
        modelBuilder.Entity<User>()
            .HasMany(u => u.CreatedEvents)
            .WithOne(e => e.Organizer)
            .HasForeignKey(e => e.OrganizerId);

        // User - Comment - Event
        modelBuilder.Entity<Comment>()
            .HasAlternateKey(c => new { c.UserId, c.EventId });

        // User - Comment
        modelBuilder.Entity<User>()
            .HasMany(u => u.Comments)
            .WithOne(c => c.User)
            .HasForeignKey(c => c.UserId);

        // Comment - Event
        modelBuilder.Entity<Event>()
            .HasMany(e => e.Comments)
            .WithOne(c => c.Event)
            .HasForeignKey(c => c.EventId);

        // User - Review - Event
        modelBuilder.Entity<Review>()
            .HasAlternateKey(r => new { r.UserId, r.EventId });

        // User - Review
        modelBuilder.Entity<User>()
            .HasMany(u => u.Reviews)
            .WithOne(r => r.User)
            .HasForeignKey(r => r.UserId);
        
        // Review - Event
        modelBuilder.Entity<Event>()
            .HasMany(e => e.Reviews)
            .WithOne(r => r.Event)
            .HasForeignKey(r => r.EventId);
    }
}