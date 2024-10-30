workspace "Name" "Description" {

    !identifiers hierarchical

    model {
        eventOrganizer = person "Event Organizer" {
            description "A person that wants to find other people to join his activities"
        }
        user = person "User" {
            description "A person that wants to find fun events to take part in"
        }
        facebook = softwareSystem "Facebook" {
            description "Social media platform"
        }

        vibesync = softwareSystem "VibeSync" {
            description "Allows users to browse, create and register to events and activities created by other users"
            database = container "Database" {
                description "Stores user and event data"
                technology "TODO"
            }
            server = container "Api Application" {
                description "Provides events management via a JSON/HTTP Api"
                technology "C# and .Net"

                accountController = component "Account Controller" {
                    description "Allows users to sign in to the VibeSync platform"
                    technology ".Net ApiController"
                }
                accountComponent = component "Account Component" {
                    description "Provides functionality regarding account managment"
                    technology "Collection of C# classes"
                }
                browseController = component "Browse Controller" {
                    description "Provides general events data"
                    technology ".Net ApiController"
                }
                browseComponent = component "Browse Component" {
                    description "Provides functionality regarding fetching general future events data"
                    technology "Collection of C# classes"
                }
                eventController = component "Event Controller" {
                    description "Provides event fetching, updating and creating"
                    technology ".Net ApiController"
                }
                eventComponent = component "Event Component" {
                    description "Provides functionality regarding event viewing, updating and creating"
                    technology "Collection of C# classes"
                }
                historyController = component "History Controller" {
                    description "Provides general data for past events"
                    technology ".Net ApiController"
                }
                historyComponent = component "History Component" {
                    description "Provides general past event data"
                    technology "Collection of C# classes"
                }
                recommendationController = component "Recommendation Controller" {
                    description "Provides events data based on user preferences"
                    technology ".Net ApiController"
                }
                recommendationComponent = component "Recommendation Component" {
                    description "Provides recommended events"
                    technology "Collection of C# classes"
                }
                databaseComponent = component "Database Component" {
                    description "Provides CRUD functionality"
                    technology "Collection of C# classes (repositories)"
                }
                
            }
            web = container "Web Application" {
                description "Provides all the platform functionality via a web browser"
                technology "TypeScript and React"

                accountModule = component "Account Module" {
                    description "Allows users to signup/login to the platform"
                }
                browseModule = component "Browse Module" {
                    description "Allows users to browse future events"
                }
                eventCreationModule = component "Event Creation Module" {
                    description "Allows users to create events"
                }
                eventViewModule = component "Event View Module" {
                    description "Allows users to view event details"
                }
                historyModule = component "History Module" {
                    description "Allows users to view past events they participated in"
                }
                recommendationModule = component "Recommendation Module" {
                    description "Displays a list of recommended future events based on user preferences"
                }
            }
        }

        repositoryNote = element "RepositoryNote" {
            tag "note"
            description "Each component (except Database Component) needs the have a repository interface, which will be implemented in the DatabaseComponent
        }

        user -> vibesync "browses and registers for events via"
        eventOrganizer -> vibesync "creates events via"
        user -> facebook "connects to"
        eventOrganizer -> facebook "connects to"
        vibesync -> facebook "gets user account data from"
        user -> vibesync.web "accesses platform via"
        eventOrganizer -> vibesync.web "accesses platform via"
        vibesync.server -> vibesync.database "queries and updates"
        vibesync.web -> vibesync.server "makes HTTP/HTTPS requests"
        vibesync.web -> facebook "gets user account from"

        vibesync.web -> vibesync.server.accountController "makes API calls to"
        vibesync.web -> vibesync.server.browseController "makes API calls to"
        vibesync.web -> vibesync.server.eventController "makes API calls to"
        vibesync.web -> vibesync.server.historyController "makes API calls to"
        vibesync.web -> vibesync.server.recommendationController "makes API calls to"
                                        
        vibesync.server.accountController -> vibesync.server.accountComponent "uses"
        vibesync.server.browseController -> vibesync.server.browseComponent "uses"
        vibesync.server.eventController -> vibesync.server.eventComponent "uses"
        vibesync.server.historyController -> vibesync.server.historyComponent "uses"
        vibesync.server.recommendationController -> vibesync.server.recommendationComponent "uses"

        vibesync.server.accountComponent -> vibesync.server.databaseComponent "interacts with the database via"
        vibesync.server.browseComponent -> vibesync.server.databaseComponent "interacts with the database via"
        vibesync.server.eventComponent -> vibesync.server.databaseComponent "interacts with the database via"
        vibesync.server.historyComponent -> vibesync.server.databaseComponent "interacts with the database via"
        vibesync.server.recommendationComponent -> vibesync.server.databaseComponent "interacts with the database via"
        
        vibesync.server.databaseComponent -> vibesync.database "accesses database"

        user -> vibesync.web.accountModule "Connects to the platform via"
        user -> vibesync.web.browseModule "Browses future events via"
        eventOrganizer -> vibesync.web.eventCreationModule "Created a new event via"
        user -> vibesync.web.eventViewModule "Views event details via"
        user -> vibesync.web.historyModule "Views the events he participated to in the past via"
        user -> vibesync.web.recommendationModule "Views a list of recommended events via"
        vibesync.web.accountModule -> facebook "Gets user account via"
        vibesync.web.accountModule -> vibesync.server "makes HTTP requests to"
        vibesync.web.browseModule -> vibesync.server "makes HTTP requests to"
        vibesync.web.eventCreationModule -> vibesync.server "makes HTTP requests to"
        vibesync.web.eventViewModule -> vibesync.server "makes HTTP requests to"
        vibesync.web.historyModule -> vibesync.server "makes HTTP requests to"
        vibesync.web.recommendationModule -> vibesync.server "makes HTTP requests to"

    }

    views {
        systemContext vibesync "Vibesync-Context" {
            include *
            autolayout lr
        }

        container vibesync "Vibesync-Container" {
            include *
            autolayout lr
        }

        component vibesync.web "WebApp-Component" {
            include *
            autolayout lr
        }
        component vibesync.server "ApiApplication-Component" {
            include *
            include repositoryNote
            autolayout lr
        }

        styles {
            element "Element" {
                color #ffffff
            }
            element "Person" {
                background #1a73e8
                shape person
            }
            element "Software System" {
                background #0d47a1
            }
            element "Container" {
                background #1976d2
            }
            element "Component" {
                background #1976d2
            }
            element "Database" {
                shape cylinder
                background #1565c0
            }
            element "note" {
                background #333333
            }
        }
    }

    configuration {
        scope softwaresystem
    }

}
