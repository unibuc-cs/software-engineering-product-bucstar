using backend.Data;
using backend.database.models;

namespace backend.database.seeders;

public class EventSeeder
{
    private readonly DatabaseContext _dbContext;

    public EventSeeder(DatabaseContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void SeedInitialEvents()
    {
        if (_dbContext.Events.Any())
            return;
        
        var user = _dbContext.Users.FirstOrDefault();
        
        var events = new List<Event>
        {
            new Event
            {
                Name = "Event 1",
                Description = "This is the first event",
                Location = "New York",
                Date = DateTime.Now.AddDays(-1),
                ParticipantsLimit = 20,
                OrganizerId = user.Id,
                Organizer = user

            },
            new Event
            {
                Name = "Event 2",
                Description = "This is the second event",
                Location = "New York",
                Date = DateTime.Now.AddDays(2),
                ParticipantsLimit = 20,
                OrganizerId = user.Id,
                Organizer = user

            }
        };
        
        _dbContext.Events.AddRange(events);
        _dbContext.SaveChanges();
    }
}