using backend.Data;
using backend.database.models;

namespace backend.database.seeders;

public class EventSeeder
{
    private readonly DatabaseContext _dbContext;

    public EventSeeder(DatabaseContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void SeedInitialEvents()
    {
        if (_dbContext.Events.Any())
            return;
        
        var events = new List<Event>
        {
            new Event
            {
                Id = new Guid("438cbe2b-e7f2-4ab1-bcaa-d5dd9cb98884"),
                Name = "Baschet cu prietenii",
                Description = "Un meci de baschet relaxant cu prietenii.",
                Location = "Parcul IOR, București",
                Date = DateTime.Now.AddDays(-5),
                ParticipantsLimit = 20,
                OrganizerId = new Guid("10e1fd21-38d9-4c83-a7b2-c370e53b95d6"),

            },
            new Event
            {
                Id = new Guid("6378e679-855a-4ed1-8a98-fa9b7c066434"),
                Name = "Pescuit la lac",
                Description = "O zi de pescuit relaxant la lac.",
                Location = "Lacul Morii, București",
                Date = DateTime.Now.AddDays(-2),
                ParticipantsLimit = 20,
                OrganizerId = new Guid("10e1fd21-38d9-4c83-a7b2-c370e53b95d6"),
            },
            new Event
            {
                Id = new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"),
                Name = "Chill & Grill Weekend",
                Description = "Un weekend relaxant cu prietenii, grătar și voie bună.",
                Location = "Parcul Central, București",
                Date = DateTime.Now.AddDays(5),
                ParticipantsLimit = 50,
                OrganizerId = new Guid("022a8895-fe55-4e13-8bd9-402709435f78"),
            },
            new Event
            {
                Id = new Guid("f1e2d3c4-b5a6-7980-cdef-0123456789ab"),
                Name = "Business Networking Gala",
                Description = "O seară elegantă de networking pentru profesioniști și antreprenori.",
                Location = "Hotel Intercontinental, București",
                Date = DateTime.Now.AddDays(10),
                ParticipantsLimit = 100,
                OrganizerId = new Guid("1e5fe355-5a9f-484f-bff6-f497f5fc0609"),
            },
            new Event
            {
                Id = new Guid("c9d8e7f6-a5b4-3210-fedc-ba9876543210"),
                Name = "LAN Party - Gaming Night",
                Description = "Competiții de gaming, premii și multe surprize!",
                Location = "Arena Mall, Iași",
                Date = DateTime.Now.AddDays(3),
                ParticipantsLimit = 30,
                OrganizerId = new Guid("10e1fd21-38d9-4c83-a7b2-c370e53b95d6"),
            },
            new Event
            {
                Id = new Guid("33dd3330-153d-4c33-b1fa-c9fd421b042b"),
                Name = "Charity Art Auction",
                Description = "Licitație caritabilă de artă, cu scopul de a sprijini tinerii artiști.",
                Location = "Muzeul Național de Artă, Cluj-Napoca",
                Date = DateTime.Now.AddDays(15),
                ParticipantsLimit = 150,
                OrganizerId = new Guid("ef043f56-86d2-4b68-9e03-996aadf92c76"),
            },
            new Event
            {
                Id = new Guid("abc12345-6789-def0-1234-56789abcdef0"),
                Name = "Mountain Hiking Adventure",
                Description = "O excursie de o zi pentru iubitorii de drumeții montane.",
                Location = "Munții Bucegi",
                Date = DateTime.Now.AddDays(7),
                ParticipantsLimit = 20,
                OrganizerId = new Guid("022a8895-fe55-4e13-8bd9-402709435f78"),
            },
            new Event
            {
                Id = new Guid("bca54321-9876-0fed-4321-abcdef098765"),
                Name = "Tech Startup Meetup",
                Description = "Eveniment dedicat start-up-urilor din domeniul tehnologiei.",
                Location = "Tech Hub, București",
                Date = DateTime.Now.AddDays(12),
                ParticipantsLimit = 80,
                OrganizerId = new Guid("1e5fe355-5a9f-484f-bff6-f497f5fc0609"),
            },
            new Event
            {
                Id = new Guid("7890abcd-ef12-3456-789a-bcdef0123456"),
                Name = "Open Mic Night",
                Description = "O seară de stand-up comedy și improvizație.",
                Location = "Cafe Deko, București",
                Date = DateTime.Now.AddDays(6),
                ParticipantsLimit = 40,
                OrganizerId = new Guid("10e1fd21-38d9-4c83-a7b2-c370e53b95d6"),
            },
            new Event
            {
                Id = new Guid("6c52f750-a4bf-4ae5-b14a-3b3798e9f049"),
                Name = "Jazz & Wine Evening",
                Description = "O seară de jazz și degustare de vinuri premium.",
                Location = "Vinoteca Elite, Sibiu",
                Date = DateTime.Now.AddDays(8),
                ParticipantsLimit = 60,
                OrganizerId = new Guid("ef043f56-86d2-4b68-9e03-996aadf92c76"),
            },
            new Event
            {
                Id = new Guid("9d144b91-5506-416b-9f34-94487495a09f"),
                Name = "Photography Workshop",
                Description = "Atelier de fotografie pentru începători și avansați.",
                Location = "Casa de Cultură, Brașov",
                Date = DateTime.Now.AddDays(14),
                ParticipantsLimit = 25,
                OrganizerId = new Guid("022a8895-fe55-4e13-8bd9-402709435f78"),
            },
            new Event
            {
                Id = new Guid("ab9ec4f0-29f0-46db-9550-7a3bdfd9fb06"),
                Name = "Startup Pitch Night",
                Description = "Oportunitate pentru antreprenori de a-și prezenta ideile în fața investitorilor.",
                Location = "Coworking Hub, Cluj-Napoca",
                Date = DateTime.Now.AddDays(11),
                ParticipantsLimit = 100,
                OrganizerId = new Guid("1e5fe355-5a9f-484f-bff6-f497f5fc0609"),
            }

        };
        
        _dbContext.Events.AddRange(events);
        _dbContext.SaveChanges();
    }
}