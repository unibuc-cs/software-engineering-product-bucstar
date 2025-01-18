import { JoinEventDto } from "./JoinEventService";

export class UnjoinEventService {
    private apiUrl: string = 'http://localhost:5009/api/Participation/unjoin';

    public async unjoinEvent(dto: JoinEventDto): Promise<any> {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(dto),
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const errorData = await response.json();
                throw new Error(errorData || 'Failed to unjoin event');
            }
        } catch (error) {
            console.error('Error unjoining event:', error);
            throw error;
        }
    }
}
