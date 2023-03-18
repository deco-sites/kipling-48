import Text from "$store/components/ui/Text.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import type {
  Filter,
  FilterToggle,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";

const avaliableColors = [
  {
    label: "Azul",
    hex: "#00F",
  },
  {
    label: "Bege",
    hex: "#FF0056",
  },
  {
    label: "Branco",
    hex: "#FFF",
  },
  {
    label: "Cinza",
    hex: "#CCC",
  },
  {
    label: "Dourado",
    hex: "#FF58",
  },
  {
    label: "Estampado",
    hex: "#F078",
  },
  {
    label: "Gelo",
    hex: "#EEF",
  },
];

const avaliableFilters = [
  "Cor",
  "Modelo",
  "Tamanho",
  "Categoria",
];

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ColorBullet({ backgroundColor }: { backgroundColor: string }) {
  return (
    <div>
      <div
        className="w-4 h-4 rounded-full border-2 border-white"
        style={{ backgroundColor, boxShadow: "0 0 0 1px #000" }}
      />
    </div>
  );
}

function findColor(colorKey: string): string {
  const color = avaliableColors.filter((colorOfList) => {
    return colorOfList.label == colorKey;
  });

  return color.length > 0 ? color[0].hex : "#CCC";
}

function FilterValues({ key, values }: FilterToggle) {
  return (
    <ul class={`flex gap-2 md:max-h-[268px] md:overflow-y-auto flex-col px-1`}>
      {values.map(({ label, value, url, selected, quantity }) => {
        if (key === "Cor") {
          const backgroundColor = findColor(value);

          return (
            <a href={url} className="flex items-center gap-2">
              <ColorBullet backgroundColor={backgroundColor} />
              <div>
                <p className="text-sm">
                  {value} ({quantity})
                </p>
              </div>
            </a>
          );
        }

        return (
          <a href={url} class="flex items-center gap-2">
            <input type="checkbox" checked={selected} />
            <Text variant="caption">{label}</Text>
            <Text tone="subdued" variant="caption">
              ({quantity})
            </Text>
          </a>
        );
      })}
    </ul>
  );
}

export default function Filters({ filters }: Props) {
  // alert(JSON.stringify(filters))

  return (
    <ul class="flex flex-col gap-6">
      {filters
        .filter((type) => {
          return avaliableFilters.includes(type.key, 0);
        })
        .map((filter) => (
          <li class="flex flex-col gap-4 p-4 border-t">
            <Text variant="body" className="uppercase ">{filter.label}</Text>
            <FilterValues {...filter} />
          </li>
        ))}
    </ul>
  );
}
