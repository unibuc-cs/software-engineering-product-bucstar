declare global {
    interface Window {
        FB: {
            init: (config: { appId: string; cookie: boolean; xfbml: boolean; version: string }) => void;
            login: (callback: (response: any) => void, options?: { scope: string }) => void;
            getLoginStatus: (callback: (response: any) => void) => void;
            api: (path: string, params: any, callback: (response: any) => void) => void;
            AppEvents: { logPageView: () => void };
        };
    }
}

export {};
