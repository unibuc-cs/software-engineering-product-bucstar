export interface JoinEventDto {
    eventId: string;
    userId: string;
}

export class JoinEventService {
    private apiUrl: string = 'http://localhost:5009/api/Participation/join';

    public async joinEvent(dto: JoinEventDto, accessToken: string): Promise<any> {
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
                throw new Error(errorData || 'Failed to join event');
            }
        } catch (error) {
            console.error('Error joining event:', error);
            throw error;
        }
    }
}
