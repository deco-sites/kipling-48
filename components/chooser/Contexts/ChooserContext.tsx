import { createContext } from 'preact'
import { StateUpdater, useState } from "preact/hooks";


export interface chooserContextType {
    page: number,
    url: string
}


const sampleData: chooserContextType = {
    page: 0,
    url: ''
}

export const ChooserContext = createContext<[chooserContextType, StateUpdater<chooserContextType>]>([sampleData, ()=>null])



export default function ChooserContextProvider({ children }: { children: any }){
    
    const chooserState = useState(sampleData)
    
    return (
        <ChooserContext.Provider value={chooserState}>
            { children }
        </ChooserContext.Provider>
    )
}