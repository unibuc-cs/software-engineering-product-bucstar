export class Review {
    public readonly reviewerNickname: string;
    public readonly score: number;
    public readonly text: string;
    
    constructor(
        reviewerNickname: string,
        score: number,
        text: string,
    ) {
        this.reviewerNickname = reviewerNickname;
        this.score = score;
        this.text = text;
    }
}