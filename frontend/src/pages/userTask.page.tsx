import { Header } from "../components/header.component"
import Filters from "../components/filter.component"
import filter_icon from "../icons/filter_icon.svg"
import { NoData } from "../partner/noData.partner"
import task_icon from "../icons/task_icon.svg"
import edit_icon from "../icons/edit_icon.svg"
import { dataFormat } from "../helpers/format.function"
import add_icon from "../icons/add_icon.svg"
import delete_icon from "../icons/delete_icon.svg"
import { selectAllTasksCnt, selectUserTasks } from "../store/tasksStore/tasks.selector"
import data_not_exists from "../icons/data_not_exists.svg"
import FormModal from "../components/modal.component"
import React, { useEffect, useState } from "react"
import ConfirmModal from "../components/confirmation_modal.component"
import { api } from "../helpers/axios.config"
import { setUserTasks } from "../store/tasksStore/tasks.reducer"
import { PaginationTags } from "../components/pagination.component"
import type{ DataActionType, UserTaskList, ValueInterface, NameIdType, TaskDataProps } from "../types/filter.types"
import type { NullAllowedType } from "../types/common.types" 
import { useAppDispatch, useAppSelector } from "../hooks/hooks"

const UserTasks = ()=>{

    const user_task_list = useAppSelector(selectUserTasks)
    const selectAllTaskCnt = useAppSelector(selectAllTasksCnt)
    const [dataToEdit, setDataToEdit] = useState<NullAllowedType<TaskDataProps>>(null)
    const [dataToDlt, setDataToDlt] = useState<NullAllowedType<NameIdType>>(null)
    const [isModalOpen, setIsModalOpen] = useState<NullAllowedType<string | boolean>>(null)
    const [filterMode, setFilterMode] = useState<ValueInterface>({sr_name:"", Status:"", Priority:""})
    const [debounceName, setDebounceName] = useState<DataActionType>("")
    const dispatch = useAppDispatch()
    const openModalToEdit = (taskData:TaskDataProps)=>{
        setDataToEdit(taskData)
        setIsModalOpen("edit")
    }
    const openModalToDelete = (taskData:NameIdType)=>{
        setDataToDlt(taskData)
        setIsModalOpen("delete")
    }
    const pageNumbers = Array.from({length:5}, (_, idx)=>idx+1)
    
    useEffect(()=>{
        const debounceTimer = setTimeout(()=>{
            if(filterMode?.sr_name)
                setDebounceName(filterMode?.sr_name)
        }, 500)

        return ()=>clearTimeout(debounceTimer)
    },[filterMode.sr_name])

    const onFilterChange = (elm:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const {name, value} = elm.target
        setFilterMode((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const openModalFunc = ()=>{
        setIsModalOpen("create")
    }
    useEffect(()=>{
        const getFilteredValuesFunc = async()=>{
            const getFilteredValues = await api.get("tasks/getTasks", {params: filterMode})
            if(getFilteredValues)
                dispatch(setUserTasks(getFilteredValues.data.taskInfo.user_tasks))    
        }

        getFilteredValuesFunc()
    }, [filterMode.Status, filterMode.Priority, debounceName])
    
    return(
        <div className="flex flex-col min-h-[90vh]">
            <div className="flex-1">
                <Header icon={task_icon} title={"Your Tasks"} extra_icon={add_icon} iconOnClick={openModalFunc}/>
                {(user_task_list?.length ?? 0) > 0 ? 
                    <>
                        <Filters onFilterChange={onFilterChange} filterModes={filterMode} otherInfo={{"Tasks Count":selectAllTaskCnt}}/>
                        <div className="w-full overflow-x-auto bg-white rounded-xl shadow border border-gray-200 flex-1">
                            <table className="w-full text-sm text-left flex-1">
                        
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

                                    {user_task_list?.map((task:TaskDataProps)=>
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
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        {isModalOpen && isModalOpen !== "create" && (
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
                        {isModalOpen === "create" && (
                            <FormModal
                                setIsModalOpen={setIsModalOpen}
                            />
                        )}
                    </>:
                    (
                        (filterMode.Priority || filterMode.Status || filterMode.sr_name)?
                        <>
                            <Filters onFilterChange={onFilterChange} filterModes={filterMode} otherInfo={{"Tasks Count":selectAllTaskCnt}}/>
                            <NoData icon={filter_icon} title={"No Tasks Found"} desc={"No Tasks Found, Try to Change Filters"}/>
                        </>:
                        <NoData icon={data_not_exists} title={"No Tasks Found"} desc={"There is no task allocated to you"}/>
                    )
                }
            </div>
            {
                (user_task_list?.length ?? 0) > 0 &&
                <PaginationTags pageNumbers={pageNumbers}/>
            }
        </div>
    )
}

export default UserTasks