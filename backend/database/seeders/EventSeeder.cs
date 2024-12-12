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
                Id = new Guid("438cbe2b-e7f2-4ab1-bcaa-d5dd9cb98884"),
                Name = "Event 1",
                Description = "This is the first event",
                Location = "New York",
                Date = DateTime.Now.AddDays(-1),
                ParticipantsLimit = 20,
                OrganizerId = new Guid("10e1fd21-38d9-4c83-a7b2-c370e53b95d6"),

            },
            new Event
            {
                Id = new Guid("6378e679-855a-4ed1-8a98-fa9b7c066434"),
                Name = "Event 2",
                Description = "This is the second event",
                Location = "New York",
                Date = DateTime.Now.AddDays(2),
                ParticipantsLimit = 20,
                OrganizerId = new Guid("10e1fd21-38d9-4c83-a7b2-c370e53b95d6"),
            }
        };
        
        _dbContext.Events.AddRange(events);
        _dbContext.SaveChanges();
    }
}