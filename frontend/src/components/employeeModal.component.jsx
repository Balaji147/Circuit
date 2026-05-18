import { useState, useContext } from "react"
import { ErrorInfoContext } from "../contexts/errorHandler.context"
import WarningMessage from "../partner/warning.partner"
import { api } from "../helpers/axios.config"

const EmployeeModal = ({setOpenEmployeeModal, getEmployees})=>{

    const INIT_VALUES = {
        name:"",
        emp_designation:"",
        email:"",
        password:"",
        admin_ind:false,
        auto_pwd_ind:false
    }

    const [fieldValues, setFieldValues] = useState(INIT_VALUES)
    const { errorInfo, setErrorInfo, clearErrorInfo } = useContext(ErrorInfoContext)
    const [havePassword, setHavePassword] = useState(true)

    const getFieldValues = (elm)=>{
        const {name, value, checked, type} = elm.target
        setFieldValues(prev=>({...prev, [name]:type === "checkbox" ? checked : value}))  

        if(name === "auto_pwd_ind")
        {
            setHavePassword(!checked)
            if(checked) setFieldValues((prev)=>({...prev, password:""}))
        }
    }

    const createEmployeeFunc = async(elm)=>{
        elm.preventDefault()

        let warningInfo = {}
        try{
            if(!fieldValues.name)
                warningInfo.name = "Name Can't be Empty"
            if(!fieldValues.emp_designation)
                warningInfo.emp_designation = "Designation Can't be Empty"
            if(!fieldValues.email)
                warningInfo.email = "Mail Can't be Empty"

            if(!fieldValues.password && havePassword)
                warningInfo.password = "Password Can't be Empty"

            if(Object.keys(warningInfo).length > 0){
                setErrorInfo(warningInfo)
                return
            }

            clearErrorInfo()

            if(fieldValues){
                await api.post(`/employees/insertEmployee`, fieldValues)
                setOpenEmployeeModal(null)
            }
            setOpenEmployeeModal(null)
            setFieldValues(INIT_VALUES)
            getEmployees()
        }catch(er){
            setErrorInfo((prev)=>({...prev, email:er?.response?.data?.warningInfo?.all}))
        }
    }
    console.log("info",errorInfo)
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 
            p-6 sm:p-8 max-h-[90vh] sm:max-h-none overflow-y-auto sm:overflow-visible">

                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-6">
                Add Employee
                </h2>

                <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                noValidate
                onSubmit={createEmployeeFunc}
                >

                    {/* Employee Name */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee Name
                        </label>
                        <input
                        type="text"
                        placeholder="Enter task title"
                        name="name"
                        value={fieldValues.name}
                        onChange={getFieldValues}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                        <WarningMessage warning={errorInfo.name}/>
                    </div>

                    {/* Designation */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee Designation
                        </label>
                        <input
                        type="text"
                        placeholder="Enter task title"
                        name="emp_designation"
                        value={fieldValues.emp_designation}
                        onChange={getFieldValues}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                        <WarningMessage warning={errorInfo.emp_designation}/>
                    </div>

                    {/* Mail */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee Mail Id
                        </label>
                        <input
                        type="text"
                        placeholder="Enter task title"
                        name="email"
                        value={fieldValues.email}
                        onChange={getFieldValues}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                        <WarningMessage warning={errorInfo.email}/>
                    </div>

                    {/* Password */}
                    {havePassword &&
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password to Start
                            </label>
                            <input
                            type="text"
                            placeholder="Enter task title"
                            name="password"
                            value={fieldValues.password}
                            onChange={getFieldValues}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800"
                            />
                            <WarningMessage warning={errorInfo.password}/>
                        </div>
                    }

                    {/* Checkbox */}

                    <div className="md:col-span-2 flex items-center gap-2">
                        <input 
                        type="checkbox" 
                        id="sameAsAdmin"
                        name="admin_ind"
                        checked={fieldValues.admin_ind}
                        onChange={getFieldValues}
                        />
                        <label
                        htmlFor="sameAsAdmin"
                        className="text-sm font-medium text-gray-700"
                        >
                        Same as admin
                        </label>
                    </div>

                    <div className="md:col-span-2 flex items-center gap-2">
                        <input 
                        type="checkbox" 
                        id="autoPwd"
                        name="auto_pwd_ind"
                        checked={fieldValues.auto_pwd_ind}
                        onChange={getFieldValues}
                        />
                        <label
                        htmlFor="autoPwd"
                        className="text-sm font-medium text-gray-700"
                        >
                        Give Random Password
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                        <button
                        type="button"
                        onClick={() => setOpenEmployeeModal(null)}
                        className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                        >
                        Close
                        </button>

                        <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
                        >
                        Save
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EmployeeModal