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
    label: "Amarelo",
    hex: "#FF0",
  },
  {
    label: "Estampado",
    hex: "#F078",
  },
  {
    label: "Gelo",
    hex: "#EEF",
  },
  {
    label: "Laranja",
    hex: "#FFA500",
  },
  {
    label: "Lilás",
    hex: "#C8a2c8",
  },
  {
    label: "Marrom",
    hex: "#964b00",
  },
  {
    label: "Nude",
    hex: "#EBC8B2",
  },
  {
    label: "Prata",
    hex: "#C0C0C0",
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
        className="w-5 h-5 rounded-full border border-3 border-white"
        style={{ backgroundColor, boxShadow: "0 0 0 1px #C0C0C0" }}
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
    <ul class={`flex gap-2 flex-col px-1`}>
      {values.map(({ label, value, url, selected, quantity }) => {
        if (key === "Cor") {
          const backgroundColor = findColor(value);

          return (
            <a href={url} className="flex items-center gap-3 p-2 mb-2">
              <ColorBullet backgroundColor={backgroundColor} />
              <div>
                <p className="text-xs font-thin">
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
  return (
    <ul class="flex flex-col gap-6 max-h-[100vh] overflow-y-auto">
      {filters
        .filter((type) => {
          return avaliableFilters.includes(type.key, 0);
        })
        .map((filter) => (
          <li class="flex flex-col gap-4 p-4 border-t">
            <Text variant="body" className="uppercase text-xs">{filter.label}</Text>
            <FilterValues {...filter} />
          </li>
        ))}
    </ul>
  );
}
