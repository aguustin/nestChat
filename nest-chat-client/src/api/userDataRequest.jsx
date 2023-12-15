import axios from "axios";

const API = 'http://localhost:4000/sv/chat';

export const loginUserRequest = async (userData) => await axios.post(`${API}/loginUser`, userData);  //done

export const signInUserRequest = async (userData) => await axios.post(`${API}/createUser`, userData); //done

export const updateUserInfoRequest = async (userData) => {
    fetch(`${API}/updateUserInfo`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers:{
            'Content-type': 'application/json'
        }
    })
};


export const showContactRequest = async (userId) => await axios.get(`${API}/showContacts/${userId}`); //done

export const showGroupRequest = async (userId) => await axios.get(`${API}/showGroups/${userId}`); //done

export const addConctactRequest = async (usersData) => await axios.post(`${API}/addContact`, usersData); //done