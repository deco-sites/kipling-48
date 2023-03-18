import { IS_BROWSER } from "https://deno.land/x/fresh@1.1.3/runtime.ts"
import { useEffect } from "preact/hooks"

const headerChanger = () => {

    useEffect(()=>{
        if(IS_BROWSER){
            window.document.addEventListener('scroll', function(){
                if(window.pageYOffset > 54){
                  window.document.querySelector('#logo-header-open')?.classList.add('hidden')
                  window.document.querySelector('#logo-header-close')?.classList.remove('hidden')
                  window.document.querySelector('#alert-top-page')?.classList.add('hidden')
                }else{
                  window.document.querySelector('#logo-header-open')?.classList.remove('hidden')
                  window.document.querySelector('#alert-top-page')?.classList.remove('hidden')
                  window.document.querySelector('#logo-header-close')?.classList.add('hidden')
                }
            })
        }
    },[])


  return (
    <div></div>
  )
}

export default headerChanger