import styles from './styles.module.css'

export const NoChatSelected = () => {
    return (
        <div className={styles.container}>
            <h1>Chatterbox</h1>
            <p>Click on an existing chat or start a new one.</p>
        </div>
    )
}