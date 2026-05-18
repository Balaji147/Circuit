import { Header } from "../components/header.component"
import employees_icon from "../icons/employee_icon.svg"
import add_icon from "../icons/add_icon.svg"
import { useEffect, useState } from "react"
import edit_icon from "../icons/edit_icon.svg"
import delete_icon from "../icons/delete_icon.svg"
import { api } from "../helpers/axios.config"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../store/usersStore/user.selector"
import { dataFormat, capitalizeWords } from "../helpers/format.function"

import EmployeeModal from "../components/employeeModal.component"

const EmployeeList = ()=>{
    
    const [employeesList, setEmployeesList] = useState([])
    const [openEmployeeModal, setOpenEmployeeModal] = useState(null)
    const currentEmployee = useSelector(selectCurrentUser)

    const getEmployees = async()=>{
        const employees = await api.get("employees/getEmployeesList")
        console.log("emp", employees.data.rows)
        if(employees)
            setEmployeesList(employees.data.rows)
    }
    useEffect(()=>{
        getEmployees()
    },[])

    const openModalFunc = ()=>{
        setOpenEmployeeModal("create")
    }
    
    return(
        <div>
            <Header icon={employees_icon} title={"Employee"} extra_icon={add_icon} iconOnClick={openModalFunc}/>
            {employeesList.length > 0 &&
                <div className="w-full overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
                    <table className="w-full text-sm text-left">
                        {/* Header */}
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-3">#</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Mail Id</th>
                                <th className="px-6 py-3">Designation</th>
                                <th className="px-6 py-3">Entered At</th>
                                {currentEmployee.user_role === 'admin'
                                &&
                                <th className="px-6 py-3 text-center">Actions</th>
                                }
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {employeesList.map((employee)=>(
                                <tr className="hover:bg-gray-50 transition" key={employee.circuit_users_auth_id}>
                                    <td className="px-6 py-4 font-medium text-gray-700">{employee.index_no}</td>
                                    <td className="px-6 py-4 text-gray-800">
                                        <div className="flex items-center gap-2">

                                            <span className="font-medium">
                                            {employee?.name_of_user}
                                            </span>

                                            {employee?.user_role === "admin" && (
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                                                Admin
                                            </span>
                                            )}

                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                                            {employee?.user_mailid}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-gray-800">
                                            {capitalizeWords(employee?.user_designation || "--")}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {dataFormat(employee?.created_at)}
                                    </td>
                                    {(currentEmployee.user_role === 'admin' || currentEmployee.user_role === 'same_as_admin')
                                    &&
                                        <td className="px-6 py-4 flex justify-center gap-3">
                                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                <img src={edit_icon} alt="Edit" title="Edit"/>
                                            </button>

                                            <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                                                <img src={delete_icon} alt="Delete" title="Delete" 
                                                //onClick={()=>openModalToDelete({task_name:task.task_title, task_id:task.circuit_task_info_id})}
                                                />
                                            </button>
                                        </td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
            {openEmployeeModal && openEmployeeModal === "create" && 
                <EmployeeModal 
                    setOpenEmployeeModal={setOpenEmployeeModal}
                    getEmployees={getEmployees}/>}
        </div>
    )
}

export default EmployeeList