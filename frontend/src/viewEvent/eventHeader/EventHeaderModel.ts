import {ViewEventModel} from "../ViewEventModel";

export class EventHeaderModel {
    public readonly eventName: string;
    public readonly organizerName: string;
    public readonly showEditButton: boolean;
    
    constructor(
        eventName: string, 
        organizerName: string,
        showEditButton: boolean,
    ) {
        this.eventName = eventName;
        this.organizerName = organizerName;
        this.showEditButton = showEditButton;
    }


    public static fromViewEventModel(
        viewEventModel: ViewEventModel,
        showEditButton: boolean,
    ): EventHeaderModel {
        return new EventHeaderModel(
            viewEventModel.name, 
            viewEventModel.organizerName,
            showEditButton,
        );
    }
}