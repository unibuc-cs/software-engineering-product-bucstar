import {ViewEventModel} from "../ViewEventModel";
import {Comment} from "../Comment";

export class EventCommentsModel {
    public readonly comments: Comment[];
    
    constructor(comments: Comment[]) {
        this.comments = comments;
    }
    
    public static fromViewEventModel(viewEventModel: ViewEventModel): EventCommentsModel {
        return new EventCommentsModel(viewEventModel.comments)
    }
}