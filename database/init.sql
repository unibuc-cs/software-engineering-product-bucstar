use vibesyncdb;

CREATE TABLE User (
    id INT PRIMARY KEY,
    nickname VARCHAR(255)
);

CREATE TABLE Event (
    id INT PRIMARY KEY,
    organizerId INT,
    name VARCHAR(255),
    description VARCHAR(2000),
    date DATETIME,
    location VARCHAR(255),
    participantsLimit INT,
    FOREIGN KEY (organizerId) REFERENCES User(id)
);

CREATE TABLE Tag (
    id INT PRIMARY KEY,
    eventId INT,
    name VARCHAR(31), -- Updated limit
    FOREIGN KEY (eventId) REFERENCES Event(id)
);

CREATE TABLE Participation (
    id INT PRIMARY KEY,
    eventId INT,
    userId INT,
    FOREIGN KEY (eventId) REFERENCES Event(id),
    FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE TABLE Review (
    id INT PRIMARY KEY,
    eventId INT,
    userId INT,
    score INT,
    text VARCHAR(2000),
    FOREIGN KEY (eventId) REFERENCES Event(id),
    FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE TABLE Comment (
    id INT PRIMARY KEY,
    eventId INT,
    userId INT,
    text VARCHAR(2000),
    timestamp DATETIME,
    FOREIGN KEY (eventId) REFERENCES Event(id),
    FOREIGN KEY (userId) REFERENCES User(id)
);

CREATE TABLE Notification (
    id INT PRIMARY KEY,
    userId INT,
    text VARCHAR(255),
    seen BOOLEAN,
    timestamp DATETIME,
    FOREIGN KEY (userId) REFERENCES User(id)
);

