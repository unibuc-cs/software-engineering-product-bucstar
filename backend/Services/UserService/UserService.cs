using AutoMapper;
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
    
    public async Task<List<UserGetDto>> GetAllUsers()
    {
        var userList = await _userRepository.GetAllAsync();
        return _mapper.Map<List<UserGetDto>>(userList);
    }
}