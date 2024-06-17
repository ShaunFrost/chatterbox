import { useAppContext, useAuth, useDatabase } from '@hooks'
import styles from './styles.module.css'
import { Avatar } from '@components/avatar'

export const UserInfo = () => {
    const { user, setUser, setIsAuthenticated, setReceiver } = useAppContext()
    const { logOut } = useAuth()
    const { setUserOnlineStatus } = useDatabase()

    const handleLogOut = async () => {
        try{
            await logOut()
            setIsAuthenticated(false)
            if (user) {
                await setUserOnlineStatus(user, false)
                setUser(null)
            }
            setReceiver(null)
            console.log('Logout succesful!')
        } catch (error) {
            console.log('Error on log out', error)
        }
    }

    return (
        user && <div className={styles.container}>
            <Avatar content={user.username[0]?.toUpperCase()} />
            <p>{`Hello, ${user.username}!`}</p>
            <button className={styles['logout-btn']} onClick={handleLogOut}>
                Logout
            </button>
        </div>
    )
}