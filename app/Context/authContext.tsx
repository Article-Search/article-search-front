"use client"
import React, { createContext, useState } from 'react';
import { User } from '@/types';


interface AuthContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    setUser: () => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
    <AuthContext.Provider value={{ user, setUser }}>
        {children}
    </AuthContext.Provider>
    );
};