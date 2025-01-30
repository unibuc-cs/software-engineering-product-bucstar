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
                EventId = new Guid("438cbe2b-e7f2-4ab1-bcaa-d5dd9cb98884"),
            },
            new Tag
            {
                Name = "outdoor",
                EventId = new Guid("6378e679-855a-4ed1-8a98-fa9b7c066434"),
            },
            new Tag
            {
                Name = "outdoor",
                EventId = new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"),
            },
            new Tag
            {
                Name = "outdoor",
                EventId = new Guid("abc12345-6789-def0-1234-56789abcdef0"),
            },
            
            new Tag
            {
                Name = "indoor",
                EventId = new Guid("6378e679-855a-4ed1-8a98-fa9b7c066434"),
            },
            new Tag
            {
                Name = "indoor",
                EventId = new Guid("c9d8e7f6-a5b4-3210-fedc-ba9876543210"),
            },
            new Tag
            {
                Name = "indoor",
                EventId = new Guid("33dd3330-153d-4c33-b1fa-c9fd421b042b"),
            },
            new Tag
            {
                Name = "indoor",
                EventId = new Guid("bca54321-9876-0fed-4321-abcdef098765"),
            },
            new Tag 
            {
                Name = "indoor",
                EventId = new Guid("7890abcd-ef12-3456-789a-bcdef0123456"),
            },
            new Tag
            {
                Name = "indoor",
                EventId = new Guid("6c52f750-a4bf-4ae5-b14a-3b3798e9f049"),
            },
            new Tag
            {
                Name = "indoor",
                EventId = new Guid("9d144b91-5506-416b-9f34-94487495a09f"),
            },
            new Tag
            {
                Name = "indoor",
                EventId = new Guid("ab9ec4f0-29f0-46db-9550-7a3bdfd9fb06"),
            },
            new Tag
            {
                Name = "casual",
                EventId = new Guid("438cbe2b-e7f2-4ab1-bcaa-d5dd9cb98884"),
            },
            new Tag
            {
                Name = "casual",
                EventId = new Guid("7890abcd-ef12-3456-789a-bcdef0123456"), 
            },
            
            new Tag
            {
                
                Name = "competition",
                EventId = new Guid("c9d8e7f6-a5b4-3210-fedc-ba9876543210"),
            },
            new Tag 
            {
                Name = "competition",
                EventId = new Guid("ab9ec4f0-29f0-46db-9550-7a3bdfd9fb06"),
            },
            new Tag
            {
                
                Name = "business",
                EventId = new Guid("f1e2d3c4-b5a6-7980-cdef-0123456789ab"),
            },
            new Tag 
            {
                Name = "business",
                EventId = new Guid("ab9ec4f0-29f0-46db-9550-7a3bdfd9fb06"),
            },
            new Tag
            {
                
                Name = "networking",
                EventId = new Guid("f1e2d3c4-b5a6-7980-cdef-0123456789ab"),
            },
            new Tag
            {
                Name = "networking",
                EventId = new Guid("ab9ec4f0-29f0-46db-9550-7a3bdfd9fb06"),
            },
            new Tag
            {
                Name = "networking",
                EventId = new Guid("bca54321-9876-0fed-4321-abcdef098765"),
            },
            new Tag
            {
                Name = "teams",
                EventId = new Guid("438cbe2b-e7f2-4ab1-bcaa-d5dd9cb98884"),
            },
            new Tag
            {
                Name = "art",
                EventId = new Guid("33dd3330-153d-4c33-b1fa-c9fd421b042b"),
            },
            new Tag
            {
                Name = "art",
                EventId = new Guid("9d144b91-5506-416b-9f34-94487495a09f"),
            },
            new Tag
            {
                Name = "charity",
                EventId = new Guid("33dd3330-153d-4c33-b1fa-c9fd421b042b"),
            },
            new Tag
            {
                Name = "baschet",
                EventId = new Guid("438cbe2b-e7f2-4ab1-bcaa-d5dd9cb98884"),
            },
            new Tag
            {
                Name = "pescuit",
                EventId = new Guid("6378e679-855a-4ed1-8a98-fa9b7c066434"),
            },
            new Tag
            {
                Name = "gaming",
                EventId = new Guid("c9d8e7f6-a5b4-3210-fedc-ba9876543210"),
            },

        };
        
        _dbContext.Tags.AddRange(tags);
        _dbContext.SaveChanges();
    }
}