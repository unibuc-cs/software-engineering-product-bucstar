using backend.Models;
using backend.Repositories.GenericRepository;

namespace backend.Repositories.UserRepository;

public interface IUserRepository : IGenericRepository<User>
{ }