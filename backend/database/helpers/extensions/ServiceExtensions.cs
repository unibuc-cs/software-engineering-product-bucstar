using backend.account;
using backend.database.repositories;
using backend.Helpers.Seeders;
using backend.Services.UserService;

namespace backend.Helpers.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddTransient<IUserRepository, UserRepository>();

        return services;
    }
    
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddTransient<IUserService, UserService>();

        return services;
    }
    
    public static IServiceCollection AddSeeders(this IServiceCollection services)
    {
        services.AddTransient<UserSeeder>();

        return services;
    }
}