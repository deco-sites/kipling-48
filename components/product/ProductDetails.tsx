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
import ProductImages from "./ProductImages.tsx";
import type {
  ImageObject,
  ProductDetailsPage,
} from "deco-sites/std/commerce/types.ts";

import ProductSelector from "./ProductVariantSelector.tsx";
import { useSignal } from "@preact/signals";
import PDPFreightCalculator from "./FreightCalculator.tsx";

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
  } = product;
  const { price, listPrice, seller, installments } = useOffer(offers);
  const [front, back] = images ?? [];

  return (
    <div>
      <Container class="py-0 sm:py-10">
        <div class="flex flex-col gap-4 sm:flex-row sm:gap-10">
          {/* Image Gallery */}
          <ProductImages productImages={images as ImageObject} />
          {/* Product Info */}
          <div class="flex-auto px-4 sm:px-0">
            {/* Breadcrumb */}
            <Breadcrumb
              itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
            />
            {/* Code and name */}
            <div class="mt-4 sm:mt-8">
              <div className="flex gap-4 items-center">
                <Text className="text-3xl text-thin uppercase">{name}</Text>
                <button>
                  <Icon id="Heart" width={32} height={32} strokeWidth={1} />
                </button>
              </div>

              <div>
                <Text tone="subdued" variant="caption">
                  SKU {product.isVariantOf?.model}
                </Text>
              </div>
            </div>
            {/* Prices */}
            <div class="mt-4">
              <div class="flex flex-row gap-2 items-center">
                <Text
                  class="line-through"
                  tone="subdued"
                  className="text-2xl line-through text-gray-500"
                >
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </Text>
                <Text tone="price" variant="heading-3" className="text-2xl">
                  {formatPrice(price, offers!.priceCurrency!)}
                </Text>
                <Text tone="subdued" variant="caption" className="text-red-600">
                  Ou {installments?.replace(" sem juros", "")}
                </Text>
              </div>
            </div>
            {/* Sku Selector */}
            <div class="mt-4 sm:mt-6">
              <ProductSelector product={product} />
            </div>
            {/* Add to Cart and Favorites button */}
            <div class="mt-4 sm:mt-10 flex gap-2">
              <QuantitySelector />
              {seller && (
                <AddToCartButton
                  skuId={productID}
                  sellerId={seller}
                />
              )}
            </div>
            <div className="my-4 flex gap-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                height={26}
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="text-sm kiping">
                Entrega grátis de R$699,00 | Primeira Troca Grátis
              </p>
            </div>
            <div className="">
              <PDPFreightCalculator skuId={productID} />
            </div>
          </div>
          <div
            id="product-footer-menu-pdp"
            className="md:hidden fixed bottom-0 left-0 bg-white grid grid-cols-2 gap-4 p-[1rem] z-[99]"
            style={{ boxShadow: '0 0 25px 2px #cfcfcf;' }}
          >
            <div className="flex flex-col items-center">
            <Text
                  class="line-through"
                  tone="subdued"
                  className="text-md line-through text-gray-400"
                >
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </Text>
              <Text tone="price" variant="heading-3" className="text-2xl">
                  {formatPrice(price, offers!.priceCurrency!)}
                </Text>
                <Text tone="subdued" variant="caption" className="text-red-600">
                  Ou {installments?.replace(" sem juros", "")}
                </Text>
            </div>
            <AddToCartButton
              classList="h-full text-sm"
              skuId={productID}
              sellerId={"1"}
            />
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex-col md:flex-row flex justify-between">
          <div class="mt-4 p-4 md:p-0 w-full md:max-w-[60%] py-4">
            <h4 className="font-bold text-lg">DESCRIÇÃO</h4>
            <Text variant="caption">
              <div class="ml-2 mt-2">{description}</div>
            </Text>
          </div>
          <div className="p-4 md:p-0">
            <ProductSpecs />
          </div>
        </div>
      </Container>
    </div>
  );
}

function ProductSpecs() {
  return (
    <table>
      <tr>
        <td colSpan={2}>
          <h2 className="text-lg font-bold">ESPECIFICAÇÕES</h2>
        </td>
      </tr>
      <tr>
        <td>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M9.638 1.093a.75.75 0 01.724 0l2 1.104a.75.75 0 11-.724 1.313L10 2.607l-1.638.903a.75.75 0 11-.724-1.313l2-1.104zM5.403 4.287a.75.75 0 01-.295 1.019l-.805.444.805.444a.75.75 0 01-.724 1.314L3.5 7.02v.73a.75.75 0 01-1.5 0v-2a.75.75 0 01.388-.657l1.996-1.1a.75.75 0 011.019.294zm9.194 0a.75.75 0 011.02-.295l1.995 1.101A.75.75 0 0118 5.75v2a.75.75 0 01-1.5 0v-.73l-.884.488a.75.75 0 11-.724-1.314l.806-.444-.806-.444a.75.75 0 01-.295-1.02zM7.343 8.284a.75.75 0 011.02-.294L10 8.893l1.638-.903a.75.75 0 11.724 1.313l-1.612.89v1.557a.75.75 0 01-1.5 0v-1.557l-1.612-.89a.75.75 0 01-.295-1.019zM2.75 11.5a.75.75 0 01.75.75v1.557l1.608.887a.75.75 0 01-.724 1.314l-1.996-1.101A.75.75 0 012 14.25v-2a.75.75 0 01.75-.75zm14.5 0a.75.75 0 01.75.75v2a.75.75 0 01-.388.657l-1.996 1.1a.75.75 0 11-.724-1.313l1.608-.887V12.25a.75.75 0 01.75-.75zm-7.25 4a.75.75 0 01.75.75v.73l.888-.49a.75.75 0 01.724 1.313l-2 1.104a.75.75 0 01-.724 0l-2-1.104a.75.75 0 11.724-1.313l.888.49v-.73a.75.75 0 01.75-.75z"
              clip-rule="evenodd"
            />
          </svg>
        </td>
        <th>Tamanho</th>
        <td>
          <span className="font-thin">Grande</span>
        </td>
      </tr>
      <tr>
        <td>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.572.729 6.016 6.016 0 002.856 0A.75.75 0 0012 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.863 17.414a.75.75 0 00-.226 1.483 9.066 9.066 0 002.726 0 .75.75 0 00-.226-1.483 7.553 7.553 0 01-2.274 0z" />
          </svg>
        </td>
        <th>Modelo</th>
        <td>
          <span className="font-thin">Grande</span>
        </td>
      </tr>
      <tr>
        <td>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path d="M6.5 9a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z" />
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a4 4 0 102.248 7.309l1.472 1.471a.75.75 0 101.06-1.06l-1.471-1.472A4 4 0 009 5z"
              clip-rule="evenodd"
            />
          </svg>
        </td>
        <th>Categoria</th>
        <td>
          <span className="font-thin">Grande</span>
        </td>
      </tr>
      <tr>
        <td>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path d="M13.28 7.78l3.22-3.22v2.69a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.69l-3.22 3.22a.75.75 0 001.06 1.06zM2 17.25v-4.5a.75.75 0 011.5 0v2.69l3.22-3.22a.75.75 0 011.06 1.06L4.56 16.5h2.69a.75.75 0 010 1.5h-4.5a.747.747 0 01-.75-.75zM12.22 13.28l3.22 3.22h-2.69a.75.75 0 000 1.5h4.5a.747.747 0 00.75-.75v-4.5a.75.75 0 00-1.5 0v2.69l-3.22-3.22a.75.75 0 10-1.06 1.06zM3.5 4.56l3.22 3.22a.75.75 0 001.06-1.06L4.56 3.5h2.69a.75.75 0 000-1.5h-4.5a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0V4.56z" />
          </svg>
        </td>
        <th>Dimensões</th>
        <td>
          <span className="font-thin">Grande</span>
        </td>
      </tr>
      <tr>
        <td>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a.75.75 0 01.75.75v.258a33.186 33.186 0 016.668.83.75.75 0 01-.336 1.461 31.28 31.28 0 00-1.103-.232l1.702 7.545a.75.75 0 01-.387.832A4.981 4.981 0 0115 14c-.825 0-1.606-.2-2.294-.556a.75.75 0 01-.387-.832l1.77-7.849a31.743 31.743 0 00-3.339-.254v11.505a20.01 20.01 0 013.78.501.75.75 0 11-.339 1.462A18.558 18.558 0 0010 17.5c-1.442 0-2.845.165-4.191.477a.75.75 0 01-.338-1.462 20.01 20.01 0 013.779-.501V4.509c-1.129.026-2.243.112-3.34.254l1.771 7.85a.75.75 0 01-.387.83A4.98 4.98 0 015 14a4.98 4.98 0 01-2.294-.556.75.75 0 01-.387-.832L4.02 5.067c-.37.07-.738.148-1.103.232a.75.75 0 01-.336-1.462 32.845 32.845 0 016.668-.829V2.75A.75.75 0 0110 2zM5 7.543L3.92 12.33a3.499 3.499 0 002.16 0L5 7.543zm10 0l-1.08 4.787a3.498 3.498 0 002.16 0L15 7.543z"
              clip-rule="evenodd"
            />
          </svg>
        </td>
        <th>Peso</th>
        <td>
          <span className="font-thin">Grande</span>
        </td>
      </tr>
    </table>
  );
}

function QuantitySelector() {

  const quantity = useSignal(1)

  return (
    <div>
      <div className="flex items-center">
        <button className="font-bold p-2"  onClick={()=>{ quantity.value = quantity.value - 1 }}>-</button>
        <input
          type="text"
          className="w-8 border h-full border-black text-center p-2"
          value={quantity.value}
        />
        <button className="font-bold p-2" onClick={()=>{ quantity.value = quantity.value + 1 }}>+</button>
      </div>
    </div>
  );
}

function ProductDetails({ page }: Props) {
  if (page) {
    return <Details page={page} />;
  }

  return <NotFound />;
}

export default ProductDetails;
