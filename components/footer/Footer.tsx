import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import Container from "$store/components/ui/Container.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { ComponentChildren } from "preact";
import Newsletter from "../ui/Newsletter.tsx";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
};
export type Certificate = {
  src: LiveImage;
  cols: number;
  alt: string;
  title: string;
};

export type Item = StringItem | IconItem;

export type Section = {
  label: string;
  children: Item[];
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <Text variant="caption" tone="default">
      {isIcon(item)
        ? (
          <div class="border-default border-1 py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          </div>
        )
        : (
          <a href={item.href}>
            {item.label}
          </a>
        )}
    </Text>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`py-6 px-4 sm:py-12 sm:px-0 ${_class}`}>{children}</div>;
}

export interface Props {
  sections?: Section[];
  certificates: Certificate[];
}

function Footer({ sections = [], certificates = [] }: Props) {
  return (
    <footer class="w-full bg-footer flex flex-col divide-y-1 divide-default">
      <div>
        <Container class="w-full flex flex-col divide-y-1 divide-default relative">
          <FooterContainer>
            {/* Desktop view */}
            <ul class="hidden sm:flex flex-row gap-20">
              {sections.map((section) => (
                <li>
                  <div>
                    <Text
                      variant="heading-3"
                      className="font-bold uppercase"
                      tone="default"
                    >
                      {section.label}
                    </Text>

                    <ul
                      class={`flex ${
                        isIcon(section.children[0]) ? "flex-row" : "flex-col"
                      } gap-2 pt-2`}
                    >
                      {section.children.map((item) => (
                        <li>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
              <li>
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    {certificates.map(({ src, alt, title, cols = 1 }) => (
                      <div className={`col-span-${cols}`} title={title}>
                        <img
                          className="max-w-[200px]"
                          src={src}
                          alt={alt}
                          title={title}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </li>
              <li>
                <Newsletter
                  action="Inscreva-se"
                  placeholder="E-Mail"
                  subtitle="Assine para receber novidades e ofertas exclusivas!"
                  title="Vamos manter contato?"
                  className="absolute top-0 right-0 w-[33%] max-w-[380px] h-full text-white"
                  backgroundColor="#46454A"
                />
              </li>
            </ul>

            {/* Mobile view */}
            <ul class="flex flex-col sm:hidden sm:flex-row gap-4">
              <li>
                <Text variant="body" tone="default">
                  <details>
                    <summary>
                      SAC
                    </summary>

                    <ul
                      class={`flex ${"flex-row"} gap-2 px-2 pt-2`}
                    >
                      <li>
                        <SectionItem item={{ label: 'Telefone 0800 0000 0000', href: 'callto:+55800 0000 0000' }} />
                      </li>
                    </ul>
                  </details>
                </Text>
              </li>
              {sections.map((section) => (
                <li>
                  <Text variant="body" tone="default">
                    <details>
                      <summary>
                        {section.label}
                      </summary>

                      <ul
                        class={`flex ${
                          isIcon(section.children[0]) ? "flex-row" : "flex-col"
                        } gap-2 px-2 pt-2`}
                      >
                        {section.children.map((item) => (
                          <li>
                            <SectionItem item={item} />
                          </li>
                        ))}
                      </ul>
                    </details>
                  </Text>
                </li>
              ))}
              <li>
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    {certificates.map(({ src, alt, title, cols = 1 }) => (
                      <div className={`col-span-${cols}`} title={title}>
                        <img
                          className="max-w-[200px]"
                          src={src}
                          alt={alt}
                          title={title}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </li>
              <li>
                <Newsletter
                  action="Inscreva-se"
                  placeholder="E-Mail"
                  subtitle="Assine para receber novidades e ofertas exclusivas!"
                  title="Vamos manter contato?"
                  className="w-full text-white absolute left-0"
                  backgroundColor="#46454A"
                />
              </li>
            </ul>
          </FooterContainer>
        </Container>
      </div>

      <div>
        <Container class="w-full">
          <FooterContainer class="flex justify-between w-full text-green-600">
            <Text
              class="flex items-center gap-1 text-green-600"
              variant="body"
            >
              Powered by{" "}
              <a
                href="https://www.deco.cx"
                aria-label="powered by https://www.deco.cx"
                className="text-green-600"
              >
                <Icon id="Deco" height={20} width={60} strokeWidth={0.01} />
              </a>
            </Text>

            <ul class="flex items-center justify-center gap-2">
              <li>
                <a
                  href="https://www.instagram.com/deco.cx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram logo"
                >
                  Time{" "}
                  <b className="p-1 border border-green-700 bg-green-600 text-white">
                    48
                  </b>
                </a>
              </li>
            </ul>
          </FooterContainer>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
