import {ReviewModel} from "../reviewRow/ReviewModel";
import {ViewEventModel} from "../ViewEventModel";

export class EventReviewsModel {
    public readonly reviews: ReviewModel[];
    
    constructor(reviews: ReviewModel[]) {
        this.reviews = reviews;
    }
    
    public static fromViewEventModel(viewEventModel: ViewEventModel): EventReviewsModel {
        return new EventReviewsModel(
            viewEventModel.reviews.map(review => ReviewModel.fromReview(review))
        )
    }
}