import { useAppContext } from '@hooks'
import styles from './styles.module.css'
import { NoChatSelected } from './no-chat-selected/NoChatSelected'
import { Conversation } from './conversation/Conversation'

export const RightPane = () => {
    const { receiver } = useAppContext()
    return (
        <div className={styles.container}>
            {
                receiver ? <Conversation /> : <NoChatSelected />
            }
        </div>
    )
}
