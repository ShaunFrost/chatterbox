import { TUser, TReceiver, Tab } from '@constants'
import { PropsWithChildren, createContext, useState, useEffect } from 'react'
import { realtimeDB, firebaseAuth } from 'src/store/firebase'
import { onDisconnect, ref, set } from 'firebase/database'

interface IAppContext {
    user: TUser | null
    setUser: React.Dispatch<React.SetStateAction<TUser | null>>
    selectedChatId: string
    setSelectedChatId: React.Dispatch<React.SetStateAction<string>>
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    receiver: TReceiver | null
    setReceiver: React.Dispatch<React.SetStateAction<TReceiver | null>>
    tab: Tab
    setTab: React.Dispatch<React.SetStateAction<Tab>>
}

export const AppContext = createContext<IAppContext>({} as IAppContext)

export const ChatContextProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<TUser | null>(null)
    const [selectedChatId, setSelectedChatId] = useState<string>('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [receiver, setReceiver] = useState<TReceiver | null>(null)
    const [tab, setTab] = useState<Tab>('online')

    const authUser = firebaseAuth.currentUser
    useEffect(() => {
        if (authUser) {
            const onlineStatusRef = ref(realtimeDB, 'users/' + authUser.uid + '/isOnline')
            set(onlineStatusRef, true)

            onDisconnect(onlineStatusRef).set(false)
        }
    }, [authUser])

    return (
        <AppContext.Provider value={{
            user, setUser, selectedChatId, setSelectedChatId,
            isAuthenticated, setIsAuthenticated,
            receiver, setReceiver, tab, setTab
        }}>
            { children }
        </AppContext.Provider>
    )
}
