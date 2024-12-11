import {Participant} from "../Participant";
import {ViewEventModel} from "../ViewEventModel";

export class EventParticipantsModel {
    public readonly participants: Participant[];
    
    constructor(participants: Participant[]) {
        this.participants = participants;
    }
    
    public static fromViewEventModel(viewEventModel: ViewEventModel) {
        return new EventParticipantsModel(viewEventModel.participants)
    }
}