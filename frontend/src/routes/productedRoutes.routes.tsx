import { Navigate, Outlet } from "react-router-dom"
import { selectCurrentUser } from "../store/usersStore/user.selector"
import { useAppSelector } from "../hooks/hooks"

const ProtectedRoute = () => {

  const user = useAppSelector(selectCurrentUser)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute