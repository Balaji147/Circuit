import { useState } from "react";
import ComboBox from "./comboBox.component";
import WarningMessage from "../partner/warning.partner"
import { useEffect, useContext } from "react";
import { statusValues, levelValues } from "../partner/constVals.partner";
import { api } from "../helpers/axios.config";
import { ErrorInfoContext } from "../contexts/errorHandler.context";
import { useDispatch } from "react-redux";
import { fetchTaskList } from "../store/tasksStore/tasks.reducer";

const FormModal = ({ setIsModalOpen, taskData = null, setDataToEdit }) => {

    const INIT_VALUES = {
        title: taskData?.task_title || "",
        desc: taskData?.task_description || "",
        allocated_to: String(taskData?.task_allocated_to) || "",
        dueDate: taskData?.task_due_date?.split("T")[0] || "",
        status: taskData?.task_status || "todo",
        priority: taskData?.task_priority_level || "low"
    }
    const { errorInfo, setErrorInfo, clearErrorInfo } = useContext(ErrorInfoContext)
    const dispatch = useDispatch()
    const [fieldValues, setFieldValues] = useState(INIT_VALUES)
    const [userList, setUserList] = useState(null)

    const minDate = new Date().toISOString().split("T")[0]

    const getFieldValues = (elm)=>{
        const {name, value} = elm.target
        setFieldValues(prev=>({...prev, [name]:value}))
        setErrorInfo({[name]:""})
    }

    // Load users
    useEffect(()=>{
        const getAllusersFunc = async()=>{
            const getAllusers = await api.get("users/getUsers")
            if(getAllusers){
                setUserList([
                    {value:"", name:"Select User"},
                    ...getAllusers.data.rows.map(users=>({
                        value:users.circuit_users_auth_id,
                        name:users.name_of_user
                    }))
                ])
            }
        }
        getAllusersFunc()
    },[])

    const submitTaskFunc = async(e)=>{
        e.preventDefault()

        let warningInfo = {}

        if(!fieldValues.title)
            warningInfo.title = "Title Can't be Empty"
        else if(fieldValues.title.length > 20)
            warningInfo.title = "Title Can't be More than 20 characters"

        if(!fieldValues.allocated_to)
            warningInfo.allocated_to = "Select user to allocate"

        if(!fieldValues.status)
            warningInfo.status = "Select task status"

        if(!fieldValues.priority)
            warningInfo.priority = "Select task priority"

        if(!fieldValues.dueDate)
            warningInfo.dueDate = "Select due date"

        if(fieldValues.dueDate < minDate)
            warningInfo.dueDate = "Select valid due date"

        if(Object.keys(warningInfo).length > 0){
            setErrorInfo(warningInfo)
            return
        }

        clearErrorInfo()

        if(taskData){
            await api.put(`tasks/updateTask/${taskData.circuit_task_info_id}`, fieldValues)
            setDataToEdit(null)
        }else{
            await api.post("tasks/createTask", fieldValues)
        }
        dispatch(fetchTaskList())
        setIsModalOpen(false)
        setFieldValues(INIT_VALUES)
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-4">

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 
            p-6 sm:p-8 max-h-[90vh] sm:max-h-none overflow-y-auto sm:overflow-visible">

                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-6">
                    {taskData ? "Edit Task" : "Add Task"}
                </h2>

                <form onSubmit={submitTaskFunc} className="grid grid-cols-1 md:grid-cols-2 gap-4" noValidate>

                    {/* Title */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter task title"
                            name="title"
                            value={fieldValues.title}
                            onChange={getFieldValues}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                        <WarningMessage warning={errorInfo.title}/>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            rows="4"
                            placeholder="Enter task description"
                            name="desc"
                            value={fieldValues.desc}
                            onChange={getFieldValues}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 resize-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                    </div>

                    {/* Due Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Due Date
                        </label>
                        <input
                            type="date"
                            name="dueDate"
                            min={minDate}
                            value={fieldValues.dueDate}
                            onChange={getFieldValues}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                        <WarningMessage warning={errorInfo.dueDate}/>
                    </div>

                    {/* Allocated user */}
                    {userList && (
                        <div>
                            <ComboBox
                                label={"allocated_to"}
                                comboValues={userList}
                                onChangeVal={getFieldValues}
                                value={fieldValues.allocated_to}
                            />
                            <WarningMessage warning={errorInfo.allocated_to}/>
                        </div>
                    )}

                    {/* Status */}
                    <div>
                        <ComboBox
                            label={"status"}
                            comboValues={statusValues}
                            onChangeVal={getFieldValues}
                            value={fieldValues.status}
                        />
                        <WarningMessage warning={errorInfo.status}/>
                    </div>

                    {/* Priority */}
                    <div>
                        <ComboBox
                            label={"priority"}
                            comboValues={levelValues}
                            onChangeVal={getFieldValues}
                            value={fieldValues.priority}
                        />
                        <WarningMessage warning={errorInfo.priority}/>
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                            onClick={()=>{setIsModalOpen(false);clearErrorInfo();setDataToEdit(null)}}
                        >
                            Close
                        </button>

                        <button className="px-5 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition">
                            {taskData ? "Update Task" : "Create Task"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}


export default FormModal