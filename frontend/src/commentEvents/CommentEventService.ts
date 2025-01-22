export interface CommentDto {
    userId: string;
    eventId: string;
    text: string;

}

export class CommentEventService {
    private apiBaseUrl = "http://localhost:5009/api/Event/comments";
    private userApiUrl = "http://localhost:5009/api/User";

    // Get all comments
    public async getAllComments(): Promise<CommentDto[]> {
        const response = await fetch(this.apiBaseUrl);
        if (!response.ok) throw new Error("Failed to fetch comments.");
        return response.json();
    }

    // Get all comments by eventId
    public async getCommentsByEventId(eventId: string): Promise<CommentDto[]> {
        const response = await fetch(`${this.apiBaseUrl}/event/${eventId}`);
        if (!response.ok) throw new Error("Failed to fetch comments for event.");
        return response.json();
    }

    // Get all comments by userId
    public async getCommentsByUserId(userId: string): Promise<CommentDto[]> {
        const response = await fetch(`${this.apiBaseUrl}/user/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch comments by user.");
        return response.json();
    }

    // Get specific comments by userId and eventId
    public async getReviewByUserAndEvent(userId: string, eventId: string): Promise<CommentDto[] | null> {
        const response = await fetch(`${this.apiBaseUrl}/${userId}/${eventId}`);
        if (response.status === 404) return null;
        if (!response.ok) throw new Error("Failed to fetch comments.");
        return response.json();
    }

    // Create or update a review
    public async createComment(comment: CommentDto): Promise<void> {
        const response = await fetch(`${this.apiBaseUrl}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        });

        if (!response.ok) throw new Error("Failed to create comment.");
    }

    // Fetch user by Facebook ID
    public async getUserByFacebookId(facebookId: string): Promise<any> {
        const response = await fetch(`${this.userApiUrl}/user?facebookId=${facebookId}`, {
            method: "GET",
            headers: {
            "Accept": "application/json",
            },
        });

        if (!response.ok) {
        throw new Error(`Failed to fetch user with Facebook ID ${facebookId}.`);
        }

        return response.json();
    }

}
