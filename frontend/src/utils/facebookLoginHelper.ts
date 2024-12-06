import {User} from "../models/user";

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
    accessToken: string,
    userInfo: UserInfo | null
}

const userApi = new User();

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
            return { status: "connected", userInfo, accessToken: response.authResponse?.accessToken ?? "" };
        } else if (response.status === "not_authorized") {
            console.warn("User is logged into Facebook but not authorized for this app.");
            let user: UserInfo = await FacebookLoginHelper.loginUser();

            return { status: "connected", userInfo: user, accessToken: response.authResponse?.accessToken ?? "" };
        } else {
            console.warn("User is not logged into Facebook.");
            let user: UserInfo = await FacebookLoginHelper.loginUser();

            await userApi.register({
                facebookId: user.id!,
                nickname: user.name!
            })

            return { status: "connected", userInfo: user, accessToken: response.authResponse?.accessToken ?? "" };
        }
    };

    static loginUser = async (): Promise<UserInfo> => {
        console.log("User is not logged in. Triggering signup flow...");

        return new Promise<UserInfo>((resolve, reject) => {
            window.FB.login((response: FacebookResponse) => {
                (async () => {
                    if (response.authResponse) {
                        console.log("User logged in with Facebook during signup.");
                        try {
                            let user: UserInfo = await FacebookLoginHelper.fetchUserInfo();
                            resolve(user);
                        } catch (error) {
                            reject("Failed to fetch user info");
                        }
                    } else {
                        console.warn("User cancelled the login or failed to log in.");
                        reject("Login failed");
                    }
                })();
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