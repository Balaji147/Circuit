import {Route, Routes} from "react-router-dom"
import Navigation from "../pages/navigation.page"
import HomePage from "../pages/HomePage.page"
import LogInPage from "../pages/login.page"
import LogonPage from "../pages/logon.page"
import UserTasks from "../pages/userTask.page"
import ProtectedRoute from "./productedRoutes.routes"
import { NotFoundPage } from "../pages/notFound.page"

const HomeRoute = ()=>{
    return(
        <Routes>
            <Route element={<Navigation/>}>
                <Route path="/login" element={<LogInPage/>}/>
                <Route path="/logon" element={<LogonPage/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/userTasks" element={<UserTasks/>}/>
                </Route>
                {/* 404 route */}
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}

export default HomeRoute