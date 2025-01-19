export class Participant {
    public readonly userFacebookId: string;
    public readonly username: string;
    
    constructor(username: string, userFacebookId: string) {
        this.username = username;
        this.userFacebookId = userFacebookId;
    }
}