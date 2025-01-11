using backend.Data;
using backend.Models;
using backend.Models.DTOs.UserDTOs;
using backend.Repositories.GenericRepository;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.UserRepository;

public class UserRepository : GenericRepository<User>, IUserRepository 
{
    public UserRepository(DatabaseContext dbContext) : base(dbContext) {}
    public async Task<User?> GetByFacebookIdAsync(string facebookId)
    {
        return await _table.AsNoTracking().FirstOrDefaultAsync(u => u.FacebookId == facebookId);
    }
}