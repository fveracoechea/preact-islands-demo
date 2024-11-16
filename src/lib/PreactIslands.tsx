import { FunctionalComponent, hydrate, JSX } from "preact";

export type IslandProps = {
  visible?: boolean;
  media?: string;
};

export type IslandsConfig = Record<
  string,
  () => Promise<{ default: (props: IslandProps) => JSX.Element }>
>;

const isBrowser = () => typeof document !== "undefined";

function visible(element: Element) {
  return new Promise(resolve => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          observer.disconnect();
          resolve(true);
        }
      }
    });
    observer.observe(element);
  });
}

function matchMedia(query: string) {
  const mediaQuery = globalThis.matchMedia(query);
  return new Promise(resolve => {
    function mediaListener(e: MediaQueryListEvent) {
      if (!e.matches) return;
      resolve(true);
      mediaQuery.removeEventListener("change", mediaListener);
    }

    if (mediaQuery.matches) resolve(true);
    else mediaQuery.addEventListener("change", mediaListener);
  });
}

export function withIsland<S, Props = {}>(
  Component: FunctionalComponent<Props>,
  displayName: string,
) {
  return (props: Props & IslandProps) => {
    const { visible, media, ...runTimeProps } = props;
    if (isBrowser()) return <Component {...(runTimeProps as Props)} />;

    return (
      <preact-island src={displayName} visible={visible} media={media} >
        <Component {...(runTimeProps as Props)} />
      </preact-island>
    );
  };
}

export function registerIslands<C extends IslandsConfig>(config: C) {
  if (!isBrowser()) return;

  customElements.define(
    "preact-island",
    class PreactIsland extends HTMLElement {
      static config: IslandsConfig = config;
      async connectedCallback() {
        const src = this.getAttribute("src");

        if (!Object.prototype.hasOwnProperty.call(PreactIsland.config, src))
          throw new Error(`${src} is not a registered island`);

        const query = this.getAttribute("media");
        if (this.hasAttribute('media') && query) await matchMedia(query);

        if (this.hasAttribute("visible")) await visible(this);

        const load = PreactIsland.config[src];
        const Component = await load();
        hydrate(<Component.default />, this);
      }
    },
  );
}

declare module "preact/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "preact-island": JSX.HTMLAttributes<HTMLElement> & {
        visible?: boolean | string;
        media?: string;
      };
    }
  }
}
