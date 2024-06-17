import { firebaseAuth } from 'src/store/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'

interface IAuthProps {
    email: string
    password: string
    username?: string
}

export const useAuth = () => {
    const signUp = async ({ email, password, username }: IAuthProps) => {
        const userCredentials = await createUserWithEmailAndPassword(firebaseAuth, email, password)
        await updateProfile(userCredentials.user, {
            displayName: username
        })
        return userCredentials
    }

    const logIn = async ({ email, password }: IAuthProps) => {
        const userCredentials = await signInWithEmailAndPassword(firebaseAuth, email, password)
        return userCredentials
    }

    const logOut = async () => {
        await signOut(firebaseAuth)
    }

    return {
        signUp,
        logIn,
        logOut
    }
}