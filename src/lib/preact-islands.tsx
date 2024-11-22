import type { FunctionalComponent, JSX } from "preact";
import hydrate from "preact-iso/hydrate";

export type IslandsConfig = Record<
  string,
  () => Promise<{ default: FunctionalComponent }>
>;

export function registerIslands<C extends IslandsConfig>(config: C) {
  customElements.define(
    "preact-island",
    class extends HTMLElement {
      async connectedCallback() {
        const src = this.getAttribute("src");

        if (!Object.prototype.hasOwnProperty.call(config, src))
          throw new Error(`${src} is not a registered island`);

        const load = config[src];
        const Component = await load();
        hydrate(<Component.default />, this);
      }
    },
  );
}

export function withIsland<S, Props = {}>(
  Component: FunctionalComponent<Props>,
  displayName: string,
): FunctionalComponent<Props> {
  return (props: Props) => {
    if (typeof document !== "undefined") return <Component {...props} />;
    return (
      <preact-island src={displayName}>
        <Component {...props} />
      </preact-island>
    );
  };
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
