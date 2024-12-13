using backend.account;
using backend.database.repositories;
using backend.database.seeders;
using backend.events;
using backend.Models;
using backend.Services.UserService;

namespace backend.Helpers.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddTransient<IUserRepository, UserRepository>();
        services.AddTransient<IEventRepository, EventRepository>();
        return services;
    }
    
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddTransient<IUserService, UserService>();
        services.AddTransient<EventService>();
        return services;
    }
    
    public static IServiceCollection AddSeeders(this IServiceCollection services)
    {
        services.AddTransient<UserSeeder>();
        services.AddTransient<EventSeeder>();
        services.AddTransient<ParticipationSeeder>();
        services.AddTransient<ReviewSeeder>();
        services.AddTransient<CommentSeeder>();
        services.AddTransient<TagSeeder>();

        return services;
    }
}