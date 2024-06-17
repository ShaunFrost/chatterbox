import styles from './styles.module.css'

interface IAvatarProps {
    content: string
}

export const Avatar = ({content}: IAvatarProps) => {
    return (
        <div className={styles.container}>
            {content}
        </div>
    )
}