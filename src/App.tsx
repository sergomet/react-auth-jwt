import './App.css'
import { ContextProvider } from './context/ContextProvider'
import { BrowserRouter } from 'react-router-dom'
import { MainRouter } from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </QueryClientProvider>
    </ContextProvider>
  )
}

export default App
