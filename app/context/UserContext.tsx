"use client";
import { createContext, useContext, useState, useEffect } from "react";

type UserContextType = {
    selectedUserID: number | null;
    setSelectedUserID: (id: number | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [selectedUserID, setSelectedUserID] = useState<number | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("selectedUserID");
        if(saved) setSelectedUserID(Number(saved));
    }, []);

    const setSelectedUserIDWithStorage = (id: number | null) => {
        setSelectedUserID(id);
        if(id === null) {
            localStorage.removeItem("selectedUserID");
        } else {
            localStorage.setItem("selectedUserID", id.toString());
        }
    };

    return (
        <UserContext.Provider 
            value={{ 
                selectedUserID, 
                setSelectedUserID: setSelectedUserIDWithStorage,
             }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}