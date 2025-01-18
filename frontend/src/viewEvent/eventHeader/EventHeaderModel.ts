import {ViewEventModel} from "../ViewEventModel";

export class EventHeaderModel {
    public readonly eventName: string;
    public readonly organizerName: string;
    public readonly showEditButton: boolean;
    public readonly isParticipating: boolean;
    
    constructor(
        eventName: string, 
        organizerName: string,
        showEditButton: boolean,
        isParticipating: boolean,
    ) {
        this.eventName = eventName;
        this.organizerName = organizerName;
        this.showEditButton = showEditButton;
        this.isParticipating = isParticipating;
    }


    public static fromViewEventModel(
        viewEventModel: ViewEventModel,
        showEditButton: boolean,
        userFacebookId: string,
    ): EventHeaderModel {
        const isParticipating = viewEventModel.participants.some(participant => participant.userFacebookId === userFacebookId);
        console.log("View event model: ", viewEventModel);
        console.log("In event header model, isParticipating:", isParticipating);
        return new EventHeaderModel(
            viewEventModel.name, 
            viewEventModel.organizerName,
            showEditButton,
            isParticipating,
        );
    }
}