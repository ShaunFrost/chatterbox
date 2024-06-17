import { Chat } from '@pages/chat'
import { Login } from '@pages/login'
import { useAppContext } from '@hooks'

function App() {
  const { isAuthenticated } = useAppContext()

  return (
    <div className="App">
      { 
        isAuthenticated ? <Chat /> : <Login />
      }
    </div>
  )
}

export default App
