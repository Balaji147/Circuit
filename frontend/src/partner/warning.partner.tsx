interface WarningMessageType{warning: string}
const WarningMessage = ({warning}:WarningMessageType)=>{
    return(
        <div>
            <h6 className="text-[#f00]">{warning}</h6>
        </div>
    )
}

export default WarningMessage