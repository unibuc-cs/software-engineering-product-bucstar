import {ViewEventModel} from "./ViewEventModel";
import {Participant} from "./Participant";
import {Review} from "./Review";
import {Comment} from "./Comment";

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

interface EventDetailedDto {
    id: string;
    name: string;
    description: string;
    location: string;
    date: Date;
    organizer: string;
    maximumParticipants: number;
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


            const eventDetailedDto = await response.json();
            console.log(eventDetailedDto);
            return new ViewEventModel(
                eventDetailedDto.name,
                eventDetailedDto.description,
                eventDetailedDto.organizer,
                eventDetailedDto.location,
                new Date(Date.parse(eventDetailedDto.date)),
                eventDetailedDto.maximumParticipants,
                eventDetailedDto.participants.map((dto: ParticipantDto) => new Participant(dto.username)),
                eventDetailedDto.tags,
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