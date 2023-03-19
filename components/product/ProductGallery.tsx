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
import Filters from "../search/Filters.tsx";
import PageTitle from "../ui/PageTitle.tsx";

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
    <Container class="px-4 sm:py-10 bg-[#F1F2F1]">
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
    <div className="w-full h-12 bg-[#929097] px-3 py-4 md:h-[167px]">
      <div className="text-white">
        <Breadcrumb
          itemListElement={breadcrumb?.itemListElement}
          color="#FFF"
        />
      </div>
      <PageTitle />
    </div>
  );
}

function Counter({ quantity }: { quantity: number }) {
  return (
    <div className="hidden md:visible h-full border-r">
      <h4 className="font-bold px-4">84 PRODUTOS</h4>
    </div>
  );
}

function ControllerListPage({ filters }: { filters: any }) {
  return (
    <div className="hidden md:visible w-[380px] border border-r h-auto">
      <div className="w-full pt-3 pb-4">
        <h4 className="px-4 font-bold">FILTRO</h4>
      </div>
      <div className="sticky top-[108px]">
        <Filters filters={filters} />
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
        <ControllerListPage filters={page?.filters} />
        <div>
          <div className="flex justify-between border-b items-center">
            <Counter quantity={page?.products.length}/>
            <SearchControls page={page} />
          </div>
          <Gallery page={page} />
        </div>
      </div>
    </div>
  );
}

export default ProductGallery;
