export class User {

    username: string;
    accessToken: string;
    isLoggedIn: boolean;

    constructor(username: string, accessToken: string, isLoggedIn: boolean) {
        this.username = username;
        this.accessToken = accessToken;
        this.isLoggedIn = isLoggedIn;
    }

}
