import ChooserContextProvider, {
  ChooserContext,
} from "./Contexts/ChooserContext.tsx";
import ColorChoosePage from "./pages/color.tsx";
import StartChoosePage from "./pages/start.tsx";
import { useContext } from "preact/hooks"

function Paginator() {
  const [chooserState, setChooserState] = useContext(ChooserContext);

  return (
    <>
        {chooserState.page == 0 && <StartChoosePage />}
        {chooserState.page == 1 && <ColorChoosePage />}
    </>
  );
}

export default Paginator;
