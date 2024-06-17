import { realtimeDB } from 'src/store/firebase'
import { ref, set, update, push } from 'firebase/database'
import { TUser, TMessageStatus } from '@constants'

export const useDatabase = () => {

    const createNewUser = async (user: TUser) => {
        await set(ref(realtimeDB, 'users/' + user.id), {
            ...user,
            conversations: {},
            isOnline: true
        })
    }
    
    const setUserOnlineStatus = async (user: TUser, status: boolean) => {
        await update(ref(realtimeDB, 'users/' + user.id), {
            'isOnline' : status
        })
    }

    const addMessage = async (conversationId: string, text: string, sender: string, timestamp: number) => {
        const newMessageRef = push(ref(realtimeDB, 'messages/' + conversationId))
        await set(newMessageRef, {
            text,
            sender,
            timestamp,
            status: 'sent'
        })
    }

    const addConversationToUser = async (userId: string, receiverId: string, conversationId: string) => {
        await set(ref(realtimeDB, 'users/' + userId + '/conversations/' + receiverId), conversationId)
        await set(ref(realtimeDB, 'users/' + receiverId + '/conversations/' + userId), conversationId)
    }

    const setMessageStatus = async (conversationId: string, messageId: string, status: TMessageStatus) => {
        await update(ref(realtimeDB, 'messages/' + conversationId + '/' + messageId), {
            status
        })
    }

    return {
        createNewUser,
        setUserOnlineStatus,
        addMessage,
        addConversationToUser,
        setMessageStatus
    }
}