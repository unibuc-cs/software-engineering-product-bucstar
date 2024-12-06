using backend.Models;
using backend.Models.DTOs.UserDTOs;

namespace backend.Helpers;

public class MapperProfile : AutoMapper.Profile
{
    public MapperProfile()
    {
        CreateMap<User, UserDto>();
        CreateMap<UserDto, User>();
        
        CreateMap<UserRegisterDto, User>()
            .ForMember(u => u.Id, opt => opt.MapFrom(src => new Guid()));
        CreateMap<User, UserRegisterDto>();
    }
}