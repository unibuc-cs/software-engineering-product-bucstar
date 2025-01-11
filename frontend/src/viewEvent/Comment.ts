export class Comment {
    public readonly username: string;
    public readonly text: string;
    
    constructor(
        username: string, 
        text: string
    ) {
        this.username = username;
        this.text = text;
    }
}