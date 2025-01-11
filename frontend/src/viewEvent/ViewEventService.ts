import {ViewEventModel} from "./ViewEventModel";
import {Participant} from "./Participant";
import {Review} from "./Review";
import {Comment} from "./Comment";
import {Tag} from "./Tag";

interface CommentDto {
    username: string;
    text: string;
}

interface ParticipantDto {
    username: string;
}

interface ReviewDto {
    username: string;
    score: number;
    text: string;
}

interface TagDto {
    name: string;
}

interface EventDetailedDto {
    id: string;
    name: string;
    description: string;
    location: string;
    date: string;
    organizer: string;
    maximumParticipants: number;
    tags: TagDto[];
    participants: ParticipantDto[];
    reviews: ReviewDto[];
    comments: CommentDto[];
}

export class ViewEventService {
    private apiUrl: string = 'http://localhost:5009/api/Event/events/';
    
    public async getViewEventModel(id: string): Promise<ViewEventModel> {
        try {
            const url = `${this.apiUrl}${id}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any authentication headers here, if needed
                },
            });
            
            if(!response.ok) {
                throw new Error(response.statusText);
            }

            const eventDetailedDto: EventDetailedDto = await response.json();
            console.log(eventDetailedDto);
            return new ViewEventModel(
                eventDetailedDto.name,
                eventDetailedDto.description,
                eventDetailedDto.organizer,
                eventDetailedDto.location,
                new Date(Date.parse(eventDetailedDto.date)),
                eventDetailedDto.maximumParticipants,
                eventDetailedDto.participants.map((dto: ParticipantDto) => new Participant(dto.username)),
                eventDetailedDto.tags.map((dto: TagDto) => new Tag(dto.name)),
                eventDetailedDto.reviews.map((dto: ReviewDto) => new Review(dto.username, dto.score, dto.text)),
                eventDetailedDto.comments.map((dto: CommentDto) => new Comment(dto.username, dto.text))
            )
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}