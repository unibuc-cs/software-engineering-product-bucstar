using backend.Data;
using backend.Models;

namespace backend.database.seeders;

public class TagSeeder
{
    private readonly DatabaseContext _dbContext;

    public TagSeeder(DatabaseContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void SeedInitialTags()
    {
        if (_dbContext.Tags.Any())
            return;

        var tags = new List<Tag>()
        {
            new Tag
            {
                Name = "outdoor",
                EventId = new Guid("6378e679-855a-4ed1-8a98-fa9b7c066434"),
            },
            new Tag
            {
                Name = "casual",
                EventId = new Guid("6378e679-855a-4ed1-8a98-fa9b7c066434"),
            },
            new Tag
            {
                Name = "teams",
                EventId = new Guid("6378e679-855a-4ed1-8a98-fa9b7c066434"),
            },
        };
        
        _dbContext.Tags.AddRange(tags);
        _dbContext.SaveChanges();
    }
}