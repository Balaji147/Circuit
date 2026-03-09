import dashboard_icon from "../icons/dashboard_icon.svg"
import { Header } from "../components/header.component"
import SummaryCard from "../components/dshboard_card.component"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTaskList } from "../store/tasksStore/tasks.reducer"
import { selectAllTasks } from "../store/tasksStore/tasks.selector"

const HomePage = ()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchTaskList())
    },[dispatch])
    const all_user_tasks = useSelector(selectAllTasks)
    return (
        <div>
            {/* Header */}
            <Header icon={dashboard_icon} title={"Dashboard"}/>

            <div className="p-6 space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SummaryCard Content={"Total Tasks"} Count={all_user_tasks?.all_tasks || 0} />
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