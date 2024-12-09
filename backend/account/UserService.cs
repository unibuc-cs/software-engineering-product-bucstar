using AutoMapper;
using backend.account.dto;
using backend.Models;
using backend.Models.DTOs.UserDTOs;
using backend.Services.UserService;

namespace backend.account;

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

    public async Task<UserDto> RegisterUser(UserRegisterDto userDto)
    {
        var user = _mapper.Map<User>(userDto);

        var existingUser = await _userRepository.GetByFacebookIdAsync(userDto.FacebookId);

        if (existingUser != null)
        {
            return _mapper.Map<UserDto>(existingUser);
        }
        
        await _userRepository.CreateAsync(user);
        await _userRepository.SaveAsync();
        
        var createdUser =  await _userRepository.GetByFacebookIdAsync(userDto.FacebookId);
        return _mapper.Map<UserDto>(createdUser);
    }

    public async Task<UserDto> GetUserById(Guid userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null) throw new Exception("User not found");
        
        return _mapper.Map<UserDto>(user);
    }

    public async Task<UserDto> GetUserByFacebookId(string facebookId)
    {
        var user = await _userRepository.GetByFacebookIdAsync(facebookId);
        
        if (user == null) throw new Exception("User not found");
        return _mapper.Map<UserDto>(user);
    }
}