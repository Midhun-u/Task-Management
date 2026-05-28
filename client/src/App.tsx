import { useEffect } from "react"
import Router from "./Router"
import { Toaster } from 'react-hot-toast'
import { useAppSelector } from "./store/hooks"

const App = () => {

  const { theme } = useAppSelector(state => state.theme)

  useEffect(() => {

    const body = document.getElementsByTagName("body")[0]

    if (theme === "dark") {
      body.classList.add("dark")
    } else {
      body.classList.remove("dark")
    }

  }, [theme])

  return (
    <>
      <Router
      />
      <Toaster
        position="top-center"
        toastOptions={{
          removeDelay: 3000,
        }}
      />
    </>
  )

}

export default App