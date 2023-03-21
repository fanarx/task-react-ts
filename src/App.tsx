import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import MeetingPage from './pages/MeetingPage'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <MeetingPage />
    </QueryClientProvider>
  )
}

export default App
