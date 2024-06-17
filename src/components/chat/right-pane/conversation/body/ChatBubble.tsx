import { useEffect } from 'react'
import { useDatabase, useAppContext } from '@hooks'
import { IoCheckmark, IoCheckmarkDone } from 'react-icons/io5'
import { TMessage, TMessageStatus } from '@constants'
import styles from './styles.module.css'

interface IChatBubbleProps {
    message: TMessage
}

export const ChatBubble = ({message}: IChatBubbleProps) => { 
    const { setMessageStatus } = useDatabase()
    const { user, receiver } = useAppContext()
    const { status, text } = message
    const fromUser = message.sender === user?.id

    const getIcon = (status: TMessageStatus) => {
        if (status === 'sent') return <IoCheckmark />
        else if (status === 'received') return <IoCheckmarkDone />
        return <IoCheckmarkDone style={{stroke: 'blue'}}/>
    }

    useEffect(() => {
        if (status === 'seen' || fromUser) {
            return
        }
        if (!receiver) return
        setMessageStatus(receiver.conversationId, message.id, 'seen')
    }, [message, receiver, status, fromUser, setMessageStatus])

    return (
        <div className={styles["bubble-wrapper"]}>
            <div className={`${styles["message-bubble"]} ${fromUser ? styles.sent : styles.received}`}>
                <div className={styles.bubble}>
                    {text}
                </div>
                {fromUser && <div className={styles.status}>{getIcon(status)}</div>}
            </div>
        </div>
    )
}