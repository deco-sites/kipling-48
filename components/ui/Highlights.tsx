import Image from "deco-sites/std/components/Image.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Highlight {
  src: LiveImage;
  alt: string;
  href: string;
  action: string;
  title: string;
  subtitle: string;
}

export interface Props {
  highlights?: Highlight[];
}

function Highlights({ highlights = [] }: Props) {
  return (
    <Container class="py-10">
      <div
        className={`grid md:gap-6 grid-cols-2 md:grid-cols-${highlights.length}`}
      >
        {highlights.map(({ href, src, alt, action, title, subtitle }) => (
          <a
            href={href}
            class="flex flex-col gap-4 items-center min-w-[190px]"
          >
            <Image
              class="w-full"
              src={src}
              alt={alt}
              width={Math.ceil(1336/highlights.length)}
              style={{ width: `${Math.ceil(1336/highlights.length)}px` }}
            />
            <p className="font-bold">{title}</p>
            <p className="text-xs text-center">{subtitle}</p>
            <div className="w-full flex justify-center">
              <div className="bg-gray-100 font-thin px-2 py-3 text-sm rounded-md uppercase">
                {action}
              </div>
            </div>
          </a>
        ))}
      </div>
    </Container>
  );
}

export default Highlights;
