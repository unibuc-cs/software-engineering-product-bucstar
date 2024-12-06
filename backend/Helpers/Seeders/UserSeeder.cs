using backend.Data;
using backend.Models;

namespace backend.Helpers.Seeders;

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
            }
        };
        
        _dbContext.Users.AddRange(users);
        _dbContext.SaveChanges();
    }
}