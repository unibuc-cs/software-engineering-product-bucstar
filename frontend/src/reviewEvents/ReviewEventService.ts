export interface ReviewDto {
    userId: string;
    eventId: string;
    text: string;
    score: number;
}

export class ReviewEventService {
    private apiBaseUrl = "http://localhost:5009/api/Event/reviews";
    private userApiUrl = "http://localhost:5009/api/User";

    // Get all reviews
    public async getAllReviews(): Promise<ReviewDto[]> {
        const response = await fetch(this.apiBaseUrl);
        if (!response.ok) throw new Error("Failed to fetch reviews.");
        return response.json();
    }

    // Get all reviews by eventId
    public async getReviewsByEventId(eventId: string): Promise<ReviewDto[]> {
        const response = await fetch(`${this.apiBaseUrl}/event/${eventId}`);
        if (!response.ok) throw new Error("Failed to fetch reviews for event.");
        return response.json();
    }

    // Get all reviews by userId
    public async getReviewsByUserId(userId: string): Promise<ReviewDto[]> {
        const response = await fetch(`${this.apiBaseUrl}/user/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch reviews by user.");
        return response.json();
    }

    // Get specific review by userId and eventId
    public async getReviewByUserAndEvent(userId: string, eventId: string): Promise<ReviewDto | null> {
        const response = await fetch(`${this.apiBaseUrl}/${userId}/${eventId}`);
        if (response.status === 404) return null;
        if (!response.ok) throw new Error("Failed to fetch review.");
        return response.json();
    }

    // Create or update a review
    public async createOrUpdateReview(review: ReviewDto): Promise<void> {
        const response = await fetch(`${this.apiBaseUrl}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(review),
        });

        if (!response.ok) throw new Error("Failed to create or update review.");
    }

    // Delete a review by userId and eventId
    public async deleteReview(userId: string, eventId: string): Promise<void> {
        const response = await fetch(`${this.apiBaseUrl}/${userId}/${eventId}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete review.");
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
