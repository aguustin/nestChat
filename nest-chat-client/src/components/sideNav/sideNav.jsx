import { useContext, useState } from "react";
import FrontContext from "../../context/frontContext";
import UserDataContext from "../../context/userDataContext";
import ChatContext from "../../context/chatContext";
import userPng from '../../assets/user.png';
import menuPng from '../../assets/menu.png';
import contactPng from '../../assets/contact.png';
import contactGPng from '../../assets/contactG.png';
import groupPng from '../../assets/group.png';
import groupGPng from '../../assets/groupG.png';

const SideNav = () => {

    const {contactsOrGroups, setContacsOrGroups, theme, } = useContext(FrontContext);
    const {session, showContactContext, showGroupsContext, contactsData, deleteContactContext, deleteGroupsContext} = useContext(UserDataContext);
    const {openGroupChatContext, openContactChatContext} = useContext(ChatContext);
    const [openConfiguration, setOpenConfiguration] = useState(false);
    const [search, setSearch] = useState('');


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
        console.log("open")
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
                    <input className={`${theme ? 'darkTheme' : 'inputLigthTheme'}`} value={search} type="text" placeholder='search' onChange={(e) => setSearch(e.target.value)}/>
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

export default SideNav;