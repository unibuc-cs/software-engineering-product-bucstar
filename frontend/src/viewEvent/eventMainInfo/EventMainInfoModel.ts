import {ViewEventModel} from "../ViewEventModel";

export class EventMainInfoModel {
    public readonly location: string;
    public readonly maximumParticipants: number;
    public readonly registeredParticipants: number;
    public readonly dateString: string;
    public readonly tagStrings: string[];
    
    constructor(
        location: string, 
        maximumParticipants: number, 
        registeredParticipants: number,
        dateString: string,
        tagStrings: string[],
    ) {
        this.location = location;
        this.maximumParticipants = maximumParticipants;
        this.registeredParticipants = registeredParticipants;
        this.dateString = dateString;
        this.tagStrings = tagStrings;
    }
    
    public static fromViewEventModel(viewEventModel: ViewEventModel): EventMainInfoModel {
        return new EventMainInfoModel(
            viewEventModel.location,
            viewEventModel.maximumParticipants,
            viewEventModel.participants.length,
            viewEventModel.date.toDateString(),
            viewEventModel.tags.map(tag => tag.name)
        )
    }
}