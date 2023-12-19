import './chat.css';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import FrontContext from '../../context/frontContext';
import UserDataContext from '../../context/userDataContext';
import ChatContext from '../../context/chatContext';
import { useNavigate } from "react-router-dom";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
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
import ChatMessages from '../chatsMessages/chatMessages';
import SideNav from '../sideNav/sideNav';

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
    const [s, setS] = useState("");

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
                            <input id="createGInput" type="text" name="groupName" placeholder='Name your group'></input>
                            <label htmlFor='createGInput' id="labelGroup">Group name</label>
                        </div>
                        <div className='form-group-create-group'>
                            <input id="createGInput" type="file" name="groupProfile"></input>
                            <label htmlFor='createGInput' id="labelGroup">Group profile</label>
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

    /* <div>
                            <button className={`deleteBut ${theme ? 'darkTheme' : 'whiteTheme'}`} onClick={() => setOpenConfiguration(!openConfiguration)}><img src={dotsGrayPng} alt=""></img></button>
            </div>*/

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
