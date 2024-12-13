using backend.Data;
using backend.Models;

namespace backend.database.seeders;

public class CommentSeeder
{
    private readonly DatabaseContext _dbContext;

    public CommentSeeder(DatabaseContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void SeedInitialComments()
    {
        if (_dbContext.Comments.Any())
        {
            return;
        }

        var comments = new List<Comment>()
        {
            new Comment
            {
                Id = Guid.NewGuid(),
                Text = "my first comment",
                UserId = new Guid("10e1fd21-38d9-4c83-a7b2-c370e53b95d6"),
                EventId = new Guid("6378e679-855a-4ed1-8a98-fa9b7c066434"),
            },
            new Comment
            {
                Id = Guid.NewGuid(),
                Text = "my second comment",
                UserId = new Guid("10e1fd21-38d9-4c83-a7b2-c370e53b95d6"),
                EventId = new Guid("6378e679-855a-4ed1-8a98-fa9b7c066434"),
            },
            new Comment
            {
                Id = Guid.NewGuid(),
                Text = "my third comment",
                UserId = new Guid("10e1fd21-38d9-4c83-a7b2-c370e53b95d6"),
                EventId = new Guid("6378e679-855a-4ed1-8a98-fa9b7c066434"),
            },
        };
        
        _dbContext.Comments.AddRange(comments);
        _dbContext.SaveChanges();
    }
}