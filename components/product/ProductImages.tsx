import { useState } from "preact/hooks";
import Slider from "$store/components/ui/Slider.tsx";
import Image from "deco-sites/std/components/Image.tsx";

export default function ProductImages(
  { productImages }: { productImages: ImageObject[] },
) {
  const [imageSelected, setImageSelected] = useState<ImageObject>(
    productImages[0],
  );

  return (
    <div className="w-full md:max-w-[60%]">
      <div className="w-[635] h-[635] flex justify-center hover:overflow-hidden">
        <img
          src={imageSelected.url}
          alt={imageSelected.alternateName}
          className="hover:scale-150"
          height={64}
          width={64}
          style={{
            width: 635,
            height: 635,
          }}
        />
      </div>
      <div className="px-2 py-1">
        <Slider>
          {productImages.map((imageOfProduct) => {
            return (
              <button
                className="border"
                onClick={() => setImageSelected(imageOfProduct)}
              >
                <Image
                  src={imageOfProduct.url}
                  alt={imageOfProduct.alternateName}
                  width={64}
                  height={64}
                  class="rounded w-full group-hover:hidden"
                />
              </button>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
