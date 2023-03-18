import Image from "deco-sites/std/components/Image.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";

import ProductSelector from "./ProductVariantSelector.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <Text variant="heading-2">Página não encontrada</Text>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function Details({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    image: images,
    name,
    gtin,
    sku,
  } = product;
  const { price, listPrice, seller, installments } = useOffer(offers);
  const [front, back] = images ?? [];

  return (
    <Container class="py-0 sm:py-10">
      <div class="flex flex-col gap-4 sm:flex-row sm:gap-10">
        {/* Image Gallery */}
        <div class="flex flex-row overflow-auto snap-x snap-mandatory scroll-smooth sm:gap-2">
          {[front, back ?? front].map((img, index) => (
            <Image
              style={{ aspectRatio: "360 / 500" }}
              class="snap-center min-w-[100vw] sm:min-w-0 sm:w-auto sm:h-[600px]"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={img.url!}
              alt={img.alternateName}
              width={360}
              height={500}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>
        {/* Product Info */}
        <div class="flex-auto px-4 sm:px-0">
          {/* Code and name */}
          <div class="mt-4 sm:mt-8">
            {/* Product name and favorite button*/}
            <div class="flex flex-row">
              <h1 class="w-48">
                <Text variant="heading-3">{name}</Text>
              </h1>
              <Button variant="tertiary" class="w-48">
                <Icon id="Heart" width={20} height={20} strokeWidth={2} />
                {" "}
              </Button>
            </div>
            {/* Product rating */}
            <div>
              <Text tone="subdued" variant="caption">
                ***** 5.0/5 - 1 Opiniões
              </Text>
            </div>
            <div>
              <Text tone="subdued" variant="caption">
                SKU {sku}
              </Text>
            </div>
          </div>
          {/* Prices */}
          <div class="mt-4">
            <div class="flex flex-row gap-2 items-center">
              <Text
                class="line-through"
                tone="subdued"
                variant="list-price"
              >
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </Text>
              <Text tone="price" variant="heading-3">
                {formatPrice(price, offers!.priceCurrency!)}
              </Text>
            </div>
            <Text tone="subdued" variant="caption">
              {installments}
            </Text>
          </div>
          {/* Sku Selector */}
          <div class="mt-4 sm:mt-6">
            <ProductSelector product={product} />
          </div>

          {/* Add to Cart and Favorites button */}
          <div class="mt-4 sm:mt-10 flex flex-col gap-2">
            {seller && (
              <div class="flex">
                <div>
                  <QuantitySelector quantity={1} />
                </div>
                <div class="ml-2">
                  <AddToCartButton
                    skuId={productID}
                    sellerId={seller}
                  />
                </div>
              </div>
            )}
          </div>
          {/* Description card */}
          <div class="mt-4 sm:mt-6">
            <Text variant="caption">
              {description && (
                <div>
                  <h4>Descrição</h4>
                  <div class="ml-2 mt-2">{description}</div>
                </div>
              )}
            </Text>
          </div>
        </div>
      </div>
    </Container>
  );
}

function ProductDetails({ page }: Props) {
  if (page) {
    return <Details page={page} />;
  }

  return <NotFound />;
}

export default ProductDetails;
