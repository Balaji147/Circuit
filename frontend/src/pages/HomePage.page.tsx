import dashboard_icon from "../icons/dashboard_icon.svg"
import { Header } from "../components/header.component"
import SummaryCard from "../components/dshboard_card.component"
import { useEffect } from "react"
import {useNavigate} from "react-router-dom"
import { fetchTaskList } from "../store/tasksStore/tasks.reducer"
import { selectAllTasks } from "../store/tasksStore/tasks.selector"
import { fetchCompanyInfo } from "../store/companyStore/company.reducer"
import { selectCompanyInfo } from "../store/companyStore/company.selector"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { selectCurrentUser } from "../store/usersStore/user.selector"

const HomePage = ()=>{
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(fetchTaskList())
        dispatch(fetchCompanyInfo())
    },[dispatch])

    const navigate = useNavigate()

    const companyInfo = useAppSelector(selectCompanyInfo)
    const userInfo = useAppSelector(selectCurrentUser)
    const all_user_tasks = useAppSelector(selectAllTasks)
    return (
        <div>
            {/* Header */}
            <Header icon={dashboard_icon} title={"Dashboard"}/>

            <div className="p-6 space-y-6">
                {/* Row 1 */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 
                    flex flex-col md:flex-row items-center justify-center 
                    md:justify-between 
                    gap-3 md:gap-8 
                    p-4 md:p-6 text-center">

                    {/* Logo + Company */}
                    <div className="flex items-center gap-3 md:gap-4 justify-center">
                        <img
                        src={companyInfo?.company_logo}
                        alt="company-logo"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                        />
                        <div className="text-left">
                        <div className="text-base md:text-lg font-semibold text-gray-800">
                            {companyInfo?.company_name}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500">
                            Company Name
                        </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block h-10 w-px bg-gray-300"></div>

                    {/* Employee Count */}
                    <div className="flex flex-col items-center justify-center px-2" onClick={()=>navigate(userInfo?.user_role === "admin"?"employeeList":"employeeInfo")}>
                        <div className="text-base md:text-lg font-semibold text-gray-800">
                            {userInfo?.user_role === "admin"?companyInfo?.employee_cnt:userInfo?.user_name}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500">
                            {userInfo?.user_role === "admin"?"Employees":"Employee Name"}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block h-10 w-px bg-gray-300"></div>

                    {/* Admin */}
                    <div className="flex flex-col items-center justify-center px-2">
                        <div className="text-base md:text-lg font-semibold text-gray-800">
                            {companyInfo?.admin_name}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500">
                            Admin
                        </div>
                    </div>

                    </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SummaryCard Content={"Total Tasks"} Count={all_user_tasks?.all_tasks_cnt || 0}  onClickFunc={()=>navigate("userTasks")}/>
                    <SummaryCard Content={"Overdue Tasks"} Count={all_user_tasks?.over_due_task || 0} />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <SummaryCard Content={"Todo Tasks"} Count={all_user_tasks?.todo_task || 0}/>
                    <SummaryCard Content={"In Progress Tasks"} Count={all_user_tasks?.in_progress_task || 0} />
                    <SummaryCard Content={"Done Tasks"} Count={all_user_tasks?.done_task || 0} />
                </div>
            </div>
        </div>
    )
}

export default HomePage