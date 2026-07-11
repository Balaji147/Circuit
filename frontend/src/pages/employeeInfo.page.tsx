import { Header } from "../components/header.component"
import employees_icon from "../icons/employee_icon.svg"

const EmployeeInfo = ()=>{
    return(
        <div>
            <Header icon={employees_icon} title="Your Info"/>
            Employee
        </div>
    )
}

export default EmployeeInfo