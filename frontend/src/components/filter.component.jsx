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

            </div>
        </div>
    )
}

export default Filters