import styles from './styles.module.css'
import { useAppContext } from '@hooks'
import { Tab } from '@constants'

export const Navbar = () => {
    const {tab, setTab} = useAppContext()
    const handleTabClick = (tabName: Tab) => {
        if (tabName === tab) return
        setTab(tabName)
    }
    return (
        <div className={styles.navbar}>
            <div 
                className={`${styles["navbar-element"]} ${tab === 'chats' ? styles.selected : ''}`}
                onClick={() => handleTabClick('chats')}
            >
                Chats
            </div>
            <div 
                className={`${styles["navbar-element"]} ${tab === 'online' ? styles.selected : ''}`}
                onClick={() => handleTabClick('online')}
            >
                Online
            </div>
        </div>
    )
}