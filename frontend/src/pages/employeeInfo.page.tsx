import { useEffect } from "react"
import { Header } from "../components/header.component"
import { useParams } from "react-router"
import employees_icon from "../icons/employee_icon.svg"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { fetchEmployeesInfo, setEmployeesInfo } from "../store/employeesStore/employees.reducer"
import { selectEmployeeInfo, selectEmployeesList } from "../store/employeesStore/employees.selector"

const EmployeeInfo = ()=>{
    const dispatch = useAppDispatch()
    const {empID} = useParams()
    useEffect(()=>{
        dispatch(setEmployeesInfo(empID))
    },[empID])
    
    const employeeInfo = useAppSelector(selectEmployeesList)
    console.log("employeeInfo", employeeInfo)

    // const employeeInfo = useAppSelector(selectEmployeeInfo(empID))[0]
     
    return(
        <div>
            <Header icon={employees_icon} title="Your Info" />
            <div className="mt-5 flex flex-col lg:flex-row gap-6 m-5">
                
                <div className="bg-white rounded-2xl shadow border border-gray-200
                        lg:w-80 w-full p-6 flex flex-col items-center">
                    <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-100">
                        <img
                            src={employeeInfo?.userInfo?.employee_profile_pic}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex gap-2">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            {employeeInfo.name_of_user}
                        </h2>
                        {employeeInfo.user_role === "admin" &&
                            <span className="text-sm font-medium text-blue-800 bg-green-200 rounded-xl p-1">Admin</span>
                        }
                    </div>

                    <p className="mt-1 text-gray-500">
                        {employeeInfo?.userInfo?.user_designation}
                    </p>
                </div>

                
                <div className="flex-1 bg-white rounded-2xl shadow border border-gray-200 p-6 overflow-x-auto">
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr className="border-b hover:bg-gray-50 transition-colors">
                                <td className="py-4 font-medium text-gray-500">
                                    Mail
                                </td>
                                <td className="py-4 text-right text-blue-600 break-all">
                                    <a href={`mailto:${employeeInfo?.user_mailid}`}>{employeeInfo?.user_mailid}</a>
                                </td>
                            </tr>
                            
                            <tr className="border-b hover:bg-gray-50 transition-colors">
                                <td className="py-4 font-medium text-gray-500">
                                    Employee ID
                                </td>
                                <td className="py-4 text-right text-gray-800">
                                    {employeeInfo?.userInfo?.employee_id ?? "-"}
                                </td>
                            </tr>

                            <tr className="border-b hover:bg-gray-50 transition-colors">
                                <td className="py-4 font-medium text-gray-500">
                                    Joined Date
                                </td>
                                <td className="py-4 text-right text-gray-800">
                                    {employeeInfo?.userInfo?.onboard_date}
                                </td>
                            </tr>
                            
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 font-medium text-gray-500">
                                    Gender
                                </td>
                                <td className="py-4 text-right text-gray-800">
                                    {employeeInfo?.userInfo?.employee_gender ?? "-"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EmployeeInfo