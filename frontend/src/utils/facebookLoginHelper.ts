export interface FacebookResponse {
    status: string,
    authResponse: {
        accessToken: string,
        expiresIn: number,
        signedRequest: string,
        userId: string
    }
}

export interface UserInfo {
    id: string,
    name: string,
}

export interface LoginResponse {
    status: 'connected' | 'not_authorized' | 'unknown',
    userInfo: UserInfo | null
}


export class FacebookLoginHelper {
    static checkLoginStatus = async (): Promise<LoginResponse> => {
        return new Promise((resolve, reject) => {
            window.FB.getLoginStatus(async (response: FacebookResponse) => {
                try {
                    const loginResponse = await FacebookLoginHelper.statusChangeCallback(response);
                    resolve(loginResponse);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    static statusChangeCallback = async (response: FacebookResponse): Promise<LoginResponse> => {
        if (response.status === "connected") {
            console.log("User is already logged in with Facebook!");
            const userInfo = await FacebookLoginHelper.fetchUserInfo();
            return { status: "connected", userInfo };

        } else if (response.status === "not_authorized") {
            console.warn("User is logged into Facebook but not authorized for this app.");
            return { status: "not_authorized", userInfo: null };

        } else {
            console.warn("User is not logged into Facebook.");
            await FacebookLoginHelper.signupUser();
            return { status: "unknown", userInfo: null };
        }
    };

    static signupUser = async (): Promise<void> => {
        console.log("User is not logged in. Triggering signup flow...");

        return new Promise<void>((resolve, reject) => {
            window.FB.login(async (response: FacebookResponse) => {
                if (response.authResponse) {
                    console.log("User logged in with Facebook during signup.");
                    await FacebookLoginHelper.fetchUserInfo();
                    resolve();
                } else {
                    console.warn("User cancelled the login or failed to log in.");
                    reject("Login failed");
                }
            });
        });
    }

    static fetchUserInfo = async (): Promise<UserInfo> => {
        return new Promise<UserInfo>((resolve, reject) => {
            window.FB.api('/me', { fields: 'id,name' }, (response: UserInfo) => {
                if (response && response.id && response.name) {
                    resolve(response);
                } else {
                    reject("Failed to fetch user info");
                }
            });
        });
    }
}