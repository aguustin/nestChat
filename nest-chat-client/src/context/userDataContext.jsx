import { createContext, useEffect, useState } from "react";
import { loginUserRequest, showContactRequest, showGroupRequest, signInUserRequest, addConctactRequest } from "../api/userDataRequest";
import { deleteContactRequest, deleteGroupRequest } from "../api/chatRequest";

const UserDataContext = createContext();

export const UserDataProvider = ({children}) => {
    const [session, setSession] = useState([]);
    const [contactsData, setContactsData] = useState([]);

    useEffect(() => {
        const info = JSON.parse(localStorage.getItem('session'));
        if(info){
            setSession(info);
        }
    },[session._id])
  
    const loginUserContext = async (userData) => {
        const res = await loginUserRequest(userData);
            localStorage.setItem('session', JSON.stringify(res.data));
            setSession(JSON.parse(localStorage.getItem('session')));
            console.log(session);
    }

    const signInUserContext = async (userData) => {
        console.log(userData);
        await signInUserRequest(userData);
        
    }

    const showContactContext = async (userId) => {
        const res = await showContactRequest(userId);
        setContactsData(res.data[0].contacts);
    }

    const showGroupsContext = async (userId) => {
        const res = await showGroupRequest(userId);
        console.log(res.data);
        setContactsData(res.data[0].groups);
    }

    const addContactContext = async (usersData) => {
        await addConctactRequest(usersData);
    }

    const deleteContactContext = async (sessionId, contactId) => {
        await deleteContactRequest(sessionId, contactId);
        setContactsData(((cont) => cont.filter((a) => a.contactId !== contactId)));
    }

    const deleteGroupsContext = async (groupId) => {
        await deleteGroupRequest(groupId);
        setContactsData(((group) => group.filter((g) => g._id !== groupId)));
    }

    return(
        <UserDataContext.Provider value={{
            session,
            contactsData,
            loginUserContext,
            signInUserContext,
            showContactContext,
            showGroupsContext,
            addContactContext,
            deleteContactContext,
            deleteGroupsContext
        }}>{children}</UserDataContext.Provider>
    )
}

export default UserDataContext;