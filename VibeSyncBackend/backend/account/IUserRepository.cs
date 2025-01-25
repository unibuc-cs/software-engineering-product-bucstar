using backend.database.models;

namespace backend.account;

public interface IUserRepository
{
    Task<User?> GetByFacebookIdAsync(string facebookId);
    
    Task<List<User>> GetAllAsync();
    
    Task CreateAsync(User user);
    
    Task<bool> SaveAsync();
    
    Task<User?> GetByIdAsync(Guid id);
}