import {Dayjs} from "dayjs";

export class CreateEventModel {
    public id: string = "";
    public name: string = "";
    public description: string = "";
    public location: string = "";

    public tags: string[] = [];
    public date: Date | null = null;
    
    public participantLimitEnabled: boolean = false;
    public participantLimit: number = 0;
    
    constructor(
        id: string = "",
        name: string = "",
        description: string = "",
        location: string = "",
        date: Date | null = null,
        participantLimitEnabled: boolean = false,
        participantLimit: number = 0,
        tags: string[] = []
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.location = location;
        this.date = date;
        this.participantLimitEnabled = participantLimitEnabled;
        this.participantLimit = participantLimit;
        this.tags = tags;
    }
}