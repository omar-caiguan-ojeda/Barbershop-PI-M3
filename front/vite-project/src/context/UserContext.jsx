// src/context/UserContext.jsx

import { createContext, useState } from "react";
import axios from "axios";

export const UsersContext = createContext({

    user: "",
    userAppointments: [],
    registerUser: async() => {}
})

export const UsersProvider = ({ children }) => {

    const [user, setUser] = useState(0)

    const registerUser = async (userData) => {
        await axios.post("http://localhost:3002/users/register", userData)
    }

    const value = {
        user,
        registerUser
    }

    return (
        <UsersContext.Provider value={value}>
            { children }
        </UsersContext.Provider>
    )
}