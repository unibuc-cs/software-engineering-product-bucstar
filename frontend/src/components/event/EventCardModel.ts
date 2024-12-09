
export class EventCardModel {
    public readonly name: string;
    public readonly description: string;
    public readonly location: string;
    public readonly date: Date;
    public readonly organizer: String;
    public readonly maximumParticipants: number;
    public readonly registeredParticipants: number;
    public readonly tags: string[];
    
    constructor(
        name: string, 
        description: string,
        location: string,
        date: Date,
        organizer: String,
        maximumParticipants: number,
        registeredParticipants: number,
        tags: string[],
    ) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.date = date;
        this.organizer = organizer; 
        this.maximumParticipants = maximumParticipants;
        this.registeredParticipants = registeredParticipants;
        this.tags = tags;
    }
    
    
}