import { FormEvent, useState } from 'react'
import { useAuth, useDatabase, useAppContext } from '@hooks'
import styles from './styles.module.css'

type TFormData = {
    email: string
    password: string
    username: string
}

type TAuthMode = 'Sign Up' | 'Log In'

export const Login = () => {
    const { setIsAuthenticated, setUser } = useAppContext()
    const [formData, setFormData] = useState<TFormData>({
        email: '',
        password: '',
        username: ''
    })
    const [authMode, setAuthMode] = useState<TAuthMode>('Log In')
    
    const { signUp, logIn } = useAuth()
    const { createNewUser, setUserOnlineStatus } = useDatabase()

    const handleSignUp = async () => {
        try {
            const userCredentials = await signUp({ email: formData.email, password: formData.password, username: formData.username })
            const authenticatedUser = userCredentials.user
            await createNewUser({
                id: authenticatedUser.uid,
                username: authenticatedUser.displayName || '',
                email: authenticatedUser.email || ''
            })
            console.log('Sign up succes!')

            return authenticatedUser
        } catch (error) {
            console.log('Signup failed!', error)
        }
    }

    const handleLogin = async () => {
        try {
            const userCredentials = await logIn({ email: formData.email, password: formData.password })
            const authenticatedUser = userCredentials.user
            await setUserOnlineStatus({
                id: authenticatedUser.uid,
                username: authenticatedUser.displayName || '',
                email: authenticatedUser.email || ''
            }, true)
            console.log('Log in succes!', authenticatedUser)

            return authenticatedUser
        } catch (error) {
            console.log('Login failed!', error)
        }
    }

    const handleSubmit = async (e: FormEvent, authType: TAuthMode) => {
        e.preventDefault();
        if (authMode !== authType) {
            setAuthMode(authType)
            return
        }

        let authenticatedUser;

        if (authMode === 'Sign Up') {
            authenticatedUser = await handleSignUp()
        } else {
            authenticatedUser = await handleLogin()
        }

        if (!authenticatedUser) {
            console.log('error getting authentication')
        } else {
            setIsAuthenticated(true)
            setUser({
                id: authenticatedUser.uid,
                username: authenticatedUser.displayName || '',
                email: authenticatedUser.email || ''
            })
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Chatterbox
            </div>
            <form className={styles.form} autoComplete="off">
                <div className={styles.heading}>{authMode}</div>
                {authMode === 'Sign Up' && <label>
                    <span>Username:</span>
                    <input
                        type="text" name="username" 
                        placeholder="Enter your username..." value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                </label>}
                <label>
                    <span>Email:</span>
                    <input
                        type="text" name="email" value={formData.email}
                        placeholder="example@gmail.com"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </label>
                <label>
                    <span>Password:</span>
                    <input
                        type="password" name="password" value={formData.password}
                        placeholder="Password"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </label>
                <div className={styles.buttons}>
                    <button type="submit"
                        className={`${styles["auth-btn"]} ${authMode === 'Log In' ? styles.gray : ''}`}
                        onClick={(e) => handleSubmit(e, "Sign Up")}
                    >Sign Up</button>
                    <button type="submit"
                        className={`${styles["auth-btn"]} ${authMode === 'Sign Up' ? styles.gray : ''}`}
                        onClick={(e) => handleSubmit(e, "Log In")}
                    >Log In</button>
                </div>
            </form>
        </div>
    )
}
