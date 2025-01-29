import {ViewEventModel} from "../ViewEventModel";

export class EventHeaderModel {
    public readonly eventName: string;
    public readonly organizerName: string;
    public readonly date: Date;
    public readonly showEditButton: boolean;
    public readonly isParticipating: boolean;
    
    constructor(
        eventName: string, 
        organizerName: string,
        date: Date,
        showEditButton: boolean,
        isParticipating: boolean,
    ) {
        this.eventName = eventName;
        this.organizerName = organizerName;
        this.date = date;
        this.showEditButton = showEditButton;
        this.isParticipating = isParticipating;
    }


    public static fromViewEventModel(
        viewEventModel: ViewEventModel,
        showEditButton: boolean,
        userFacebookId: string,
    ): EventHeaderModel {
        const isParticipating = viewEventModel.participants.some(participant => participant.userFacebookId === userFacebookId);

        return new EventHeaderModel(
            viewEventModel.name, 
            viewEventModel.organizerName,
            viewEventModel.date,
            showEditButton,
            isParticipating,
        );
    }
}