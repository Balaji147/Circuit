const ComboBox = ({label, comboValues, onChangeVal, value})=>{
    return(
        <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {label}
            </label>

            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 
            bg-white text-gray-800 focus:outline-none 
            focus:ring-2 focus:ring-gray-800"
            name={label}
            value={value || ""}
            onChange={onChangeVal} >
                {comboValues.map(combo=>
                    <option className="text-gray-800" value={combo.value} key={combo.value}>{combo.name}</option>
                )}
            </select>
        </div>
    )
}

export default ComboBox