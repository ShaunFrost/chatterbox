import { useState } from 'react'
import { IoSend } from 'react-icons/io5'
import styles from './styles.module.css'

interface IConversationFooterProps {
    sendMessage: (text: string) => void
}

export const ConversationFooter = ({sendMessage}: IConversationFooterProps) => {
    const [inputMessage, setInputMessage] = useState('')

    const handleSend = () => {
        if (inputMessage === '') return
        sendMessage(inputMessage)
        setInputMessage('')
    }

    return (
        <div className={styles.container}>
            <div className={styles["chat-input"]}>
                <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder='Enter your message...' />
            </div>
            <div className={styles["send-btn"]} onClick={handleSend}>
                <IoSend />
            </div>
        </div>
    )
}