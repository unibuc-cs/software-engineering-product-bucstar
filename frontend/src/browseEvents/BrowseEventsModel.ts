import {EventCardModel} from "./eventCard/EventCardModel";

export class BrowseEventsModel {
    public readonly eventCardModels: EventCardModel[]
    
    constructor(eventCardModels: EventCardModel[]) {
        this.eventCardModels = eventCardModels;
    }
}