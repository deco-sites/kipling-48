export type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "https://deno.land/x/fresh@1.1.3/runtime.ts";

export interface IStories {
  image: LiveImage;
  previewImage: LiveImage;
  productURL: string;
  productName: string;
}

export interface Props {
  title: string;
  stories: IStories[];
}

function Story({ title, stories }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selected, setSelected] = useState<IStories | null>(null);

  useEffect(() => {
    setSelected(stories[selectedIndex]);
  }, [selectedIndex]);

  function handleClose() {
    setIsOpen(false);
  }

  function next() {
    if ((selectedIndex + 1) == stories.length) {
      setIsOpen(false);
      setSelected(null);
      setSelectedIndex(0);
    } else {
      setSelectedIndex(selectedIndex + 1);
    }
  }

  function prevous() {
    if ((selectedIndex - 1) == 0) {
      setIsOpen(false);
      setSelected(null);
      setSelectedIndex(0);
    } else {
      setSelectedIndex(selectedIndex - 1);
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold ml-2">
          {title}
        </h1>
        <hr />
        <br />
      </div>
      <div className="flex gap-5 px-3">
        {stories.map((story: IStories, index) => {
          return (
            <button
              onClick={() => {
                setIsOpen(true);
                setSelected(story);
                setSelectedIndex(index);
              }}
            >
              <Preview imageUrl={story.previewImage} alt={story.productName} />
            </button>
          );
        })}
        {isOpen && (
          <StoryOpen
            storyUrl={selected?.image}
            description={selected?.productName}
            productUrl={selected?.productURL}
            handlePrevous={prevous}
            handleNext={next}
            handleClose={handleClose}
          />
        )}
      </div>
      <br />
      <hr />
    </div>
  );
}

function StoryOpen(
  { storyUrl, description, productUrl, handleNext, handlePrevous, handleClose },
) {
  const duration = 100000; // miliseconds
  const [currentPercentage, setCurrentPercentage] = useState(1);

  function next() {
    handleNext();
    setCurrentPercentage(0);
  }

  function prevous() {
    handlePrevous();
    setCurrentPercentage(0);
  }

  useEffect(() => {
    if (currentPercentage < 100) {
      const time = setInterval(
        () => setCurrentPercentage(currentPercentage + 0.5),
        duration / 200,
      );
      return () => clearInterval(time);
    } else {
      prevous();
    }
  }, [currentPercentage]);

  return (
    <div
      className="fixed top-0 left-0 z-[9999999] w-full h-full flex justify-center items-center bg-[rgba(35,255,01,0.1)]"
      style={{
        backdropFilter: "blur(2px)",
      }}
    >
      <button
        className="absolute md:relative h-full left-0 z-[999] md:h-[70px] w-[70px] md:bg-white rounded-full mr-3 md:border flex justify-center items-center"
        onClick={() => prevous()}
      >
        <Icon id="ChevronLeft" width={45} height={45} strokeWidth={1} className="hidden md:visible" />
      </button>
      <div className="w-full h-full md:h-[90vh] md:w-[320px] bg-white shadow-lg rounded-md overflow-hidden relative">
        <div className="absolute z-[9999] w-full px-3 py-4">
          <div className="w-full bg-gray-200 rounded-full h-[6px]">
            <div
              className="bg-gray-700 h-[6px] rounded-full"
              style={{ width: `${currentPercentage}%` }}
            >
            </div>
          </div>
        </div>
        <Image
          class="p-6"
          src={storyUrl}
          alt={description}
          width={1080}
          height={1920}
          loading="lazy"
        />
        <ProductData productSlug={productUrl} description={description}/>
      </div>
      <button
        className="absolute md:relative h-full right-0 z-[99999] md:h-[70px] w-[70px] md:bg-white rounded-full ml-3 md:border flex justify-center items-center"
        onClick={() => next()}
      >
        <Icon id="ChevronRight" width={45} height={45} strokeWidth={1} className="hidden md:visible" />
      </button>

      <button
        className="h-[45px] bg-white rounded-md ml-3 border px-3 flex justify-center items-center fixed top-[32px] right-[32px]"
        onClick={() => handleClose()}
      >
        Fechar
      </button>
    </div>
  );
}

async function getProductDataBySlug(slug: string, description: string){
  const data = await fetch(`https://www.kipling.com.br/api/catalog_system/pub/products/search${slug}`, {
    mode: 'no-cors'
  })
  const productData = await data.text()
  return JSON.stringify(productData)
}


function ProductData({ productSlug, description }:{ productSlug: string, description: string }) {


  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: ''
  })


  useEffect(()=>{
    if(IS_BROWSER){
      getProductDataBySlug(productSlug)
        .then((productInfo)=>{
          setProduct({
            name: productInfo.productName,
            price: '29900',
            image: productInfo.items[0].images[0].imageUrl
          })
        })
        .catch((error)=>{
          console.log(error)
        })
    }
  },[])





  return (
    <div className="w-[80%] bg-white p-7 radius absolute bottom-[64px] right-0 rounded-tl-[64px] rounded-bl-[64px] flex items-center gap-4">
      { product.image && (
      <div className="h-[64px] w-[64px] rounded-full border">
          <Image
          class="p-6"
          src={product.image}
          alt={product.name}
          width={150}
          height={150}
          loading="lazy"
        />
      </div>
      )}
      <div className="flex flex-col gap-2">
        <h5 className="text-sm">{ product.name || description }</h5>
        <h3 className="text-sm text-red-600">{ product.price }</h3>
        <a href={productSlug} className="bg-gray-700 text-white px-2 py-1 rounded-md font-bold">
          Conferir
        </a>
      </div>
    </div>
  );
}

function Preview({ imageUrl, alt }: { imageUrl: string; alt: string }) {
  return (
    <div className="h-[85px] w-[85px] rounded-full border border-2 border-black overflow-hidden" style={{
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
    </div>
  );
}

export default Story;
