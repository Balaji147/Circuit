import { useState, useContext } from "react"
import hideEye_icon from "../icons/hideEye.svg"
import showEye_icon from "../icons/showEye.svg"
import { ErrorInfoContext } from "../contexts/errorHandler.context"
import { api } from "../helpers/axios.config"
import WarningMessage from "../partner/warning.partner"
import {useDispatch} from "react-redux"
import {setUsers} from "../store/usersStore/user.reducer"
import { isValidEmail, isValidString } from "../helpers/format.function"
import { useNavigate } from "react-router"

const AuthCard = ({action})=>{

    const INIT_FIELDS = {name:"", email:"", password:""}
    const [getValues, setGetValues] = useState(INIT_FIELDS)
    const [isPwdShow, setIsPwdShow] = useState(false)
    const endpoint = action === "logon"?"/createUser":"/loginUser"
    const {errorInfo, setErrorInfo, clearErrorInfo} = useContext(ErrorInfoContext)
    const dispatch = useDispatch()
    const navigation = useNavigate()

    const getValuesFunc = (e)=>{
        const {name, value} = e.target
        setGetValues((prev)=>({...prev, [name]:value}))
        setErrorInfo({[name]:""})
    }

    const submitAuthValues = async(e)=>{
        e.preventDefault()
        let warningInfo = {}
        try{
            if(!getValues.name && action === "logon")
                warningInfo.name = "Name can't be empty"
            else if(getValues.name && !isValidString(getValues.name))
                warningInfo.name = "Please give valid name"

            if(!getValues.email)
                warningInfo.email = "Email can't be empty"
            else if(!isValidEmail(getValues.email))
                warningInfo.email = "Please give valid mail id"

            if(!getValues.password)
                warningInfo.password = "Password can't be empty"
            else if(getValues.password.length < 8)
                warningInfo.password = "Password should be atleast 8 character minimum"

            if(Object.keys(warningInfo).length > 0)
            {
                setErrorInfo(warningInfo)
                return
            }
            const createUser = await api.post(`auth${endpoint}`, getValues)
            if(createUser.status === 200){
                clearErrorInfo()
                const getUserValue = await api.get("auth/me")
                if(getUserValue.data.user_data)
                    dispatch(setUsers(getUserValue.data.user_data))
                navigation("/")
            }

        }catch(er){
            setErrorInfo(er.response.data.errorInfo)
        }
    }
    
    return(
        <div className="h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

                {/* Heading */}
                <h1 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                    {action === "signin"?"Welcome Back":"Create your account"}
                </h1>
                <p className="text-sm text-gray-500 text-center mb-6">
                    {action === "logon"?"Join Circuit to start managing your tasks":"Login To continue with your tasks"}
                </p>
                <form onSubmit={submitAuthValues} noValidate>
                    {/* Name */}
                    {action === "logon" && 
                        <>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    name="name"
                                    value={getValues.name}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
                                    onChange={getValuesFunc}
                                />
                                <WarningMessage warning={errorInfo.name}/>
                            </div>
                        </>
                    }

                    {/* Email */}
                    <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="john@email.com"
                        name="email"
                        value={getValues.email}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        onChange={getValuesFunc}
                    />
                    <WarningMessage warning={errorInfo.email}/>
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>

                        <div className="relative">
                            <input
                            type={isPwdShow?"password":"text"}
                            placeholder="Enter password"
                            name="password"
                            onChange={getValuesFunc}
                            className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
                            />

                            {/* Eye Icon */}
                            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                                <img src={isPwdShow?showEye_icon:hideEye_icon} alt="" onClick={()=>setIsPwdShow(!isPwdShow)}/>
                            </span>
                            <WarningMessage warning={errorInfo.password}/>
                        </div>
                    </div>
                    <WarningMessage warning={errorInfo.all}/>
                    {/* Register Button */}
                    <button className="w-full py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition">
                        {action === "logon"?"Register":"Login"}
                    </button>

                    {/* Login Option */}
                    <p className="text-sm text-gray-600 text-center mt-6">
                        {action === "logon"?"Already have an account? ":"Don't have an Account? "}
                        <a href={action === "logon"?"login":"logon"} className="text-gray-900 font-medium hover:underline">
                            {action === "logon"?"Log in":"Register"}
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default AuthCard