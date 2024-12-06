using backend.Models;
using backend.Models.DTOs.UserDTOs;
using backend.Repositories.GenericRepository;

namespace backend.Repositories.UserRepository;

public interface IUserRepository : IGenericRepository<User>
{
    Task<User?> GetByFacebookIdAsync(string facebookId);
}