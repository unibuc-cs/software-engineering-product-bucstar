import {EventCardModel} from "./eventCard/EventCardModel";
import {BrowseEventsModel} from "./BrowseEventsModel";

export interface EventSummaryDto {
    id: string;
    name: string;
    description: string;
    location: string;
    date: string;
    organizer: string;
    maximumParticipants: number;
    registeredParticipants: number;
    tags: string[];
}

export class BrowseEventsService {
    private apiUrl: string = 'http://localhost:5009/api/Event/events/browse';

    public async getBrowseEventsModel(): Promise<BrowseEventsModel> {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any authentication headers here, if needed
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const eventSummaryDtos = await response.json();
            const eventCardModels: EventCardModel[] = eventSummaryDtos.map((summary: EventSummaryDto) => {
                return new EventCardModel(
                    summary.id,
                    summary.name,
                    summary.description,
                    summary.location, 
                    new Date(Date.parse(summary.date)),
                    summary.organizer,
                    summary.maximumParticipants,
                    summary.registeredParticipants,
                    summary.tags
                )
            })
            return new BrowseEventsModel(eventCardModels);
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    }
}