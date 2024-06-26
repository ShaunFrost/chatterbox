import { useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import styles from './styles.module.css'
import { UserOption } from './UserOption'
import { realtimeDB } from 'src/store/firebase'
import { ref, onValue } from 'firebase/database'
import { useAppContext } from '@hooks'
import { TReceiver, TUser } from '@constants'
import { v4 as uuidV4 } from 'uuid'

type TDatabaseUser = {
    id: string
    username: string
    email: string
    isOnline: boolean
    conversations: { [index: string]: string }
}

export const Users = () => {
    const { user, tab } = useAppContext()
    const [onlineUsers, setOnlineUsers] = useState<TReceiver[]>([])
    const [activeChatUsers, setActiveChatUsers] = useState<TReceiver[]>([])

    useEffect(() => {
        const dbref = ref(realtimeDB, 'users')

        const unsubscribe = onValue(dbref, (snapshot) => {
            const onlineUserList: TUser[] = []
            const allUsers = new Map<string, TUser>()
            const userConversations = new Map<string, string>();
            snapshot.forEach((childSnapshot) => {
                const val: TDatabaseUser = childSnapshot.val()
                if (val.id !== user?.id && val.isOnline) {
                    onlineUserList.push({
                        id: val.id,
                        username: val.username,
                        email: val.email
                    })
                }
                if (val.id === user?.id && val.conversations) {
                    Object.entries(val.conversations).forEach(([userId, conversationId]) => {
                        userConversations.set(userId, conversationId)
                    })
                }
                allUsers.set(val.id, {
                    id: val.id,
                    username: val.username,
                    email: val.email
                })
            })
            const updatedList: TReceiver[] = onlineUserList.map((onlineUserObj) => {
                if (userConversations.has(onlineUserObj.id)) {
                    const conversationId = userConversations.get(onlineUserObj.id) || ''
                    return {...onlineUserObj, conversationId }
                }
                return {...onlineUserObj, conversationId: uuidV4()}
            })
            setOnlineUsers(updatedList)

            const activeChatUsers: TReceiver[] = []
            userConversations.forEach((conversationId, userId) => {
                if (allUsers.has(userId)) {
                    const activeChatUser = allUsers.get(userId)
                    if (activeChatUser) {
                        activeChatUsers.push({
                            ...activeChatUser,
                            conversationId
                        })
                    }
                }
            })
            setActiveChatUsers(activeChatUsers)
        })

        return () => unsubscribe()
    }, [user])

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.users}>
                {
                    (tab === 'online' ? onlineUsers : activeChatUsers).map((onlineUser) => <UserOption key={onlineUser.id} receiver={onlineUser}/>)
                }
            </div>
        </div>
    )
}
