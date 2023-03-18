import ProductCard from "$store/components/product/ProductCard.tsx";
import Container from "$store/components/ui/Container.tsx";
import Button from "$store/components/ui/Button.tsx";
import Text from "$store/components/ui/Text.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type {
  BreadcrumbList,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";
import Breadcrumb from "../ui/Breadcrumb.tsx";
import SearchControls from "../search/Controls.tsx";

const example = [
  {
    type: "color",
    title: "COR",
    options: [
      {
        title: "Vermelho",
        quantity: 1,
        ref: "#F00",
      },
      {
        title: "Amarelo",
        quantity: 1,
        ref: "#FF0",
      },
      {
        title: "Azul",
        quantity: 1,
        ref: "#00F",
      },
      {
        title: "Estampado",
        quantity: 1,
        ref: "#190",
      },
    ],
  },
  {
    type: "checkbox",
    title: "MODELO",
    options: [
      {
        title: "Almato",
        quantity: 12,
        ref: false,
      },
      {
        title: "Almato",
        quantity: 12,
        ref: false,
      },
      {
        title: "Almato",
        quantity: 12,
        ref: false,
      },
    ],
  },
  {
    type: "checkbox",
    title: "CATEGORIA",
    options: [
      {
        title: "Academia",
        quantity: 12,
        ref: false,
      },
      {
        title: "Dia a Dia",
        quantity: 12,
        ref: false,
      },
      {
        title: "Final de Semana",
        quantity: 12,
        ref: false,
      },
    ],
  },
];

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <Text>Not Found!</Text>
    </div>
  );
}

function Gallery({ page }: { page: ProductListingPage }) {
  return (
    <Container class="px-4 sm:py-10">
      <div class="relative grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-10 items-center">
        {page.products?.map((product, index) => (
          <div class="w-full list-none">
            <ProductCard product={product} preload={index === 0} />
          </div>
        ))}
      </div>

      <div class="flex flex-row items-center justify-center gap-2 my-4">
        <a rel="prev" href={page.pageInfo.previousPage ?? "#"}>
          <Button disabled={!page.pageInfo.previousPage} variant="icon">
            <Icon id="ChevronLeft" width={20} height={20} strokeWidth={2} />
          </Button>
        </a>
        <Text variant="caption">
          {page.pageInfo.currentPage + 1}
        </Text>
        <a rel="next" href={page.pageInfo.nextPage ?? "#"}>
          <Button disabled={!page.pageInfo.nextPage} variant="icon">
            <Icon id="ChevronRight" width={20} height={20} strokeWidth={2} />
          </Button>
        </a>
      </div>
    </Container>
  );
}

function TopBanner({ breadcrumb }: { breadcrumb: BreadcrumbList }) {
  return (
    <div className="w-full h-200 bg-gray-400 px-3 py-4 h-[167px]">
      <div className="text-white">
        <Breadcrumb
          itemListElement={breadcrumb?.itemListElement}
          color="#FFF"
        />
      </div>
      <div>
        <h1 className="text-4xl text-white text-thin">Titulo da página</h1>
      </div>
    </div>
  );
}

function ColorBullet({ backgroundColor }: { backgroundColor: string }) {
  return (
    <div>
      <div
        className="w-4 h-4 rounded-full border-2 border-white"
        style={{ backgroundColor, boxShadow: "0 0 0 1px #000" }}
      >
      </div>
    </div>
  );
}

function Counter() {
  return (
    <div className="h-full border-r">
      <h4 className="font-bold px-4">84 PRODUTOS</h4>
    </div>
  );
}

function ControllerListPage() {
  return (
    <div className="w-[380px] border border-r h-auto">
      <div className="w-full pt-3 pb-4">
        <h4 className="px-4 font-bold">FILTRO</h4>
      </div>
      <div className="sticky top-[108px]">
        {example.map((filter) => {
          return (
            <div id="color-chooser" className="px-4 border-t mb-4">
              <div className="my-2">
                <h5>{filter.title}</h5>
              </div>
              <div className="flex flex-col gap-4">
                {filter.options.map((option) => {
                  return (
                    <button>
                      <div className="flex items-center gap-2">
                        {filter.type == "color" && (
                          <ColorBullet backgroundColor={option.ref as string} />
                        )}
                        {filter.type == "checkbox" && <input type="checkbox" />}
                        <div>
                          <p className="text-sm">
                            {option.title} ({option.quantity})
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProductGallery({ page }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return (
    <div>
      <TopBanner breadcrumb={page?.breadcrumb} />
      <div className="flex">
        <ControllerListPage />
        <div>
          <div className="flex justify-between border-b items-center">
            <Counter />
            <SearchControls page={page} />
          </div>
          <Gallery page={page} />
        </div>
      </div>
    </div>
  );
}

export default ProductGallery;
