const SummaryCard = ({Count, Content})=>{
    return(
        <div className="bg-white rounded-xl shadow-md border border-gray-200 
        min-h-[200px] flex flex-col justify-center items-center p-6 text-center">
            <div className="text-3xl font-semibold text-gray-800">{Count}</div>
            <div className="text-sm text-gray-500 mt-2">{Content}</div>
        </div>
    )
}

export default SummaryCard