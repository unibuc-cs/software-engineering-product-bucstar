using backend.Models.DTOs.UserDTOs;

namespace backend.Services.UserService;

public interface IUserService
{
    Task<List<UserGetDto>> GetAllUsers();
}