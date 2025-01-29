export interface CommentDto {
    userId: string;
    eventId: string;
    text: string;

}

export class CommentEventService {
    private apiBaseUrl = "http://localhost:5009/api/Event/comments";
    // Get all comments
    public async getAllComments(accessToken: string): Promise<CommentDto[]> {
        const response = await fetch(this.apiBaseUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) throw new Error("Failed to fetch comments.");
        return response.json();
    }

    // Get all comments by eventId
    public async getCommentsByEventId(eventId: string, accessToken: string): Promise<CommentDto[]> {
        const response = await fetch(`${this.apiBaseUrl}/event/${eventId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            }
        });
        if (!response.ok) throw new Error("Failed to fetch comments for event.");
        return response.json();
    }

    // Get all comments by userId
    public async getCommentsByUserId(accessToken: string): Promise<CommentDto[]> {
        const response = await fetch(`${this.apiBaseUrl}/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            }
        });
        if (!response.ok) throw new Error("Failed to fetch comments by user.");
        return response.json();
    }

    // Get specific comments by userId and eventId
    public async getReviewByUserAndEvent(eventId: string, accessToken: string): Promise<CommentDto[] | null> {
        const response = await fetch(`${this.apiBaseUrl}/${eventId}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            }
        });
        if (response.status === 404) return null;
        if (!response.ok) throw new Error("Failed to fetch comments.");
        return response.json();
    }

    // Create or update a review
    public async createComment(comment: CommentDto, accessToken: string): Promise<void> {
        const response = await fetch(`${this.apiBaseUrl}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(comment),
        });

        if (!response.ok) throw new Error("Failed to create comment.");
    }
}
