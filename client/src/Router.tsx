import { Route, Routes } from "react-router"
import Sign from "./pages/Sign"
import Login from "./pages/Login"
import Home from "./pages/Home"
import ProtectedRoutes from "./components/features/ProtectedRoutes"
import Task from "./pages/Task"

const Router = () => {

    return (
        <>
            <Routes>
                <Route path="/sign" element={
                    <Sign
                    />
                }
                />
                <Route path="/login" element={
                    <Login
                    />
                }
                />
                <Route path="/" element={
                    <ProtectedRoutes>
                        <Home
                        />
                    </ProtectedRoutes>
                }
                />
                <Route path="/tasks/:projectId" element={
                    <ProtectedRoutes>
                        <Task
                        />
                    </ProtectedRoutes>
                }
                />
            </Routes >
        </>
    )

}

export default Router