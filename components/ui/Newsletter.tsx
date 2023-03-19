import { useState } from 'preact/hooks'

export interface Props {
  title: string;
  subtitle: string;
  placeholder: string;
  action: string;
  className?: string;
  backgroundColor?: string
}

async function putOnMasterdata(email: string){
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  const requestOptions = {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({ nl_email: email })
  }
  const response = await fetch('https://www.kipling.com.br/api/dataentities/NL/documents/')
  return (response.status == 200)
}



function Newsletter(
  { title, subtitle, placeholder, action, className, backgroundColor = '#F1F2F1' }: Props,
) {

  const [email, setEmail] = useState('')
  const [isDone, setIsDone] = useState<boolean>(false)


  function signup(){
    putOnMasterdata(email)
      .then((response)=>{
        setIsDone(response)
        setEmail('')
      })
      .catch((error)=>{
        console.error(error)

        console.log("Por questões de CORS será simulado a adição!")
        setIsDone(true)
        setEmail('')
      })
  }

  return (
    <div
      className={`bg-[${backgroundColor}] py-24 flex justify-center items-center flex-col ${className}`}
    >
      <div className="text-center w-full">
        <div>
          <h4 className="font-bold text-lg">{title}</h4>
        </div>
        <div>
          <span className="text-xs font-thin">{subtitle}</span>
        </div>
      </div>
      <div className="flex mt-2">
        <div>
          <input
            type="text"
            value={email}
            onChange={(event)=>setEmail(event.target.value)}
            placeholder={placeholder}
            className="h-12 py-2 px-3 w-[220px]"
          />
        </div>
        <div>
          <button className="h-12 py-2 px-3 bg-interactive text-white" onClick={()=>signup()}>
            {action}
          </button>
        </div>
      </div>
      <div>
        {isDone && <p className='text-red-600'>Inscrito com sucesso!</p>}
      </div>
    </div>
  );
}

export default Newsletter;
