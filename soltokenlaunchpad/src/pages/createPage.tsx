import { ThemeProvider } from '../context/themeContext'
import { ToastProvider } from '../context/toastContext'
import TokenLaunchpad from "../components/formComponents/tokenlaunchpad"
import Header from '../components/formComponents/header'

function CreatePage() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-background text-text">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <TokenLaunchpad />
          </main>
        </div>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default CreatePage


