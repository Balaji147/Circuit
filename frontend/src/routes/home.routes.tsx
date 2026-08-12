import {Route, Routes} from "react-router-dom"
import Navigation from "../pages/navigation.page"
import HomePage from "../pages/HomePage.page"
import LogInPage from "../pages/login.page"
import LogonPage from "../pages/logon.page"
import UserTasks from "../pages/userTask.page"
import EmployeeList from "../pages/employeeList.page"
import ProtectedRoute from "./productedRoutes.routes"
import { NotFoundPage } from "../pages/notFound.page"
import EmployeeInfo from "../pages/employeeInfo.page"
import TaskInfo from "../pages/taskInfo.page"

const HomeRoute = ()=>{
    return(
        <Routes>
            <Route element={<Navigation/>}>
                <Route path="/login" element={<LogInPage/>}/>
                <Route path="/logon" element={<LogonPage/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/userTasks" element={<UserTasks/>}/>
                    <Route path="/userTasks/taskInfo/:taskId" element={<TaskInfo/>}/>
                    <Route path="/employeeInfo" element={<EmployeeInfo/>}/>
                    <Route path="/employeeInfo/:empID" element={<EmployeeInfo/>}/>
                    <Route path="/employeeList" element={<EmployeeList/>}/>
                </Route>
                {/* 404 route */}
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}

export default HomeRoute