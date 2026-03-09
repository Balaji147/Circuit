import { NavLink, Outlet } from "react-router"
import hamburger from "../icons/hamburger_icon.svg"
import dashboard_icon from "../icons/dashboard_icon.svg"
import task_icon from "../icons/task_icon.svg"
import add_icon from "../icons/add_icon.svg"
import circute from "../assets/circuit_logo.png"
import OptionCard from "../components/optioncard.component"
import close_icon from "../icons/close_icon.svg"
import { useState } from "react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../store/usersStore/user.selector"
import FormModal from "../components/modal.component"

const Navigation = ()=>{

    const [isOptCardOpen, setIsOptCardOpen] = useState(false)
    const selectUser = useSelector(selectCurrentUser)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return(
        <>
  <nav className="w-full bg-white border-b shadow-sm">
    <div className="w-full px-3 sm:px-4 py-3 grid grid-cols-3 items-center">

      {/* Left - Logo */}
      <div className="flex items-center">
        <NavLink to="/">
          <img
            src={circute}
            alt="Circuit"
            className="h-8 sm:h-9 md:h-10 w-auto"
          />
        </NavLink>
      </div>

      {/* Center - Navigation Icons */}
      <div className="flex items-center justify-center gap-5 sm:gap-6">
        {selectUser && (
          <>
            <NavLink to="/">
              <img
                src={dashboard_icon}
                alt="Dashboard"
                className="h-6 sm:h-7 md:h-8 w-auto"
              />
            </NavLink>

            <NavLink to="/userTasks">
              <img
                src={task_icon}
                alt="Task Details"
                className="h-6 sm:h-7 md:h-8 w-auto"
              />
            </NavLink>
          </>
        )}
      </div>

      {/* Right - Actions */}
      <div className="flex items-center justify-end gap-3">

        {selectUser && (
          <button
            className="flex items-center justify-center"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={add_icon}
              alt="Add Task"
              className="h-6 sm:h-7 md:h-8 w-auto"
            />
          </button>
        )}

        <button
          className="flex items-center justify-center"
          onClick={() => setIsOptCardOpen(!isOptCardOpen)}
        >
          <img
            src={isOptCardOpen ? close_icon : hamburger}
            alt={isOptCardOpen ? "Close Option" : "Open Option"}
            className="h-6 sm:h-7 md:h-8 w-auto"
          />
        </button>

      </div>

    </div>
  </nav>

  {isOptCardOpen && <OptionCard />}

  <Outlet />

  {isModalOpen && (
    <FormModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    />
  )}
</>
    )
}

export default Navigation