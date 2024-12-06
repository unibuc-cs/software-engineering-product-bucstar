export class NavItem {
    public text: string = "";
    public to: string = "";

    constructor(
        text: string,
        to: string
    ) {
        this.text = text;
        this.to = to;
    }
}
