import { Users } from './body/Users'
import { UserInfo } from './header/UserInfo'
import styles from './styles.module.css'

export const LeftPane = () => {
    return (
        <div className={styles.container}>
            <UserInfo />
            <Users />
        </div>
    )
}
