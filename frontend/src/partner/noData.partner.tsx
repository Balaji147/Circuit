interface NoDataInterface{
    icon:string
    title:string
    desc:string
}

export const NoData = ({icon, title, desc}:NoDataInterface)=>{
    return(
        <div className="flex flex-col items-center justify-center py-16 px-4">                         
            <img
                src={icon}
                alt={"No Data Found"}
                className="w-48 h-48 object-contain mb-6"
            />

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {title}
            </h2>

            <p className="max-w-md text-center text-gray-500 leading-relaxed">
                {desc}
            </p>
        </div>
    )
}