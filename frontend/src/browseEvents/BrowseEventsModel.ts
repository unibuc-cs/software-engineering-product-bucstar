import { EventCardModel } from "../components/eventsList/eventCard/EventCardModel";

export class BrowseEventsModel {
    public readonly eventCardModels: EventCardModel[]
    
    constructor(eventCardModels: EventCardModel[] = []) {
        this.eventCardModels = eventCardModels;
    }
}