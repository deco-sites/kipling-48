import Container from "$store/components/ui/Container.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { LoaderReturnType } from "$live/types.ts";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
}

function NotFound() {
  return <div />;
}

function Controls({ page }: { page: ProductListingPage }) {
  const open = useSignal(false);
  const filters = page?.filters;

  return (
    <Container class="fixed bottom-0 left-0 w-full bg-footer md:relative z-[999] flex flex-col justify-end md:mb-4 p-4 md:p-0 sm:gap-4 sm:flex-row sm:h-[53px]">
      <div class="flex flex-row sm:gap-4 items-center justify-between md:justify-end">
        <div className="md:hidden">
          <Button
            variant="tertiary"
            onClick={() => {
              open.value = true;
            }}
          >
            Filtrar
            <Icon id="FilterList" width={16} height={16} />
          </Button>
        </div>
        <Sort />
      </div>

      <div className="md:hidden">
        <Modal
          title="Filtrar"
          mode="sidebar-right"
          open={open.value}
          onClose={() => {
            open.value = false;
          }}
        >
          <Filters filters={filters} />
        </Modal>
      </div>
    </Container>
  );
}

function SearchControls({ page }: Props) {
  if (!page || !page.filters || page.filters.length === 0) {
    return <NotFound />;
  }

  return <Controls page={page} />;
}

export default SearchControls;
