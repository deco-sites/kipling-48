import { ImageObject } from "https://denopkg.com/deco-sites/std@0.1.4/commerce/types.ts";
import { useState } from 'preact/hooks'
import Slider from "$store/components/ui/Slider.tsx";



export default function ProductImages({ productImages }: { productImages: ImageObject[] }) {

    const [imageSelected, setImageSelected] = useState<ImageObject>(productImages[0])
  
    return (
      <div className="w-full md:max-w-[60%]">
        <div className="w-[635] h-[635] flex justify-center hover:overflow-hidden">
          <img
            src={imageSelected.url}
            alt={imageSelected.alternateName}
            className="hover:scale-150"
            style={{
              width: 635,
              height: 635
            }}
          />
        </div>
        <div className="px-2 py-1">
            <Slider>
              { productImages.map((imageOfProduct)=>{
                return (
                  <button className="border" onClick={()=>setImageSelected(imageOfProduct)}>
                    <img src={imageOfProduct.url} alt={imageOfProduct.alternateName} />
                  </button>
                )
              }) }
            </Slider>
        </div>
      </div>
    );
  }