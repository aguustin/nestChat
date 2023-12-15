import axios from "axios";

const API = 'http://localhost:4000/sv/chat';
                                                        
export const createGroupRequest = async (groupData) => await axios.post(`${API}/createGroup`, groupData); //done

export const getInUserRequest = async (userData) => await axios.post(`${API}/getInUser`, userData);

export const deleteUserOnGroupRequest = async (userData) => await axios.delete(`${API}/deleteUser/:groupId/:idMember`, userData);

export const searchUsersRequest = async (userData) => await axios.post(`${API}/searchUsers`, userData);

export const openGroupChatRequest = async (sessionId, groupId) => await axios.get(`${API}/groupChat/${sessionId}/${groupId}`);

export const openContactChatRequest = async (sessionId, contactId) => await axios.get(`${API}/${sessionId}/${contactId}`);

export const sendMessageRequest = async (messageData) => await axios.post(`${API}/sendMessage`, messageData);

export const sendMessageGroupRequest = async (messageData) => await axios.post(`${API}/sendMessageGroup`, messageData);

export const deleteGroupRequest = async (groupId) => await axios.delete(`${API}/deleteGroup/${groupId}`);

export const deleteContactRequest = async (sessionId, contactId) => await axios.delete(`${API}/deleteContact/${sessionId}/${contactId}`);

export const contactMessageRequest = async (userData) => await axios.put(`${API}/contactMessage/:userA/:userB/:text/:multimedia`, userData);
