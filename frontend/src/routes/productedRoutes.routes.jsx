import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../store/usersStore/user.selector"

const ProtectedRoute = () => {

  const user = useSelector(selectCurrentUser)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute