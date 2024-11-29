using AutoMapper;
using backend.Models;
using backend.Models.DTOs.UserDTOs;
using backend.Repositories.UserRepository;

namespace backend.Services.UserService;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UserService(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }
    
    public async Task<List<UserDto>> GetAllUsers()
    {
        var userList = await _userRepository.GetAllAsync();
        return _mapper.Map<List<UserDto>>(userList);
    }

    public async Task RegisterUser(UserDto userDto)
    {
        var user = _mapper.Map<User>(userDto);
        
        await _userRepository.CreateAsync(user);
        await _userRepository.SaveAsync();
    }

    public async Task<UserDto> GetUserById(Guid userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null) throw new Exception("User not found");
        
        return _mapper.Map<UserDto>(user);
    }
}