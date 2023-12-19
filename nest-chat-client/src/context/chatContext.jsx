import { createContext, useState } from "react";
import { createGroupRequest, openGroupChatRequest, openContactChatRequest, sendMessageRequest, sendMessageGroupRequest } from "../api/chatRequest";
const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {

    const [chatData, setChatData] = useState();
    const [groupChat, setGroupChat] = useState([]);
    const [conversationData, setConversationData] = useState([]);

    const createGroupContext = async (groupData) => {
       await createGroupRequest(groupData);
    }

    const openGroupChatContext = async (sessionId, groupId) => {
        const res = await openGroupChatRequest(sessionId, groupId);
        setChatData();
        setGroupChat(res.data);
        console.log("groupChat: ", groupChat);
    }

    const openContactChatContext = async (sessionId, contactId) => {
        const res = await openContactChatRequest(sessionId, contactId);
        setGroupChat();
        setChatData(res.data);
        setConversationData(res.data[0]?.contactMessages)
        //console.log("contacts data: ",contactsData);
    }

    const sendMessageContext = async (messageData) => {
        await sendMessageRequest(messageData);
        setConversationData([...conversationData, messageData]);
    }

    const sendMessageGroupContext = async (messageData) => {
        const res = await sendMessageGroupRequest(messageData);
        console.log(res.data);
        setGroupChat(res.data);
    }

    return(
        <ChatContext.Provider value={{
            chatData,
            setChatData,
            groupChat,
            conversationData,
            createGroupContext,
            openGroupChatContext,
            openContactChatContext,
            sendMessageContext,
            sendMessageGroupContext
        }}>{children}</ChatContext.Provider>
    )
}

export default ChatContext;