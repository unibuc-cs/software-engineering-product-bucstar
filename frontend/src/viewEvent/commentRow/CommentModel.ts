import {Comment} from "../Comment";

export class CommentModel {
    public readonly username: string;
    public readonly text: string;
    
    constructor(
        username: string, 
        text: string
    ) {
        this.username = username;
        this.text = text;
    }
    
    public static fromComment(comment: Comment): CommentModel {
        return new CommentModel(
            comment.username,
            comment.text
        )
    }
}