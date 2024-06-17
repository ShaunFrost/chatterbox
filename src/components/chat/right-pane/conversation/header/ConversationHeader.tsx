import { useAppContext } from '@hooks'
import { Avatar } from '@components/avatar'
import styles from './styles.module.css'

export const ConversationHeader = () => {
    const { receiver } = useAppContext()

    return (
        receiver && <div className={styles.container}>
            <Avatar content={receiver.username[0].toUpperCase()}/>
            <div className={styles.user}>{receiver.username}</div>
        </div>
    )
}