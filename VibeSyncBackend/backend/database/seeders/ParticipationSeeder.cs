using backend.Data;
using backend.Models;

namespace backend.database.seeders;

public class ParticipationSeeder
{
    private readonly DatabaseContext _dbContext;

    public ParticipationSeeder(DatabaseContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void SeedInitialParticipations()
    {
        if (_dbContext.Participations.Any())
            return;

        var participations = new List<Participation>
        {
            new Participation()
            {
                UserId = new Guid("10e1fd21-38d9-4c83-a7b2-c370e53b95d6"),
                EventId = new Guid("438cbe2b-e7f2-4ab1-bcaa-d5dd9cb98884")
            },
            new Participation()
            {
                UserId = new Guid("022a8895-fe55-4e13-8bd9-402709435f78"),
                EventId = new Guid("438cbe2b-e7f2-4ab1-bcaa-d5dd9cb98884")
            },
            new Participation
            {
                UserId = new Guid("ef043f56-86d2-4b68-9e03-996aadf92c76"),
                EventId = new Guid("438cbe2b-e7f2-4ab1-bcaa-d5dd9cb98884")
            },
            new Participation
            {
                UserId = new Guid("1e5fe355-5a9f-484f-bff6-f497f5fc0609"),
                EventId = new Guid("438cbe2b-e7f2-4ab1-bcaa-d5dd9cb98884")
            },
            new Participation()
            {
                UserId = new Guid("10e1fd21-38d9-4c83-a7b2-c370e53b95d6"),
                EventId = new Guid("6378e679-855a-4ed1-8a98-fa9b7c066434")
            },
            new Participation()
            {
                UserId = new Guid("022a8895-fe55-4e13-8bd9-402709435f78"),
                EventId = new Guid("6378e679-855a-4ed1-8a98-fa9b7c066434")
            },
            new Participation()
            {
                UserId = new Guid("ef043f56-86d2-4b68-9e03-996aadf92c76"),
                EventId = new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890")
            },
            new Participation()
            {
                UserId = new Guid("1e5fe355-5a9f-484f-bff6-f497f5fc0609"),
                EventId = new Guid("f1e2d3c4-b5a6-7980-cdef-0123456789ab")
            },
            new Participation()
            {
                UserId = new Guid("10e1fd21-38d9-4c83-a7b2-c370e53b95d6"),
                EventId = new Guid("c9d8e7f6-a5b4-3210-fedc-ba9876543210")
            },
            new Participation()
            {
                UserId = new Guid("022a8895-fe55-4e13-8bd9-402709435f78"),
                EventId = new Guid("33dd3330-153d-4c33-b1fa-c9fd421b042b")
            },
            new Participation()
            {
                UserId = new Guid("1e5fe355-5a9f-484f-bff6-f497f5fc0609"),
                EventId = new Guid("bca54321-9876-0fed-4321-abcdef098765")
            },
            new Participation()
            {
                UserId = new Guid("ef043f56-86d2-4b68-9e03-996aadf92c76"),
                EventId = new Guid("6c52f750-a4bf-4ae5-b14a-3b3798e9f049")
            }
        };
        
        _dbContext.Participations.AddRange(participations);
        _dbContext.SaveChanges();
    }
}