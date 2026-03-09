import { useDispatch } from "react-redux";
import { api } from "../helpers/axios.config";
import { fetchTaskList } from "../store/tasksStore/tasks.reducer";

const ConfirmModal = ({ message, setIsModalOpen, taskData, setDataToDlt }) => {
    const dispatch = useDispatch()
    const deleteTheTaskHandle = async()=>{
        const deleteTheTask = await api.delete(`tasks/deleteTask/${taskData.task_id}`)
        if(deleteTheTask.status === 200)
        {
            dispatch(fetchTaskList())
            setIsModalOpen(false)
            setDataToDlt(null)
        }
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-4 z-50">

      <div className="w-full max-w-sm bg-white rounded-xl shadow-xl border border-gray-200 p-6">

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Confirmation
        </h3>

        {/* Message */}
        <p className="text-sm text-gray-700 mb-6">
          {message}
          <span className="text-gray-800 px-2">
            "{taskData.task_name}"
          </span>
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">

          <button
            // onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            onClick={()=>{setIsModalOpen(false);setDataToDlt(null)}}
          >
            Cancel
          </button>

          <button
            // onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            onClick={deleteTheTaskHandle}
          >
            Confirm
          </button>

        </div>

      </div>
    </div>
  )
}

export default ConfirmModal