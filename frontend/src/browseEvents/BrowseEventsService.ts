import {BrowseEventsModel} from "./BrowseEventsModel";
import { FacebookLoginHelper } from "../utils/facebookLoginHelper";
import { EventCardModel } from "../components/eventsList/eventCard/EventCardModel";

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
    private browseAllApiUrl: string = 'http://localhost:5009/api/Event/events/browse';
    private browseRegisteredApiUrl: string = 'http://localhost:5009/api/Event/events/user/'

    public async getBrowseEventsModel(): Promise<BrowseEventsModel> {
        try {
            const response = await fetch(this.browseAllApiUrl, {
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

    public async getBrowseRegisteredEventsModel(): Promise<BrowseEventsModel> {
        try {
            let loginResponse = await FacebookLoginHelper.checkLoginStatus();
            let userId = loginResponse.userInfo?.id!
            this.browseRegisteredApiUrl = this.browseRegisteredApiUrl + userId + "/future";
            const response = await fetch(this.browseRegisteredApiUrl, {
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