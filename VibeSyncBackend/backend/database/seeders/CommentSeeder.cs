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
                Text = "La ce oră începe evenimentul?",
                UserId = new Guid("10e1fd21-38d9-4c83-a7b2-c370e53b95d6"),
                EventId = new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890")
            },
            new Comment
            {
                Text = "Sunt locuri de parcare în zonă?",
                UserId = new Guid("022a8895-fe55-4e13-8bd9-402709435f78"),
                EventId = new Guid("f1e2d3c4-b5a6-7980-cdef-0123456789ab")
            },
            new Comment
            {
                Text = "Se poate veni cu prietenii care nu sunt înscriși?",
                UserId = new Guid("ef043f56-86d2-4b68-9e03-996aadf92c76"),
                EventId = new Guid("c9d8e7f6-a5b4-3210-fedc-ba9876543210")
            },
            new Comment
            {
                Text = "Evenimentul va avea și sesiuni de Q&A?",
                UserId = new Guid("1e5fe355-5a9f-484f-bff6-f497f5fc0609"),
                EventId = new Guid("bca54321-9876-0fed-4321-abcdef098765")
            },
            new Comment
            {
                Text = "Abia aștept să particip! Organizatorul face evenimente excelente!",
                UserId = new Guid("10e1fd21-38d9-4c83-a7b2-c370e53b95d6"),
                EventId = new Guid("33dd3330-153d-4c33-b1fa-c9fd421b042b")
            },
            new Comment
            {
                Text = "Cum pot intra în legătură cu organizatorul?",
                UserId = new Guid("022a8895-fe55-4e13-8bd9-402709435f78"),
                EventId = new Guid("abc12345-6789-def0-1234-56789abcdef0")
            },
            new Comment
            {
                Text = "Am fost la ediția trecută și a fost grozav! Recomand!",
                UserId = new Guid("1e5fe355-5a9f-484f-bff6-f497f5fc0609"),
                EventId = new Guid("9d144b91-5506-416b-9f34-94487495a09f")
            },
            new Comment
            {
                Text = "Sunt interesat, mai sunt locuri disponibile?",
                UserId = new Guid("ef043f56-86d2-4b68-9e03-996aadf92c76"),
                EventId = new Guid("ab9ec4f0-29f0-46db-9550-7a3bdfd9fb06")
            }

        };
        
        _dbContext.Comments.AddRange(comments);
        _dbContext.SaveChanges();
    }
}