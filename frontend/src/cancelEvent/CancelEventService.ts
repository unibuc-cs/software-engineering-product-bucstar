export class CancelEventService {
    private apiUrl: string = 'http://localhost:5009/api/Event/events/delete';

    public async cancelEvent(eventId: string): Promise<any> {
        try {
            const response = await fetch(`${this.apiUrl}/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                return await response.json();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete the event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            throw error;
        }
    }
}
