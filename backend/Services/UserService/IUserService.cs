using backend.Models.DTOs.UserDTOs;

namespace backend.Services.UserService;

public interface IUserService
{
    Task<List<UserDto>> GetAllUsers();
    Task RegisterUser(UserDto userDto);
    Task<UserDto> GetUserById(Guid userId);
}