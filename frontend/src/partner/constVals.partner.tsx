import type { NameValuesInterface } from "../types/filter.types"

export const statusValues:NameValuesInterface[] = [
    {value:"", name:""},
    {value:"todo", name:"TODO"},
    {value:"in_progress", name:"IN PROGRESS"},
    {value:"done", name:"DONE"}
]

export const levelValues:NameValuesInterface[] = [
    {value:"", name:""},
    {value:"low", name:"LOW"},
    {value:"medium", name:"MEDIUM"},
    {value:"high", name:"HIGH"}
]

export const pageCnts:NameValuesInterface[] = [
    {value:1, name:1},
    {value:2, name:2},
    {value:3, name:3},
    {value:5, name:5},
    {value:10, name:10},
    {value:30, name:30},
]

export const allowedGenders:NameValuesInterface[] = [
    {value:"M", name:"Male"},
    {value:"F", name:"Female"},
    {value:"O", name:"Others"},
    {value:"N", name:"Prefer To Not Specify"},
]