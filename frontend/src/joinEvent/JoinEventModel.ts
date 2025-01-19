export class JoinEventModel {
    public eventId: string = "";
    public userId: string = "";

    constructor(eventId: string = "", userId: string = "") {
        this.eventId = eventId;
        this.userId = userId;
    }
}