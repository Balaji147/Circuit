import ComboBox from "./comboBox.component"
import { levelValues, statusValues } from "../partner/constVals.partner"

const Filters = ({onFilterChange, value})=>{
    return(
        <div className="w-full bg-white rounded-xl shadow border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Status Filter */}
                <div className="flex flex-col w-full sm:w-48">
                    <ComboBox label={"Status"} comboValues={statusValues} onChangeVal={onFilterChange} value={value.Status}/>
                </div>

                {/* Priority Filter */}
                <div className="flex flex-col w-full sm:w-48">
                    <ComboBox label={"Priority"} comboValues={levelValues} onChangeVal={onFilterChange} value={value.Priority}/>
                </div>
                
                {/* Task Id */}
                <div className="flex flex-col w-full sm:w-48">
                    <label htmlFor={"sr_name"} className="block text-sm font-medium text-gray-700 mb-1 capitalize">Task Name</label>
                    <input type="text" id="sr_name" onChange={onFilterChange} value={value.sr_name} name="sr_name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 
                    bg-white text-gray-800 focus:outline-none 
                    focus:ring-2 focus:ring-gray-800"
                    />
                </div>
            </div>
        </div>
    )
}

export default Filters