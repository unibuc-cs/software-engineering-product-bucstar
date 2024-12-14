import {Participant} from "./Participant";
import {Tag} from "./Tag";
import {Review} from "./Review";
import {Comment} from "./Comment";

export class ViewEventModel {
    public readonly name: string;
    public readonly description: string;
    public readonly organizerFacebookId: string;
    public readonly organizerName: string;
    public readonly location: string;
    public readonly date: Date;
    public readonly maximumParticipants: number;
    public readonly participants: Participant[];
    public readonly tags: Tag[];
    public readonly reviews: Review[];
    public readonly comments: Comment[];
    
    constructor(
        name: string = "name", 
        description: string = "description",
        organizerFacebookId: string = "organizerFacebookId",
        organizerName: string = "organizerName", 
        location: string = "Bucharest",
        date: Date = new Date(),
        maximumParticipants: number = 12,
        participants: Participant[] = [],
        tags: Tag[] = [],
        reviews: Review[] = [],
        comments: Comment[] = [],
    ) {
        this.name = name;
        this.description = description;
        this.organizerFacebookId = organizerFacebookId;
        this.organizerName = organizerName;
        this.location = location;
        this.date = date;
        this.maximumParticipants = maximumParticipants;
        this.participants = participants;
        this.tags = tags;
        this.reviews = reviews;
        this.comments = comments;
    }
}