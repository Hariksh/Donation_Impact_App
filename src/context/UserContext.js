import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState('Hariksh Suryawanshi');
    const [userEmail, setUserEmail] = useState('hariksh.dev@gmail.com');

    return (
        <UserContext.Provider value={{ userName, setUserName, userEmail, setUserEmail }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
