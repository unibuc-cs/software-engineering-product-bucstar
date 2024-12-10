import axios from '../utils/axiosInstance'

export interface UserRegisterType {
    nickname: string,
    facebookId: string
}

export interface UserType {
    id: string,
    nickname: string,
    facebookId: string
}

export interface ResponseType {
    message: string,
    user: UserType
}

export class User {
    protected routeName: string = 'User';

    public all = async () => {
        return await axios.get(`${this.routeName}/all`)
            .then((response): UserType[] => response.data)
            .catch((error): [] => {
                console.error(error.response);
                return [];
            });
    }

    public register = async (payload: UserRegisterType) => {
        return await axios.post(`${this.routeName}/register`, payload)
            .then((response): ResponseType => response.data)
            .catch((error): string => {
                console.error(error.response);
                return error.response;
            })
    }

    public getByUserId = async (userId: string) => {
        return await axios.get(`${this.routeName}/user/${userId}`)
            .then((response): UserType => response.data)
            .catch((error): string => {
                console.error(error.response);
                return error.response;
            });
    }

    public getByFacebookId = async (facebookId: string) => {
        return await axios.get(`${this.routeName}/?facebookId=${facebookId}`)
            .then((response): UserType => response.data)
            .catch((error): string => {
                console.error(error.response);
                return error.response;
            });
    }
}

