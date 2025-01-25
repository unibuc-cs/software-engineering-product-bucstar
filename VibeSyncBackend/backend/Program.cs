using backend.Data;
using backend.database.seeders;
using backend.Helpers.Extensions;
using backend.middlewares;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var myAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:5009", "https://localhost:5009", "https://localhost:7285", "http://localhost:3000", "https://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddControllers();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING") ?? builder.Configuration.GetConnectionString("DefaultConnectionMySQL");
builder.Services.AddDbContext<DatabaseContext>(
    options => options.UseMySQL(connectionString!)
);

builder.Services.AddRepositories();
builder.Services.AddServices();
builder.Services.AddSeeders();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

// Run migrations before seeding data
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
    // Ensure the database is up to date with migrations
    dbContext.Database.Migrate();

    // Now, seed the data
    SeedData(app);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(myAllowSpecificOrigins);

app.UseMiddleware<FacebookAuthenticationMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();

void SeedData(IHost appSeed)
{
    var scopedFactory = appSeed.Services.GetService<IServiceScopeFactory>();
    if (scopedFactory is null)
    {
        return;
    }
    using (var scope = scopedFactory.CreateScope())
    {
        var userService = scope.ServiceProvider.GetService<UserSeeder>();
        if (userService is null) return;
        userService.SeedInitialUsers();
        var eventSeeder = scope.ServiceProvider.GetService<EventSeeder>();
        if (eventSeeder is null) return;
        eventSeeder.SeedInitialEvents();
        var participationSeeder = scope.ServiceProvider.GetService<ParticipationSeeder>();
        if (participationSeeder is null) return;
        participationSeeder.SeedInitialParticipations();
        var reviewSeeder = scope.ServiceProvider.GetService<ReviewSeeder>();
        if (reviewSeeder is null) return;
        reviewSeeder.SeedInitialReviews();
        var commentSeeder = scope.ServiceProvider.GetService<CommentSeeder>();
        if (commentSeeder is null) return;
        commentSeeder.SeedInitialComments();
        var tagSeeder = scope.ServiceProvider.GetService<TagSeeder>();
        if (tagSeeder is null) return;
        tagSeeder.SeedInitialTags();
    }
}