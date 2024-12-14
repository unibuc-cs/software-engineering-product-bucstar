import {Review} from "../Review";

export class ReviewModel {
    public readonly reviewerName: string;
    public readonly score: number;
    public readonly text: string;
    constructor(
        reviewerName: string, 
        score: number,
        text: string,
    ) {
        this.reviewerName = reviewerName;
        this.score = score;
        this.text = text;
    }
    
    public static fromReview(review: Review): ReviewModel {
        return new ReviewModel(
            review.reviewerNickname,
            review.score,
            review.text,
        )
    }
}