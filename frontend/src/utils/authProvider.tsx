import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    accessToken: string | null;
    userFacebookId: string | null;
    setAccessToken: (token: string | null) => void;
    setUserFacebookId: (facebookId: string | null) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): React.JSX.Element => {
    const [accessToken, setAccessTokenState] = useState<string | null>(null);
    const [userFacebookId, setUserFacebookIdState] = useState<string | null>(null);
    const isAuthenticated = !!accessToken;

    const setAccessToken = (token: string | null) => {
        setAccessTokenState(token);
    };

    const setUserFacebookId = (facebookId: string | null) => {
        setUserFacebookIdState(facebookId);
    };

    return (
        <AuthContext.Provider value={{ accessToken, userFacebookId, setAccessToken, setUserFacebookId, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};