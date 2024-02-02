"use client"
import { createContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { parseJwt } from '@/util/parseJwt';

interface AuthContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    setUser: () => {},
    loading: true,
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const userToken = parseJwt(token);
            console.log(userToken);
            const {username , role ,id , email,last_name,first_name} = userToken;
            const user = {username , role ,id , email,last_name,first_name};
            console.log(user);
            setUser(user);
            console.log(user);
            
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
