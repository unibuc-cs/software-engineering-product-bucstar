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
                Nickname = "skpha"
            },
            new User()
            {
                Id = new Guid("fae3388c-45f8-4d44-85d9-866bb46018e7"),
                Nickname = "GFA"
            },
            new User()
            {
                Id = new Guid("01947d61-c1cc-4996-83b8-bf2b3027a387"),
                Nickname = "AlexcoGames2003"
            },
            new User()
            {
                Id = new Guid("c889d884-d9e5-4fed-80d5-0b785860cd31"),
                Nickname = "Craniax"
            }
        };
        
        _dbContext.Users.AddRange(users);
        _dbContext.SaveChanges();
    }
}