import HeaderButton from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import HeaderChanger from "$store/components/ui/headerChanger.tsx"
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import HeaderSearchMenu from "$store/islands/HeaderSearchMenu.tsx";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {

  return (
    <>
      <HeaderChanger/>
      {/* Mobile Version */}
      <div
        class={`md:hidden flex flex-row justify-between items-center h-[${navbarHeight}] border-b-1 border-default w-full px-2 gap-2`}
        id="header-page"
      >
        <HeaderButton variant="menu" />

        <a
          href="/"
          class={`flex-grow inline-flex items-center min-h-[${navbarHeight}]`}
          aria-label="Store logo"
        >
          <Icon id="Logo" width={126} height={16} />
        </a>

        <div class="flex gap-1">
          <HeaderButton variant="search" />
          <HeaderButton variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div className="flex justify-center">
        <div class="">
            <a
              href="/"
              aria-label="Store logo"
              id="logo-header-open"
              class="block py-1 py-3 w-[176px]"
            >
              <img
                src="https://www.kipling.com.br/arquivos/kipling.png?v=636866750618500000"
                alt="store logo image"
              />
            </a>
        </div>
      </div>
      <div class="hidden md:flex flex-row justify-between items-center border-b-1 border-default w-full pl-2 pr-3">
        <div class="flex-none w-44">
            <a
              href="/"
              aria-label="Store logo"
              id="logo-header-close"
              class="block py-1 py-3 w-[176px] hidden"
            >
              <img
                src="https://www.kipling.com.br/arquivos/kipling.png?v=636866750618500000"
                alt="store logo image"
              />
            </a>
        </div>
        <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
        <div class="flex-none w-44 md:w-48 flex items-center justify-end gap-2">
          <Divider />
          <HeaderButton variant="search" />
          <Divider />
          <HeaderSearchMenu searchbar={searchbar} />
          <a href="/minha-conta" className="text-xs">Minha Conta</a>
          <Divider />

          <HeaderButton variant="cart" />
        </div>
      </div>
    </>
  );
}

const Divider = () => {
  return (
    <div
      class={`bg-black w-[1px] h-[32px]`}
    />
  );
};

export default Navbar;
