declare global {
    interface Window {
        FB: {
            init: (config: { appId: string; cookie: boolean; xfbml: boolean; version: string }) => void;
            login: (callback: (response: any) => void, options?: { scope: string }) => void;
            getLoginStatus: (callback: (response: any) => void) => void;
            api: (path: string, params: any, callback: (response: any) => void) => void;
            AppEvents: { logPageView: () => void };
        },
        fbAsyncInit: () => void;
    }
}

export const initFacebookSdk = () => {
    return new Promise<void>((resolve, reject) => {
        window.fbAsyncInit = () => {
            window.FB.init({
                appId: process.env.REACT_APP_FB_APP_ID ?? '',
                cookie: true,
                xfbml: true,
                version: 'v21.0'
            });

            resolve();
        };
    });
};