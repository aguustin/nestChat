import { createContext, useState } from "react";

const FrontContext = createContext();

export const FrontContextProvider = ({children}) => {

    const [theme, setTheme] = useState(false);
    const [contactsOrGroups, setContacsOrGroups] = useState(false);

    return(
        <FrontContext.Provider value={{
            contactsOrGroups,
            setContacsOrGroups,
            theme,
            setTheme
        }}>{children}</FrontContext.Provider>
    )
}

export default FrontContext;