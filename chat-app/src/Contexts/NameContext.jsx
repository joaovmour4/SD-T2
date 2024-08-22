import React from 'react'

const Context = React.createContext({})

export function useSession(){
    const context = React.useContext(Context)

    return context
}

export const SessionProvider = ({ children }) => {
    const [name, setName] = React.useState('')

    const handleName = (name) => {
        setName(name)
    }

    return(
        <Context.Provider value={{ name, handleName }}>
            {children}
        </Context.Provider>
    )
}

export default Context