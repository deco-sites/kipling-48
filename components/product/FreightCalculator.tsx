import { useState } from "preact/hooks";
import { formatPrice } from "../../sdk/format.ts";

async function calculateFreight(zipCode: string, productId: string) {

    const headers = new Headers()

    headers.append("Content-Type", "Application/json")

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            items: [{
                id: productId,
                quantity: 1,
                seller: "1"
            }],
            postalcode: zipCode,
            country: "BRA"
        })
    }


    const response = await fetch('https://www.kipling.com.br/api/checkout/pub/orderforms/simulation', requestOptions)
    const json = await response.json()
    return json
}

export default function PDPFreightCalculator({ skuId }: { skuId: string }) {
  const [zipCode, setZipCode] = useState("");
  const [simulations, setSimulations] = useState<any[]>([]);

  function calculate() {
    calculateFreight(zipCode, skuId)
      .then((response) => {
        
      })
      .catch((error) => {
        console.log(error)
        setSimulations([
            {
                price: 1255,
                sla: 'Correios',
                time: '3 Dias'
            }
        ])
      })
  }

  return (
    <div>
      <div className="flex gap-2 items-center">
        <div>
          <span className="text-xs">Calcule o frete:</span>
        </div>
        <div>
          <input type="text" className="border border-gray-400 px-2 py-1" />
        </div>
        <div>
          <button
            className="bg-[#C3C3C3] text-white py-1 px-3"
            onClick={() => calculate()}
          >
            Calcular
          </button>
        </div>
      </div>

      {simulations.length > 0 && (
        <div>
          <table className="w-full">
            <tr>
              <th>
                <span className="text-xs">Valor do frete</span>
              </th>
              <th>
                <span className="text-xs">Disponibilidade</span>
              </th>
            </tr>
            { simulations.map((simu) => {
                return (
                    <tr>
                        <td>{ formatPrice(simu.price, "R$") }</td>
                        <td>{ simu.sla } { simu.time }</td>
                    </tr>
                )
            }) }
          </table>
        </div>
      )}
    </div>
  );
}
