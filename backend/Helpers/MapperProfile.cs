using backend.Models;
using backend.Models.DTOs.UserDTOs;

namespace backend.Helpers;

public class MapperProfile : AutoMapper.Profile
{
    public MapperProfile()
    {
        CreateMap<User, UserGetDto>();
    }
}