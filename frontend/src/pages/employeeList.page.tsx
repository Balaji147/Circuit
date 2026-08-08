import { Header } from "../components/header.component"
import employees_icon from "../icons/employee_icon.svg"
import add_icon from "../icons/add_icon.svg"
import React, { useEffect, useState } from "react"
import Filters from "../components/filter.component"
import { api } from "../helpers/axios.config"
import { useNavigate } from "react-router"
import { dataFormat, capitalizeWords } from "../helpers/format.function"
import type { NullAllowedType } from "../types/common.types"
import EmployeeModal from "../components/employeeModal.component"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import type {EmployeesInterface} from "../types/employees.types"
import { fetchEmployeesInfo } from "../store/employeesStore/employees.reducer"
import { selectEmployeesList } from "../store/employeesStore/employees.selector"

type EmployeeModalType = NullAllowedType<string>

interface EmployeesListInterface {
    circuit_users_auth_id:number,
    index_no:number,
    name_of_user:string,
    user_role:string,
    employee_id:string,
    user_mailid:string,
    user_designation:string,
    created_at:string,
    userInfo:EmployeesInterface
}

type EmpName = {emp_name:string}

const EmployeeList = ()=>{
    
    // const [employeesList, setEmployeesList] = useState<EmployeesListInterface[]>([])
    const [openEmployeeModal, setOpenEmployeeModal] = useState<EmployeeModalType>(null)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [filterMode, setFilterMode] = useState<EmpName>({emp_name:""})

    useEffect(()=>{
        dispatch(fetchEmployeesInfo())
    },[])

    const employeesData = useAppSelector(selectEmployeesList)
    console.log("data",employeesData)
    // const getEmployees = async()=>{
    //     const employees = await api.get("employees/getEmployeesList", {params:filterMode})
    //     if(employees)
    //         setEmployeesList(employees.data.rows)
    // }
    // useEffect(()=>{
    //     getEmployees()
    // },[filterMode])

    const onFilterChange = (elm:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const {name, value} = elm.currentTarget
        setFilterMode((prev)=>({...prev, [name]:value}))
    }
    
    const onNavigate = (navId)=>{
        navigate(`/employeeInfo/${navId}`)
    }

    const openModalFunc = ()=>{
        setOpenEmployeeModal("create")
    }
    
    return(
        <div>
            <Header icon={employees_icon} title={"Employees List"} extra_icon={add_icon} iconOnClick={openModalFunc}/>
            {employeesData?.length > 0 &&
                <>
                    <Filters onFilterChange={onFilterChange} filterModes={filterMode} tag="emp"/>
                    <div className="w-full overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
                        <table className="w-full text-sm text-left">
                            {/* Header */}
                            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-6 py-3">#</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Employee Id</th>
                                    <th className="px-6 py-3">Mail Id</th>
                                    <th className="px-6 py-3">Designation</th>
                                    <th className="px-6 py-3">Entered At</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {employeesData.map((employee, idx)=>(
                                    <tr className="hover:bg-gray-50 transition" key={employee?.circuit_users_auth_id} onClick={()=>onNavigate(employee?.circuit_users_auth_id)}>
                                        <td className="px-6 py-4 font-medium text-gray-700">{idx+1}</td>
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
                                        <td className="px-6 py-4 text-gray-800">
                                                {employee?.userInfo?.employee_id || "--"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                                                {employee?.user_mailid}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-gray-800">
                                                {capitalizeWords(employee?.userInfo?.user_designation || "--")}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {dataFormat(employee?.created_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            }
            {/* {openEmployeeModal && openEmployeeModal === "create" && 
                <EmployeeModal 
                    setOpenEmployeeModal={setOpenEmployeeModal}
                    getEmployees={getEmployees}/>} */}
        </div>
    )
}

export default EmployeeList