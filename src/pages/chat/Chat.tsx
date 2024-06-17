import { LeftPane, RightPane } from '@components/chat'
import styles from './styles.module.css'

export const Chat = () => {
    return (
        <div className={styles.container}>
            <LeftPane />
            <RightPane />
        </div>
    )
}
