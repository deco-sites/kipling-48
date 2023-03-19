import { useState, useContext  } from "preact/hooks";
import { ChooserContext } from "../Contexts/ChooserContext.tsx";

const sizes = [
  {
    size: "Pequeno",
    description: "Carregar lápis e canetas, talvez um celular",
    image: ''
  },
  {
    size: "Médio",
    description: "Adoro andar com cadernos, agenda e pastinhas",
    image: ''
  },
  {
    size: "Grande",
    description:
      "Não vivo longe do meu laptop, preciso levar ele e seus gadgets",
      image: ''
  },
  {
    size: "Gigante",
    description: "Sou protagonista da minha vida, viajo muito!",
    image: ''
  },
];

const StartChoosePage = () => {
  const [selected, setSelected] = useState({ size: "", description: "", image: '' });
  const [chooserState, setChooseState] = useContext(ChooserContext)

  return (
    <div className="w-full flex flex-col gap-5 p-6">
      <div className="w-full flex flex-col items-center">
        <h1 className="h-8 w-8 rounded-full bg-gray-700 text-white font-bold flex justify-center items-center">
          1
        </h1>
        <h6 className="text-gray uppercase font-bold">Escolha o tamanho</h6>
      </div>
      <div className="flex justify-between">
        <div className="bg-gray-700 p-7 w-full rounded-md text-white">
          {selected.description}
        </div>
        <div>
            { selected.image && <img
            src="https://cdn-icons-png.flaticon.com/512/474/474471.png"
            style={{ maxWidth: 100 }}
            alt="mala"
          /> }
          
        </div>
      </div>
      <div>
        <div className="flex gap-4 justify-center">
          {sizes.map((size) => {
            return (
              <div>
                <button className="bg-white font-bold px-4 py-2 rounded-xl border" onClick={()=>setSelected(size)}>
                  { size.size }
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-green-700 text-white font-bold px-4 py-2 rounded-xl border" onClick={()=>setChooseState({...chooserState, page: 1})}>Próximo</button>
      </div>
    </div>
  );
};

export default StartChoosePage;
