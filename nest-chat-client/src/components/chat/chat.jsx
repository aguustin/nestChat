import './chat.css';
import userPng from '../../assets/user.png';
import dotsPng from '../../assets/dots.png';
import dotsGrayPng from '../../assets/dotsGray.png';
import menuPng from '../../assets/menu.png';
import closePng from '../../assets/close.png';
import clipPng from '../../assets/paper-clip.png';
import contactPng from '../../assets/contact.png';
import contactGPng from '../../assets/contactG.png';
import groupPng from '../../assets/group.png';
import groupGPng from '../../assets/groupG.png';
import happyGrayPng from '../../assets/icons/happyGray.png';
import angry from '../../assets/icons/angry.png';
import emoji from '../../assets/icons/emoji.png';
import happy  from '../../assets/icons/happy.png';
import love from '../../assets/icons/love.png';
import neutral from '../../assets/icons/neutral.png';
import party from '../../assets/icons/party.png';
import pressure from '../../assets/icons/pressure.png';
import sad from '../../assets/icons/sad.png';
import sadB from '../../assets/icons/sadB.png';
import smile from '../../assets/icons/smile.png';
import smiling from '../../assets/icons/smiling.png';
import star from '../../assets/icons/star.png';
import thinking from '../../assets/icons/thinking.png';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import FrontContext from '../../context/frontContext';
import UserDataContext from '../../context/userDataContext';
import ChatContext from '../../context/chatContext';
import { useNavigate } from "react-router-dom";

const Chat = () => {
    const navigate = useNavigate();
    const chatScrollEnds = useRef(null);
    const {contactsOrGroups, setContacsOrGroups, theme, setTheme} = useContext(FrontContext);
    const {session, showContactContext, showGroupsContext, addContactContext, contactsData, deleteContactContext, deleteGroupsContext} = useContext(UserDataContext);
    const {groupChat, chatData, conversationData, createGroupContext, deleteGroupContext, openGroupChatContext, openContactChatContext, sendMessageContext, sendMessageGroupContext} = useContext(ChatContext);
    const [showMenu, setShowMenu] = useState(false);
    const [openCreateGroup, setOpenCreateGroup] = useState(false);
    const [openAddContact, setOpenAddContact] = useState(false);
    const [openConfiguration, setOpenConfiguration] = useState(false);
    const [search, setSearch] = useState('');
    const [openEmojis, setOpenEmojis] = useState(false);
    const emojis = [angry, emoji, happy, love, neutral, party, pressure, sad, sadB, smile, smiling, star, thinking];

    const AddContactForm = () => {

        const addContact = (e) => {
            e.preventDefault();
            const contactEmail = e.target.elements.contactEmail.value;
            const usersData = {
                userId: session._id,
                mail: contactEmail
            }
            addContactContext(usersData);
        }

        return(
            <>
                {openAddContact && 
                 <form className={`create-group-form ${theme ? 'darkTheme' : 'whiteTheme'}`} onSubmit={(e) => addContact(e)} encType='multipart/form-data'>
                        <button className='close-create-group' onClick={() => setOpenAddContact(false)}><img src={closePng} alt=""></img></button>
                        <div className='form-group-create-group'>
                            <input type="text" name="contactEmail" placeholder='Email to add the contact...'></input>
                            <label id="labelGroup">Add email</label>
                        </div>
                        <button type='submit'>Add contact</button>
                    </form>
            }
            </>
        )
    }
   
    const CreateGroupForm = () => {

        const createGroup = async (e) => {
            e.preventDefault();
           
            const groupData = {
                id: session._id,
                groupName: e.target.elements.groupName.value,
                groupProfile: e.target.elements.groupProfile.value
            }

            await createGroupContext(groupData);
        }

        return(
            <>
                {openCreateGroup && 
                    <form className={`create-group-form ${theme ? 'darkTheme' : 'whiteTheme'}`} onSubmit={(e) => createGroup(e)} encType='multipart/form-data'>
                        <button className='close-create-group' onClick={() => setOpenCreateGroup(false)}><img src={closePng} alt=""></img></button>
                        <div className='form-group-create-group'>
                            <input type="text" name="groupName" placeholder='Name your group'></input>
                            <label id="labelGroup">Group name</label>
                        </div>
                        <div className='form-group-create-group'>
                            <input type="file" name="groupProfile"></input>
                            <label id="labelGroup">Group profile</label>
                        </div>
                        <button type='submit'>Create group</button>
                    </form>
                }
            </>
        )
    }

    const Nav = () => {
        const logOut = () => {
            localStorage.clear();
            navigate("/");
        }

        const chatBackground = () => {
            
        }
       
        return(
            <>
                <div className={`nav-container ${theme && 'darkTheme'}`}>
                    <div className='profile-username'>
                        <img src={userPng} alt=""></img>
                        <p>Profile username</p>
                    </div>
                    <button className='pots' onClick={() => setShowMenu(!showMenu)}><img src={dotsPng} alt=""></img></button>
                    {showMenu  && <div className={`menu ${theme ? 'darkTheme' : 'whiteTheme'}`}>
                            <button className={`${theme ? 'darkTheme' : 'whiteTheme'}`} onClick={() => chatBackground()}>Change chat background</button>
                            <button className={`${theme ? 'darkTheme' : 'whiteTheme'}`} onClick={() => setTheme(!theme)}>Change Theme</button>
                            <button className={`${theme ? 'darkTheme' : 'whiteTheme'}`} onClick={() => setOpenAddContact(!openAddContact)}>Add Contact</button>
                            <button className={`${theme ? 'darkTheme' : 'whiteTheme'}`} onClick={() => setOpenCreateGroup(!openCreateGroup)}>Create Group</button>
                            <button className={`${theme ? 'darkTheme' : 'whiteTheme'}`} onClick={() => logOut()}>Log out</button>
                    </div>}
                </div>
            </>
        )
    }

    const SideNav = () => {

        const showContacts = (e) => {
            e.preventDefault();
            setContacsOrGroups(false);
            showContactContext(session._id);
        }

        const showGroups = (e) => {
            e.preventDefault();
            setContacsOrGroups(true);
            showGroupsContext(session._id);
        }

        const openGroupChat = (sessionId, groupId) => {
            openGroupChatContext(sessionId, groupId);
        }

        const openContactChat = (sessionId, contactId) => {
            openContactChatContext(sessionId, contactId);
        }

        const deleteContact = (sessionId, contactId) => {
            deleteContactContext(sessionId, contactId)
        }

        const deleteGroup = (groupId) => {
            deleteGroupsContext(groupId);
        }

        return(
            <>
                <div className={`sideNav-container ${theme && 'darkTheme'}`}>
                    <div className={`sideNav-page-display-search ${theme && 'darkLigthTheme'}`}>
                        <img src={menuPng} alt=""></img>
                        <input className={`${theme ? 'darkTheme' : 'inputLigthTheme'}`} type="text" placeholder='search' onChange={(e) => setSearch(e.target.value)}/>
                    </div>                                                                                                                    
                    <div className='contact-or-group'>
                        <button onClick={(e) => showContacts(e)}><img src={contactsOrGroups ? contactGPng : contactPng } alt=""></img></button>
                        <button onClick={(e) => showGroups(e)}><img src={contactsOrGroups ? groupPng : groupGPng} alt=""></img></button>
                    </div>
                    {contactsOrGroups ? contactsData?.filter((busq) => { return search.toLowerCase() === '' ? busq : busq.groupName?.toLowerCase().includes(search)}).map((group) => 
                     <div key={group?._id} className='groups-contacts' onClick={() => openGroupChat(session._id, group._id)}>
                        <img src={userPng} alt=""></img>
                        <p>{group?.groupName}</p>
                        {/*openConfiguration &&*/ <div className='configuration'>
                            <button onClick={() => deleteGroup(group._id)}>Delete Group</button>
                        </div>}
                    </div>)
                    :
                   contactsData?.filter((busq) => { return search.toLowerCase() === '' ? busq : busq.contactUsername?.toLowerCase().includes(search)}).map((c) =>   
                   <div key={c?._id} className='groups-contacts' onClick={(e) => openContactChat(session._id, c.contactId)}>
                        <img src={userPng} alt=""></img>
                        <p>{c?.contactUsername}</p>
                        <div>
                            <button className={`deleteBut ${theme ? 'darkTheme' : 'whiteTheme'}`} onClick={() => deleteContact(session._id, c.contactId)}>Delete Contact</button>
                        </div>
                    </div>)}
                </div>
            </>
        )
    }

    /* <div>
                            <button className={`deleteBut ${theme ? 'darkTheme' : 'whiteTheme'}`} onClick={() => setOpenConfiguration(!openConfiguration)}><img src={dotsGrayPng} alt=""></img></button>
                        </div>*/



    const ChatMessages = () => {

        useEffect(() => {
            chatScrollEnds.current?.scrollIntoView();
        }, []);

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
            console.log(groupId);
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
       console.log("contttt: ", contactsData);

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
                        <form onSubmit={(e) => sendMessageGroup(e, groupData.groups[0]._id)} enctype="multipart/form-data">
                          <label for="chargeImage"><img src={clipPng} alt=""></img></label>
                          <input type="file" name="chargeImage" id="chargeImage" accept='image/*'></input>
                          <input type='text' name="message" placeholder='Write a message...'></input>
                        </form>
                          <button onClick={() => setOpenEmojis(!openEmojis)}><img src={happyGrayPng} alt=""></img></button> {/* reacomodar esto, es para abrir la ventana de emojis */}
                    </div>
                    <div ref={chatScrollEnds}></div>
                    {openEmojis && <div className='emojis-container'>
                        {emojis.map((emo) =><div>
                                <button><img src={emo} alt=""></img></button>
                            </div>
                        )}
                    </div>} 
                </div>
                ))}
            </>
        )
    }

    return(  
        <>
            <div className='chat-container'>
                    <Nav/>
                <div className={`side-chat-container ${theme && 'darkTheme'}`}>
                    <SideNav/>
                    <ChatMessages/>
                    <CreateGroupForm/>
                    <AddContactForm/>
                </div>
            </div>
        </>
    )
}

export default Chat;
