export interface ReviewDto {
    userId: string;
    eventId: string;
    text: string;
    score: number;
}

export class ReviewEventService {
    private apiBaseUrl = "http://localhost:5009/api/Event/reviews";

    // Get all reviews
    public async getAllReviews(accessToken: string): Promise<ReviewDto[]> {
        const response = await fetch(this.apiBaseUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) throw new Error("Failed to fetch reviews.");
        return response.json();
    }

    // Get all reviews by eventId
    public async getReviewsByEventId(eventId: string, accessToken: string): Promise<ReviewDto[]> {
        const response = await fetch(`${this.apiBaseUrl}/event/${eventId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            }
        });
        if (!response.ok) throw new Error("Failed to fetch reviews for event.");
        return response.json();
    }

    // Get all reviews by userId
    public async getReviewsByUserId(userId: string, accessToken: string): Promise<ReviewDto[]> {
        const response = await fetch(`${this.apiBaseUrl}/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            }
        });
        if (!response.ok) throw new Error("Failed to fetch reviews by user.");
        return response.json();
    }

    // Get specific review by userId and eventId
    public async getReviewByUserAndEvent(eventId: string, accessToken: string): Promise<ReviewDto | null> {
        const response = await fetch(`${this.apiBaseUrl}/${eventId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            }
        });
        if (response.status === 404) return null;
        if (!response.ok) throw new Error("Failed to fetch review.");
        return response.json();
    }

    // Create or update a review
    public async createOrUpdateReview(review: ReviewDto, accessToken: string): Promise<void> {
        const response = await fetch(`${this.apiBaseUrl}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(review),
        });

        if (!response.ok) throw new Error("Failed to create or update review.");
    }

    // Delete a review by userId and eventId
    public async deleteReview(eventId: string, accessToken: string): Promise<void> {
        const response = await fetch(`${this.apiBaseUrl}/${eventId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) throw new Error("Failed to delete review.");
    }

}
