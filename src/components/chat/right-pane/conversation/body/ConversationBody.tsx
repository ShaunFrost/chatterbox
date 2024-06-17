import { TMessage } from '@constants'
import { ChatBubble } from './ChatBubble'
import styles from './styles.module.css'

interface IConversationBodyProps {
    messages: TMessage[]
}

export const ConversationBody = ({messages}: IConversationBodyProps) => {

    return (
        <div className={styles.container}>
            {
                messages.map((message) => {
                    return <ChatBubble key={message.id} message={message} />
                })
            }
        </div>
    )
}