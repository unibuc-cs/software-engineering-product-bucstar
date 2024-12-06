
export class EventCardModel {
    public readonly name: string;
    public readonly description: string;
    public readonly location: string;
    public readonly date: Date;
    public readonly organizer: String;
    public readonly maximumParticipants: Number;
    public readonly registeredParticipants: Number;
    
    constructor(
        name: string, 
        description: string,
        location: string,
        date: Date,
        organizer: String,
        maximumParticipants: Number,
        registeredParticipants: Number,
    ) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.date = date;
        this.organizer = organizer; 
        this.maximumParticipants = maximumParticipants;
        this.registeredParticipants = registeredParticipants;
    }
    
    
}