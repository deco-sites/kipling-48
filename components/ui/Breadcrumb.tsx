import Text from "$store/components/ui/Text.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { BreadcrumbList } from "deco-sites/std/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  color?: string;
}

function Item(
  { name, item, color = "#000" }: {
    name?: string;
    item?: string;
    color?: string;
  },
) {
  if (!name || !item) {
    return null;
  }

  return (
    <li class="whitespace-nowrap overflow-hidden overflow-ellipsis">
      <a href={item} class="hover:underline">
        <Text variant="caption" style={{ color: color }}>
          {name}
        </Text>
      </a>
    </li>
  );
}

function Breadcrumb({ itemListElement = [], color }: Props) {
  return (
    <ul class="flex flex-row gap-2 items-center w-full">
      <Item name="Home" item="/" color={color} />
      {itemListElement.map((item) => (
        <>
          <li class="mt-0.5">
            <Icon id="ChevronRight" width={16} height={16} strokeWidth={2} />
          </li>
          <Item color={color} {...item} />
        </>
      ))}
    </ul>
  );
}

export default Breadcrumb;
