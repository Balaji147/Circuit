import type React from "react";

interface SummaryCardProp{
    Count:number;
    Content:string;
    onClickFunc?:()=>void
}
const SummaryCard = ({Count, Content, onClickFunc}:SummaryCardProp)=>{
    return(
        <div className="bg-white rounded-xl shadow-md border border-gray-200 
        min-h-[200px] flex flex-col justify-center items-center p-6 text-center" onClick={onClickFunc}>
            <div className="text-3xl font-semibold text-gray-800">{Count}</div>
            <div className="text-sm text-gray-500 mt-2">{Content}</div>
        </div>
    )
}

export default SummaryCard