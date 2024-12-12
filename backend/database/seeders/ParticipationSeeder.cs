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
                EventId = new Guid("6378e679-855a-4ed1-8a98-fa9b7c066434")
            },
            new Participation()
            {
                UserId = new Guid("022a8895-fe55-4e13-8bd9-402709435f78"),
                EventId = new Guid("6378e679-855a-4ed1-8a98-fa9b7c066434")
            },
        };
        
        _dbContext.Participations.AddRange(participations);
        _dbContext.SaveChanges();
    }
}