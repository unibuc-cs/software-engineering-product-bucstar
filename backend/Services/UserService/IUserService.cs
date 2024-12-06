using backend.Models.DTOs.UserDTOs;

namespace backend.Services.UserService;

public interface IUserService
{
    Task<List<UserDto>> GetAllUsers();
    Task<UserDto> RegisterUser(UserRegisterDto userDto);
    Task<UserDto> GetUserById(Guid userId);
    Task<UserDto> GetUserByFacebookId(string facebookId);
}