import {Participant} from "./Participant";
import {Tag} from "./Tag";
import {Review} from "./Review";
import {Comment} from "./Comment";

export class ViewEventModel {
    public readonly name: string;
    public readonly organizerName: string;
    public readonly location: string;
    public readonly date: Date;
    public readonly maximumParticipants: number;
    public readonly participants: Participant[];
    public readonly tags: Tag[];
    public readonly reviews: Review[];
    public readonly comments: Comment[];
    
    constructor(
        name: string, 
        organizerName: string, 
        location: string,
        date: Date,
        maximumParticipants: number,
        participants: Participant[],
        tags: Tag[],
        reviews: Review[],
        comments: Comment[],
    ) {
        this.name = name;
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