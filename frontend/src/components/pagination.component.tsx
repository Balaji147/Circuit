type pageNumbers = {
    pageNumbers:number[]
}

export const PaginationTags = ({pageNumbers}:pageNumbers)=>{
    return(
        <div className="flex items-center justify-center gap-2 mt-auto pt-6">
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className="
                    h-10 w-10
                    rounded-lg
                    border border-gray-200
                    bg-white
                    text-gray-700
                    font-medium
                    shadow-sm
                    hover:bg-gray-50
                    hover:border-gray-300
                    transition-all
                    duration-200
                    mb-2"
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    )
}