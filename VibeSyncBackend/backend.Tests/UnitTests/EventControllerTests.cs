using backend.account;
using backend.database.models;
using backend.events;
using backend.events.dto;
using backend.Helpers;
using backend.Models;
using backend.participations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;
using Newtonsoft.Json.Linq;

namespace backend.Tests;

public class EventControllerTests
{
    [Fact]
    public async Task GetFutureEvents_ReturnsOkResult_WithListOfEventSummaries()
    {
        // Arrange
        var mockEventService = new Mock<EventService>(
            Mock.Of<IParticipationRepository>(),
            Mock.Of<IEventRepository>(),
            Mock.Of<IUserRepository>(),
            Mock.Of<ITagRepository>()
        );

        var futureEvents = new List<Event>
        {
            new Event
            {
                Id = Guid.NewGuid(),
                Name = "Future Event 1",
                Description = "Description 1",
                Location = "Location 1",
                Date = DateTime.Now.AddDays(10),
                ParticipantsLimit = 100,
                OrganizerId = Guid.NewGuid(),
                Organizer = new User { FacebookId = "123", Nickname = "Organizer 1" },
                Tags = new List<Tag>(),
                Participations = new List<Participation>(),
                Reviews = new List<Review>(),
                Comments = new List<Comment>()
            },
            new Event
            {
                Id = Guid.NewGuid(),
                Name = "Future Event 2",
                Description = "Description 2",
                Location = "Location 2",
                Date = DateTime.Now.AddDays(20),
                ParticipantsLimit = 200,
                OrganizerId = Guid.NewGuid(),
                Organizer = new User { FacebookId = "456", Nickname = "Organizer 2" },
                Tags = new List<Tag>(),
                Participations = new List<Participation>(),
                Reviews = new List<Review>(),
                Comments = new List<Comment>()
            }
        };

        var eventSummaries = futureEvents.Select(ev => new EventSummaryDto(ev)).ToList();

        mockEventService
            .Setup(service => service.GetFutureEvents())
            .ReturnsAsync(eventSummaries);
        
        // Mock IConfiguration for FacebookTokenValidator
        var mockConfiguration = new Mock<IConfiguration>();
        mockConfiguration
            .Setup(config => config["APP_ACCESS_TOKEN"])
            .Returns("dummy_access_token");
        
        var facebookTokenValidator = new FacebookTokenValidator(mockConfiguration.Object);

        var controller = new EventController(mockEventService.Object, facebookTokenValidator);

        // Act
        var result = await controller.GetFutureEvents();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnValue = Assert.IsType<List<EventSummaryDto>>(okResult.Value);
        Assert.Equal(2, returnValue.Count);
    }

    [Fact]
    public async Task GetFutureEvents_ReturnsInternalServerError_WhenExceptionThrown()
    {
        // Arrange
        var mockEventService = new Mock<EventService>(
            Mock.Of<IParticipationRepository>(),
            Mock.Of<IEventRepository>(),
            Mock.Of<IUserRepository>(),
            Mock.Of<ITagRepository>()
        );

        mockEventService
            .Setup(service => service.GetFutureEvents())
            .ThrowsAsync(new Exception("Test exception"));

        // Mock IConfiguration for FacebookTokenValidator
        var mockConfiguration = new Mock<IConfiguration>();
        mockConfiguration
            .Setup(config => config["APP_ACCESS_TOKEN"])
            .Returns("dummy_access_token");
        
        var facebookTokenValidator = new FacebookTokenValidator(mockConfiguration.Object);

        var controller = new EventController(mockEventService.Object, facebookTokenValidator);

        // Act
        var result = await controller.GetFutureEvents();

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusCodeResult.StatusCode);
        Assert.Equal("Test exception", statusCodeResult.Value);
    }
    
    [Fact]
    public async Task GetEvent_ReturnsOkResult_WithEventDetailedDto()
    {
        // Arrange
        var mockEventService = new Mock<EventService>(
            Mock.Of<IParticipationRepository>(),
            Mock.Of<IEventRepository>(),
            Mock.Of<IUserRepository>(),
            Mock.Of<ITagRepository>()
        );

        var eventId = Guid.NewGuid().ToString();
        var eventDetailedDto = new EventDetailedDto(new Event
        {
            Id = Guid.Parse(eventId),
            Name = "Test Event",
            Description = "Test Description",
            Location = "Test Location",
            Date = DateTime.Now.AddDays(10),
            ParticipantsLimit = 100,
            OrganizerId = Guid.NewGuid(),
            Organizer = new User { FacebookId = "123", Nickname = "Organizer" },
            Tags = new List<Tag>(),
            Participations = new List<Participation>(),
            Reviews = new List<Review>(),
            Comments = new List<Comment>()
        });

        mockEventService
            .Setup(service => service.GetDetailedEvent(eventId))
            .ReturnsAsync(eventDetailedDto);

        var mockConfiguration = new Mock<IConfiguration>();
        mockConfiguration
            .Setup(config => config["APP_ACCESS_TOKEN"])
            .Returns("dummy_access_token");

        var facebookTokenValidator = new FacebookTokenValidator(mockConfiguration.Object);
        var controller = new EventController(mockEventService.Object, facebookTokenValidator);

        // Act
        var result = await controller.GetEvent(eventId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnValue = Assert.IsType<EventDetailedDto>(okResult.Value);
        Assert.Equal(eventId, returnValue.Id.ToString());
    }

    [Fact]
    public async Task GetEvent_ReturnsInternalServerError_WhenExceptionThrown()
    {
        // Arrange
        var mockEventService = new Mock<EventService>(
            Mock.Of<IParticipationRepository>(),
            Mock.Of<IEventRepository>(),
            Mock.Of<IUserRepository>(),
            Mock.Of<ITagRepository>()
        );

        var eventId = Guid.NewGuid().ToString();

        mockEventService
            .Setup(service => service.GetDetailedEvent(eventId))
            .ThrowsAsync(new Exception("Test exception"));

        var mockConfiguration = new Mock<IConfiguration>();
        mockConfiguration
            .Setup(config => config["APP_ACCESS_TOKEN"])
            .Returns("dummy_access_token");

        var facebookTokenValidator = new FacebookTokenValidator(mockConfiguration.Object);
        var controller = new EventController(mockEventService.Object, facebookTokenValidator);

        // Act
        var result = await controller.GetEvent(eventId);

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusCodeResult.StatusCode);
        Assert.Equal("Test exception", statusCodeResult.Value);
    }
    
    [Fact]
    public async Task CreateEvent_ReturnsOkResult_WhenEventIsCreated()
    {
        // Arrange
        var mockEventService = new Mock<EventService>(
            Mock.Of<IParticipationRepository>(),
            Mock.Of<IEventRepository>(),
            Mock.Of<IUserRepository>(),
            Mock.Of<ITagRepository>()
        );

        var createEventDto = new CreateEventDto
        {
            Id = Guid.NewGuid().ToString(),
            Name = "New Event",
            Description = "New Description",
            Location = "New Location",
            Date = DateTime.Now.AddDays(10).ToString(),
            OrganizerId = "123",
            ParticipantsLimitEnabled = true,
            ParticipantsLimit = 10,
            Tags = ["Tag1", "Tag2", "Tag3"],
        };

        mockEventService
            .Setup(service => service.CreateEventAsync(createEventDto))
            .ReturnsAsync(createEventDto);

        var mockConfiguration = new Mock<IConfiguration>();
        mockConfiguration
            .Setup(config => config["APP_ACCESS_TOKEN"])
            .Returns("dummy_access_token");

        var facebookTokenValidator = new FacebookTokenValidator(mockConfiguration.Object);
        var controller = new EventController(mockEventService.Object, facebookTokenValidator);

        // Mock UserInfo in HttpContext
        var userInfo = new JObject
        {
            ["data"] = new JObject
            {
                ["user_id"] = "123"
            }
        };
        controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext
            {
                Items = new Dictionary<object, object>
                {
                    { "UserInfo", userInfo }
                }!
            }
        };

        // Act
        var result = await controller.CreateEvent(createEventDto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal("Event created successfully", okResult.Value?.GetType().GetProperty("message")?.GetValue(okResult.Value));
    }

    [Fact]
    public async Task CreateEvent_ReturnsBadRequest_WhenValidationFails()
    {
        // Arrange
        var mockEventService = new Mock<EventService>(
            Mock.Of<IParticipationRepository>(),
            Mock.Of<IEventRepository>(),
            Mock.Of<IUserRepository>(),
            Mock.Of<ITagRepository>()
        );

        var createEventDto = new CreateEventDto
        {
            Id = Guid.NewGuid().ToString(),
            Name = "",
            Description = "New Description",
            Location = "New Location",
            Date = DateTime.Now.AddDays(10).ToString(),
            OrganizerId = "123",
            ParticipantsLimitEnabled = true,
            ParticipantsLimit = 10,
            Tags = ["Tag1", "Tag2", "Tag3"],
        };

        var mockConfiguration = new Mock<IConfiguration>();
        mockConfiguration
            .Setup(config => config["APP_ACCESS_TOKEN"])
            .Returns("dummy_access_token");

        var facebookTokenValidator = new FacebookTokenValidator(mockConfiguration.Object);
        var controller = new EventController(mockEventService.Object, facebookTokenValidator);

        // Mock UserInfo in HttpContext
        var userInfo = new JObject
        {
            ["data"] = new JObject
            {
                ["user_id"] = "123"
            }
        };
        controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext
            {
                Items = new Dictionary<object, object>
                {
                    { "UserInfo", userInfo }
                }!
            }
        };

        // Act
        var result = await controller.CreateEvent(createEventDto);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Name, description, location, and date are required.", badRequestResult.Value);
    }
}