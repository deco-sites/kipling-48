import ChooserContextProvider from "./Contexts/ChooserContext.tsx"
import ColorChoosePage from "./pages/color.tsx"
import StartChoosePage from "./pages/start.tsx"
import Paginator from "./paginator.tsx"

export interface Props {
    title: string
    subtitle: string
}

function Chooser({ title, subtitle }: Props){



  return (
    <div className="w-full px-4 py-4 bg-footer">
        <div>
            <div>
                <h4 className="text-gray-700 font-bold text-center text-2xl Kipling uppercase">{ title }</h4>
            </div>
            <div className="mt-2">
                <h6 className="text-gray-700 font-thin text-center Kipling uppercase">{ subtitle }</h6>
            </div>
        </div>
        <hr />
        <div>
            <ChooserContextProvider>
                <Paginator/>
            </ChooserContextProvider>
        </div>
    </div>
  )
}

export default Chooser