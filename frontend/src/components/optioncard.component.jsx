import { useDispatch, useSelector } from "react-redux"
import { setLogoutUser } from "../store/usersStore/user.reducer"
import { selectCurrentUser } from "../store/usersStore/user.selector"
import { api } from "../helpers/axios.config"
import { useNavigate } from "react-router"
const OptionCard = ()=>{

    const dispatch = useDispatch()
    const selectUser = useSelector(selectCurrentUser)
    const navigation = useNavigate()
    const logoutHandler = async()=>{
        await api.post("auth/logout")
        dispatch(setLogoutUser())
        navigation("/login")
    }
    return(
        <div className="absolute top-14 lg:top-16 right-1 sm:right-4">
            <div className="w-40 sm:w-44 bg-white rounded-xl shadow-lg border border-gray-200 p-2 text-gray-800">
                {!selectUser ? 
                    (
                    <>
                        <a
                        href="/logon"
                        className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 transition"
                        >
                            Register
                        </a>
                        <a
                        href="/login"
                        className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 transition"
                        >
                        Log In
                        </a>
                    </>
                    ):
                    <>
                    <div className="px-4 py-2 text-sm text-gray-600">
                        Welcome {selectUser?.user_name}
                    </div>

                    <div className="border-t border-gray-200 my-1"></div>

                    <button
                        className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-gray-100 transition"
                        onClick={logoutHandler}
                    >
                        Log Out
                    </button>
                    </>
                }
            </div>
        </div>
    )
}

export default OptionCard