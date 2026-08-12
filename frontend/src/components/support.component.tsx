import { capitalizeFullWord } from "../helpers/format.function"

export const StatusComponent = ({taskLevel})=>{
    console.log("fsd", taskLevel)
    let colorCode = "bg-green-100 text-green-700"
    if(taskLevel === "medium")
        colorCode = "bg-amber-100 text-amber-700"
    else if(taskLevel === "high")
        colorCode = "bg-red-100 text-red-700"
    return(
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${colorCode}`}>
            {capitalizeFullWord(taskLevel)}
        </span>
    )
}