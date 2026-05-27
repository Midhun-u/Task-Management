import Router from "./Router"
import {Toaster} from 'react-hot-toast'

const App = () => {

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