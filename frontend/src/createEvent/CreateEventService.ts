import { useAuth } from "../utils/authProvider";
import {CreateEventModel} from "./CreateEventModel";

export interface CreateEventDto {
    id: string,
    name: string;
    description: string;
    location: string;
    organizerId: string;
    date: string;
    participantsLimitEnabled: boolean;
    participantsLimit: number;
    tags: string[];
}

export class CreateEventService {
    private apiUrl: string = 'http://localhost:5009/api/Event/events/create';

    public async createEvent(dto: CreateEventDto, accessToken: string): Promise<any> {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(dto),
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const errorData = await response.json();
                throw new Error(errorData?.message || 'Failed to create event');
            }
        } catch (error) {
            console.error('Error creating event:', error);
            throw error; 
        }
    }

    public async getEventModel(id: string, accessToken: string): Promise<CreateEventModel> {
        let url = `http://localhost:5009/api/Event/events/edit/${id}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });


            if (response.ok) {
                const data: CreateEventDto = await response.json();
                console.log(data);
                const model = new CreateEventModel(
                    data.id,
                    data.name,
                    data.description,
                    data.location,
                    new Date(Date.parse(data.date)),
                    data.participantsLimitEnabled,
                    data.participantsLimit,
                    data.tags,
                )
                return model;
            } else {
                const errorData = await response.json();
                throw new Error(errorData?.message || 'Failed to create event');
            }
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }

    async updateEvent(dto: CreateEventDto, accessToken: string): Promise<any> {
        try {
            let url = `http://localhost:5009/api/Event/events/edit/update`;

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(dto),
            });

            console.log(response);

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const errorData = await response.json();
                throw new Error(errorData?.message || 'Failed to create event');
            }
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }
}