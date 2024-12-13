import {ViewEventModel} from "../ViewEventModel";

export class EventHeaderModel {
    public readonly eventName: string;
    public readonly organizerName: string;
    
    constructor(
        eventName: string, 
        organizerName: string
    ) {
        this.eventName = eventName;
        this.organizerName = organizerName;
    }


    public static fromViewEventModel(viewEventModel: ViewEventModel): EventHeaderModel {
        return new EventHeaderModel(viewEventModel.name, viewEventModel.organizerName);
    }
}