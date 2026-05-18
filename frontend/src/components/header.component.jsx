import { useSelector } from "react-redux"
import { selectCurrentUser } from "../store/usersStore/user.selector"


export const Header = ({icon, title, extra_icon, iconOnClick=()=>{}})=>{
    const getEmployee = useSelector(selectCurrentUser)
    console.log("emp", getEmployee)
    return(
         <div
            className="w-full py-3 border-b flex items-center gap-2"
            style={{ borderColor: "#e8ba8f", backgroundColor: "#bffff4" }}
            >
            {icon && (
                <img
                src={icon}
                alt={title}
                className="h-5 w-5 ml-4"
                />
            )}

            <span className="text-gray-800 font-medium">
                {title}
            </span>

            {extra_icon && getEmployee.user_role === 'admin' && (
                <img
                src={extra_icon}
                alt={title}
                onClick={iconOnClick}
                className="h-5 w-5 ml-auto mr-4 cursor-pointer"
                />
            )}
            </div>
    )
}