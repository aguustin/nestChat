import { createRef, useContext, useEffect, useRef, useState } from "react";
import FrontContext from "../../context/frontContext";
import UserDataContext from "../../context/userDataContext";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import userPng from '../../assets/user.png';
import clipPng from '../../assets/paper-clip.png';
import happyGrayPng from '../../assets/icons/happyGray.png';
import ChatContext from "../../context/chatContext";


const ChatMessages = () => {
    const inputRef = createRef();
    const chatScrollEnds = useRef(null);
    const {theme} = useContext(FrontContext);
    const {session} = useContext(UserDataContext);
    const {groupChat, chatData, conversationData, sendMessageContext, sendMessageGroupContext} = useContext(ChatContext);
    const [openEmojis, setOpenEmojis] = useState(false);
    const [s, setS] = useState();

    useEffect(() => {
        chatScrollEnds.current?.scrollIntoView();
    }, []);

    const handleS = (e) => {
        e.preventDefault();
        setS(e.target.value);
    }
    console.log(s);

    const sendMessage = (e) => {
        e.preventDefault();
        const messageData = {
            userA: session._id,
            userB: chatData[0].contactId,
            text: e.target.elements.message.value,
            multimedia: ""
        }
        sendMessageContext(messageData);
    }

    const sendMessageGroup = (e, groupId) => {
        e.preventDefault();
 
        const messageData = {
            groupId: groupId,
            userIdMessage: session._id,
            usernameMessage: session.mail,
            userPhotoMessage: "",
            messageBody: e.target.elements.message.value,
            messageArchive: ""
        }

        sendMessageGroupContext(messageData);
    }

    const pickEmoji = (e) => {
        const ref = inputRef.current;
        ref.focus();
        const start = s.substring(0, ref.selectionStart);
        const end = s.substring(ref.selectionStart);
        const message = start + e.native + end;
        setS(message);
        
    }

    return(
        <>
            {chatData && chatData?.map((chat) => 
                <div key={chat?._id} className={`messages-container ${theme ? 'darkTheme' : 'ligthTheme'}`}>
                    <div className={`contact-profile-chat ${theme && 'darkTheme'}`}>
                        <img src={userPng} alt=""></img>
                        <p>Profile Contact</p>
                    </div>
                    {conversationData?.map((conversation) => 
                    <div className={`chat-messages ${theme && 'darkTheme'}`}>
                        <div key={conversation._id} className={conversation.userA === session._id ? `message-userA ${theme && 'blackColor'}` : `message-userB ${theme && 'blackColor'}`}>
                            <p>{conversation?.text}</p>
                        </div>
                    </div>)}
                    <div className={`send-messages ${theme && 'darkLigthTheme'}`}>
                        <form onSubmit={(e) => sendMessage(e)}>
                        <button><img src={clipPng} alt=""></img></button>
                        <input type='text' name="message" placeholder='Write a message...'></input>
                        </form>
                    </div>
                <div ref={chatScrollEnds}></div>
            </div>
            )}

            
            {groupChat && groupChat?.map((groupData) =>
            groupData.groups.map((groups) => 
            <div className='messages-container'>
                <div className={`contact-profile-chat ${theme && 'darkTheme'}`}>
                    <img src={userPng /*groups?.groupProfile*/} alt=""></img>
                    <p>{groups?.groupName}</p>
                </div>
                {groups.messages.map((conversation) => 
                <div className={`chat-messages ${theme && 'darkTheme'}`}>
                    <div key={conversation._id} className={conversation.userIdMessage === session._id ? `message-userA ${theme && 'blackColor'}` : `message-userB ${theme && 'blackColor'}`}>
                        <p>{conversation?.usernameMessage}</p>
                        <p>{conversation?.messageBody}</p>
                    </div>
                </div>)}
                 <div className={`send-messages ${theme && 'darkLigthTheme'}`}>
                    <form onSubmit={(e) => sendMessageGroup(e, groupData.groups[0]._id)} encType="multipart/form-data">
                      <label htmlFor="chargeImage"><img src={clipPng} alt=""></img></label>
                      <input type="file" name="chargeImage" id="chargeImage" accept='image/*'></input>
                      {<input type='text' name="message" placeholder='Write a message...' value={s} onChange={handleS} /> 
                       /* reacomodar esto, es para abrir la ventana de emojis */}
                    </form>
                    <button onClick={() => setOpenEmojis(!openEmojis)}><img src={happyGrayPng} alt=""></img></button>
                </div>
                <div className="emojis-container">
                 {openEmojis && <Picker  data={data} onEmojiSelect={(e) => pickEmoji(e)} />}
                </div>
                <div ref={chatScrollEnds}></div>
            </div>
            ))}
        </>
    )
}

export default ChatMessages;