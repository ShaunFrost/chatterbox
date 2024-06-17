export type TUser = {
    id: string
    username: string
    email: string
}

export type TReceiver = TUser & {
    conversationId: string
}

export type TMessage = {
    id: string
    text: string
    sender: string
    timestamp: number,
    status: TMessageStatus
}

export type TMessageStatus = 'sent' | 'received' | 'seen'

export type Tab = 'chats' | 'online'
