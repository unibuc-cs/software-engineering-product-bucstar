using backend.account;
using backend.Data;
using backend.database.models;
using backend.database.repositories.generic;
using Microsoft.EntityFrameworkCore;

namespace backend.database.repositories;

public class UserRepository : GenericRepository<User>, IUserRepository 
{
    public UserRepository(DatabaseContext dbContext) : base(dbContext) {}
    public async Task<User?> GetByFacebookIdAsync(string facebookId)
    {
        return await _table.AsNoTracking().FirstOrDefaultAsync(u => u.FacebookId == facebookId);
    }
}