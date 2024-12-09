import {EventCardModel} from "./eventCard/EventCardModel";
import {BrowseEventsModel} from "./BrowseEventsModel";

export class BrowseEventsService {
    private readonly eventCardModel: EventCardModel = new EventCardModel(1, "name", "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"", "location", new Date(Date.now()),
        "organizer", 12, 6, ["sport", "outdoor", "teams"]);
    
    private readonly browseEventsModel: BrowseEventsModel;
    constructor() {
        this.browseEventsModel = new BrowseEventsModel(
            [this.eventCardModel, this.eventCardModel, this.eventCardModel],
        )
    }
    public getBrowseEventsModel(): BrowseEventsModel {
        return this.browseEventsModel;
    }
}