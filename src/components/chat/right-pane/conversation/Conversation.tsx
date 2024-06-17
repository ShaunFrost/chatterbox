import { useState, useEffect } from 'react'
import { useAppContext, useDatabase } from '@hooks'
import { realtimeDB } from 'src/store/firebase'
import { ref, onValue, query, orderByChild } from 'firebase/database'
import { ConversationBody } from './body/ConversationBody'
import { ConversationFooter } from './footer/ConversationFooter'
import { ConversationHeader } from './header/ConversationHeader'
import styles from './styles.module.css'
import { TMessageStatus, TMessage } from '@constants'

type TDatabaseMessage = {
    sender: string
    text: string
    timestamp: number
    status: TMessageStatus
}

export const Conversation = () => {
    const { receiver, user } = useAppContext()
    const { addMessage, addConversationToUser, setMessageStatus } = useDatabase()
    const [messages, setMessages] = useState<TMessage[]>([])

    useEffect(() => {
        if (receiver) {
            const conversationRef = ref(realtimeDB, 'messages/' + receiver.conversationId)
            const messagesQuery = query(conversationRef, orderByChild('timestamp'))

            const unsubscribe = onValue(messagesQuery, (snapshot) => {
                const messageList: TMessage[] = []
                snapshot.forEach((childSnapshot) => {
                    const val: TDatabaseMessage = childSnapshot.val()
                    messageList.push({ id: childSnapshot.key, ...val })
                })
                setMessages(messageList)
            })

            return () => unsubscribe()
        }
    }, [receiver])

    useEffect(() => {
        if (!receiver) return
        const dbref = ref(realtimeDB, 'users/' + receiver.id + '/isOnline')

        const unsubscribe = onValue(dbref, (snapshot) => {
            const isOnline: boolean = snapshot.val()
            if (isOnline) {
                messages.forEach((message) => {
                    if (message.status === 'sent') {
                        setMessageStatus(receiver.conversationId, message.id, 'received')
                    }
                })
            }
        })

        return () => unsubscribe()
    }, [receiver, messages, setMessageStatus])

    const sendMessage = async (text: string) => {
        if (!receiver || !user) return

        if (messages.length === 0) {
            await addConversationToUser(user.id, receiver.id, receiver.conversationId)
        }

        await addMessage(receiver.conversationId, text, user.id, new Date().getTime())
    }

    return (
        <div className={styles.container}>
            <ConversationHeader />
            <ConversationBody messages={messages}/>
            <ConversationFooter sendMessage={sendMessage}/>
        </div>
    )
}