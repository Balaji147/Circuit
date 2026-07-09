import ComboBox from "./comboBox.component"
import { levelValues, statusValues, pageCnts } from "../partner/constVals.partner"
import type{ FiltersProps  } from "../types/filter.types"

const Filters = ({onFilterChange, filterModes, tag="task", otherInfo={}}:FiltersProps<HTMLSelectElement | HTMLInputElement>)=>{
    
    const [label, count] = Object.entries(otherInfo)[0] || []
    return(
        <div className="w-full bg-white rounded-xl shadow border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {tag === "task" ? 
                    <>
                        <div className="flex flex-col w-full sm:w-48">
                            <ComboBox label={"Status"} comboValues={statusValues} onChangeVal={onFilterChange} comboValue={filterModes?.Status}/>
                        </div>
                        <div className="flex flex-col w-full sm:w-48">
                            <ComboBox label={"Priority"} comboValues={levelValues} onChangeVal={onFilterChange} comboValue={filterModes?.Priority}/>
                        </div>
                        {/* <div className="flex flex-col w-20 sm:w-48">
                            <ComboBox label={"Data per Page"} comboValues={pageCnts} onChangeVal={onFilterChange} value={value.Priority}/>
                        </div> */}
                        <div className="flex flex-col w-full sm:w-48">
                            <label htmlFor={"sr_name"} className="block text-sm font-medium text-gray-700 mb-1 capitalize">Task Name</label>
                            <input type="text" id="sr_name" onChange={onFilterChange} value={filterModes?.sr_name} name="sr_name"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                            bg-white text-gray-800 focus:outline-none 
                            focus:ring-2 focus:ring-gray-800"
                            />
                        </div>

                        <div className="ml-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2
                                rounded-full bg-indigo-50 border border-indigo-100">
                                
                                <span className="text-sm font-medium text-indigo-600">
                                    {label}
                                </span>

                                <span className="flex items-center justify-center
                                    min-w-8 h-8 px-2 rounded-full
                                    bg-indigo-600 text-white font-bold">
                                    {count}
                                </span>
                            </div>
                        </div>
                    </>:
                    <div className="flex flex-col w-full sm:w-48">
                            <label htmlFor={"emp_name"} className="block text-sm font-medium text-gray-700 mb-1 capitalize">Employee Name</label>
                            <input type="text" id="emp_name" onChange={onFilterChange} value={filterModes?.emp_name} name="emp_name"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                            bg-white text-gray-800 focus:outline-none 
                            focus:ring-2 focus:ring-gray-800"
                            />
                    </div>
                }
            </div>
        </div>
    )
}

export default Filters