import { useAppContext } from '@hooks'
import { TReceiver } from '@constants'
import styles from './styles.module.css'
import { Avatar } from '@components/avatar'

interface IUserOptionProps {
    receiver: TReceiver
}

export const UserOption = ({ receiver }: IUserOptionProps) => {
    const { setReceiver } = useAppContext()

    const handleUserClick = () => {
        // if (receiver.conversationId === '') {

        // }
        setReceiver(receiver)
    }

    return (
        <div className={styles.user}  onClick={handleUserClick}>
            <div className={styles["user-element"]}>
                <Avatar content={receiver.username[0].toUpperCase()} />
                <div className={styles["user-details"]}>
                    <div className={styles.username}>{receiver.username}</div>
                    <div>{receiver.email}</div>
                </div>
            </div>
        </div>
    )
}