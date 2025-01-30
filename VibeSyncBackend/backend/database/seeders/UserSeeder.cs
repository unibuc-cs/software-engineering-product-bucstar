using backend.Data;
using backend.database.models;

namespace backend.database.seeders;

public class UserSeeder
{
    private readonly DatabaseContext _dbContext;

    public UserSeeder(DatabaseContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void SeedInitialUsers()
    {
        if (_dbContext.Users.Any())
            return;
        
        var users = new List<User>
        {
            new User()
            {
                Id = new Guid("10e1fd21-38d9-4c83-a7b2-c370e53b95d6"),
                Nickname = "skpha",
                FacebookId = "2371556636519262"
            },
            new User()
            {
                Id = new Guid("022a8895-fe55-4e13-8bd9-402709435f78"),
                Nickname = "Edi",
                FacebookId = "3926362367682964"
            },
            new User()
            {
                Id = new Guid("ef043f56-86d2-4b68-9e03-996aadf92c76"),
                Nickname = "Florin Alexandru",
                FacebookId = "2886420674856395"
            },
            new User()
            {
                Id = new Guid("1e5fe355-5a9f-484f-bff6-f497f5fc0609"),
                Nickname = "Codarcea Alexandru",
                FacebookId = "1817904855694446"
            }
            
        };
        
        _dbContext.Users.AddRange(users);
        _dbContext.SaveChanges();
    }
}