using backend.Data;
using backend.Models;
using backend.Repositories.GenericRepository;

namespace backend.Repositories.UserRepository;

public class UserRepository : GenericRepository<User>, IUserRepository 
{
    public UserRepository(DatabaseContext dbContext) : base(dbContext) {}
}