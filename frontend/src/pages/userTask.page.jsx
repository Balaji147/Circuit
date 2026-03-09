import { Header } from "../components/header.component"
import Filters from "../components/filter.component"
import task_icon from "../icons/task_icon.svg"
import { useDispatch, useSelector } from "react-redux"
import edit_icon from "../icons/edit_icon.svg"
import { dataFormat } from "../helpers/format.function"
import delete_icon from "../icons/delete_icon.svg"
import { selectUserTasks } from "../store/tasksStore/tasks.selector"
import FormModal from "../components/modal.component"
import { useEffect, useState } from "react"
import ConfirmModal from "../components/confirmation_modal.component"
import { api } from "../helpers/axios.config"
import { setUserTasks } from "../store/tasksStore/tasks.reducer"

const UserTasks = ()=>{

    const user_task_list = useSelector(selectUserTasks)
    const [dataToEdit, setDataToEdit] = useState(null)
    const [dataToDlt, setDataToDlt] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [filterMode, setFilterMode] = useState({})
    const dispatch = useDispatch()

    const openModalToEdit = (taskData)=>{
        setDataToEdit(taskData)
        setIsModalOpen(true)
    }
    const openModalToDelete = (taskData)=>{
        setDataToDlt(taskData)
        setIsModalOpen(true)
    }

    const onFilterChange = (elm)=>{
        const {name, value} = elm.target
        setFilterMode((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    useEffect(()=>{
        const getFilteredValuesFunc = async()=>{
            const getFilteredValues = await api.get("tasks/getTasks", {params: filterMode})
            if(getFilteredValues)
                dispatch(setUserTasks(getFilteredValues.data.taskInfo.user_tasks))    
        }

        getFilteredValuesFunc()
    }, [filterMode])
    
    return(
        <div>
            <Header icon={task_icon} title={"Your Tasks"}/>
            {user_task_list && 
                <>
                <Filters onFilterChange={onFilterChange} value={filterMode}/>
                <div className="w-full overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
                    <table className="w-full text-sm text-left">
                    
                    {/* Header */}
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                    <tr>
                        <th className="px-6 py-3">#</th>
                        <th className="px-6 py-3">Title</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Priority</th>
                        <th className="px-6 py-3">Due Date</th>
                        <th className="px-6 py-3">Created</th>
                        <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                    </thead>

                    {/* Body */}
                    <tbody className="divide-y divide-gray-100">

                        {user_task_list?.map((task)=>
                        {
                            let colorCode = "bg-green-100 text-green-700"
                            const taskLevel = task?.task_priority_level
                            if(taskLevel === "medium")
                                colorCode = "bg-amber-100 text-amber-700"
                            else if(taskLevel === "high")
                                colorCode = "bg-red-100 text-red-700"
                            return(
                                <tr className="hover:bg-gray-50 transition" key={task.circuit_task_info_id}>
                                    <td className="px-6 py-4 font-medium text-gray-700">{task.index_no}</td>

                                        <td className="px-6 py-4 text-gray-800">
                                        {task?.task_title}
                                        </td>

                                        <td className="px-6 py-4">
                                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                                            {task?.task_status}
                                        </span>
                                        </td>

                                        <td className="px-6 py-4 text-gray-800">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${colorCode}`}>
                                                {task?.task_priority_level}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                        {dataFormat(task?.task_due_date)}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                        {dataFormat(task?.task_created_dttm)}
                                        </td>

                                        <td className="px-6 py-4 flex justify-center gap-3">

                                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                <img src={edit_icon} alt="Edit" title="Edit" onClick={()=>openModalToEdit(task)}/>
                                            </button>

                                            <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                                                <img src={delete_icon} alt="Delete" title="Delete" 
                                                onClick={()=>openModalToDelete({task_name:task.task_title, task_id:task.circuit_task_info_id})}/>
                                            </button>
                                        </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                dataToEdit ? (
                    <FormModal
                    taskData={dataToEdit}
                    setDataToEdit={setDataToEdit}
                    setIsModalOpen={setIsModalOpen}
                    />
                ) : dataToDlt ? (
                    <ConfirmModal
                    message={"Are You Sure to Delete the task"}
                    setIsModalOpen={setIsModalOpen}
                    taskData={dataToDlt}
                    setDataToDlt={setDataToDlt}
                    />
                ) : null
                )}
            </>
            }
        </div>
    )
}

export default UserTasks