import { useParams } from "react-router"
import task_icon from "../icons/task_icon.svg"
import { Header } from "../components/header.component"
import { useEffect, useState } from "react"
import { api } from "../helpers/axios.config"
import type {PeriorityType, StatusType} from "../types/filter.types"
import { dataFormat, capitalizeFullWord } from "../helpers/format.function"
import { StatusComponent } from "../components/support.component"

type AssignerType = {
    name_of_user:string
}

interface TaskInfoInterface{
    circuit_task_info_id: number,
    task_title: string,
    task_description: string,
    task_priority_level: PeriorityType,
    task_status: StatusType,
    task_due_date: string,
    task_created_dttm: string,
    task_unique_id: string,
    assigner: AssignerType
}

const TaskInfo = ()=>{
    const {taskId} = useParams()
    const [taskDetails, setTaskDetails] = useState<TaskInfoInterface>()
    const [taskHistories, setTaskHistories] = useState()
    const fetchTaskDetails = async()=>{
        const getTaskDetails = await api.get(`tasks/getTask/${taskId}`)
        setTaskDetails(getTaskDetails.data.task_info)
    }

    useEffect(()=>{
        fetchTaskDetails()
        const fetchTaskHistories = async()=>{
            const taskHistories = await api.get(`tasksHist/getTaskHist/${taskId}`)
            setTaskHistories(taskHistories.data.tasksHistList)
        }
        fetchTaskHistories()
    }, [taskId])
    console.log(taskHistories)
    return(
        <div>
            <Header icon={task_icon} title={"Tasks Info"} />
            <div className="flex">
                <div className="w-[70%]">
                    {
                        taskHistories ? (
                            taskHistories.map(
                                taskHistory=>{
                                    return(
                                            <div className="bg-white rounded-lg m-2 p-2" key={taskHistory?.circuit_task_history_id}>
                                                {
                                                    taskHistory?.history_for === "insert" 
                                                    && 
                                                    (
                                                        <div>
                                                            <div>
                                                                Task Created By: {taskHistory?.assigner_history?.name_of_user}
                                                            </div>
                                                            <div>
                                                                Task Assigned To: {taskHistory?.assignee_history?.name_of_user}
                                                            </div>
                                                            <div>
                                                                Task Description: {taskHistory?.task_status_desc}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                            )
                        ):("History Not Available")
                    }
                </div>
                <aside className="border-l min-h-screen w-[30%] bg-white px-6 py-2 shadow-sm">
                    <div className="mb-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                            Task Details
                        </p>
                        <h2 className="text-2xl font-semibold text-gray-900">
                            {taskDetails?.task_unique_id}
                        </h2>
                    </div>

                    <div className="space-y-1">

                        <div className="flex flex-col border-b border-gray-100 py-4">
                            <span className="text-xs font-medium text-gray-500">Task Title</span>
                            <span className="mt-1 text-sm font-medium text-gray-900">
                                {taskDetails?.task_title}
                            </span>
                        </div>

                        <div className="flex flex-col border-b border-gray-100 py-4">
                            <span className="text-xs font-medium text-gray-500">Task Description</span>
                            <span className="mt-1 text-sm font-medium text-gray-900">
                                {taskDetails?.task_description}
                            </span>
                        </div>

                        <div className="flex flex-col border-b border-gray-100 py-4">
                            <span className="text-xs font-medium text-gray-500">Current Assignee</span>
                            <span className="mt-1 text-sm font-medium text-gray-900">
                                {taskDetails?.assigner?.name_of_user}
                            </span>
                        </div>

                        <div className="flex flex-col border-b border-gray-100 py-4">
                            <span className="text-xs font-medium text-gray-500">Task Periority</span>
                            <span className="pt-2">
                                <StatusComponent taskLevel={taskDetails?.task_priority_level}/>
                            </span>
                        </div>

                        <div className="flex flex-col border-b border-gray-100 py-4">
                            <span className="text-xs font-medium text-gray-500">Task Status</span>
                            <span className="mt-2 w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold">
                                {capitalizeFullWord(taskDetails?.task_status)}
                            </span>
                        </div>

                        <div className="flex flex-col py-4">
                            <span className="text-xs font-medium text-gray-500">Task Created At</span>
                            <span className="mt-1 text-sm font-medium text-gray-900">
                                {dataFormat(taskDetails?.task_created_dttm)}
                            </span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default TaskInfo