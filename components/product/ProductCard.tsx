import Image from "deco-sites/std/components/Image.tsx";
import Text from "$store/components/ui/Text.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { useSignal } from "@preact/signals";

/**
 * A simple, inplace sku selector to be displayed once the user hovers the product card
 * It takes the user to the pdp once the user clicks on a given sku. This is interesting to
 * remove JS from the frontend
 */
function Sizes(product: Product) {
  const possibilities = useVariantPossibilities(product);
  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ?? {},
  );

  return (
    <ul class="flex justify-center items-center gap-2">
      {options.map(([url, value]) => (
        <a href={url}>
          <Avatar
            class="bg-default"
            variant="abbreviation"
            content={value}
            disabled={url === product.url}
          />
        </a>
      ))}
    </ul>
  );
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;
}

function ProductCard({ product, preload }: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
  } = product;

  const [front, back] = images ?? [];
  const { listPrice, price, seller, installments } = useOffer(offers);
  const discount = price && listPrice ?  Math.ceil(100-((price*100)/listPrice)) : 0


  return (
    <div
      id={`product-card-${productID}`}
      class="w-full group bg-white relative hover:scale-110"
    >
      <a href={url} aria-label="product link">
        <div class="relative w-full">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={247}
            height={247}
            class="rounded w-full group-hover:hidden"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            sizes="(max-width: 640px) 50vw, 20vw"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={247}
            height={247}
            class="rounded w-full hidden group-hover:block"
            sizes="(max-width: 640px) 50vw, 20vw"
          />
          {seller && (
            <div
              class="absolute bottom-0 hidden sm:group-hover:flex flex-col gap-2 w-full p-2 bg-opacity-10"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(2px)",
              }}
            >
              <Sizes {...product} />
            </div>
          )}
        </div>

        <div class="flex flex-col gap-1 py-2">
          <Text
            class="overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-lg"
            variant="body"
          >
            {name}
          </Text>
          <div class="flex flex-col items-center gap-2">
            <Text
              className="line-through text-xs"
              tone="subdued"
            >
              {formatPrice(listPrice, offers!.priceCurrency!)}
            </Text>
            <Text variant="body" className="text-red-600 text-lg" tone="price">
              {formatPrice(price, offers!.priceCurrency!)}
            </Text>
            <Text variant="body" tone="price" className="text-sm text-red-400">
              Ou 6x de {formatPrice(price/6, offers!.priceCurrency!)}
            </Text>
          </div>
        </div>
      </a>
      { !!discount && <p className="bg-gray-100 text-red-600 font-thin px-3 py-1 absolute top-[8px] left-0">-{ discount }%</p> }
      { !!discount && <p className="bg-red-600 text-white font-thin px-3 py-1 absolute top-[44px] left-0">SALE</p> }
    </div>
  );
}

export default ProductCard;
