export interface CreateEventDto {
    name: string;
    description: string;
    location: string;
    organizerId: string;
    date: string;
    participantsLimitEnabled: boolean;
    participantsLimit: number;
}

export class CreateEventService {
    private apiUrl: string = 'http://localhost:5009/api/Event/events/create';

    public async createEvent(dto: CreateEventDto): Promise<any> {
        try {
            console.log(JSON.stringify(dto));
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
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