import {Dayjs} from "dayjs";

export class CreateEventModel {
    public name: string = "";
    public description: string = "";
    public location: string = "";
    
    public date: Date | null = null;
    
    public participantLimitEnabled: boolean = false;
    public participantLimit: number = 0;
}