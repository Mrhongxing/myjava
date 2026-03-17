import React from "react";
import type { RendererComponentProps } from "../../types";

interface FeatureItem {
  title?: string;
  description?: string;
  icon?: string;
}

interface FeatureGridNodeProps {
  title?: string;
  subtitle?: string;
  columns?: number;
  items?: FeatureItem[];
}

function getGridClass(columns: number): string {
  switch (columns) {
    case 2:
      return "grid-cols-1 md:grid-cols-2";
    case 4:
      return "grid-cols-1 md:grid-cols-2 xl:grid-cols-4";
    case 3:
    default:
      return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
  }
}

function renderIcon(icon?: string) {
  const normalized = typeof icon === "string" ? icon.trim().toLowerCase() : "";

  switch (normalized) {
    case "layers":
      return "◫";
    case "shield":
      return "🛡";
    case "wand":
      return "✦";
    default:
      return "•";
  }
}

export default function FeatureGrid({ node }: RendererComponentProps) {
  const rawProps = (node.props ?? {}) as FeatureGridNodeProps;

  const title =
    typeof rawProps.title === "string" && rawProps.title.trim().length > 0
      ? rawProps.title.trim()
      : "Features";

  const subtitle =
    typeof rawProps.subtitle === "string" ? rawProps.subtitle.trim() : "";

  const columns =
    typeof rawProps.columns === "number" && rawProps.columns > 0
      ? rawProps.columns
      : 3;

  const items = Array.isArray(rawProps.items) ? rawProps.items : [];

  return (
    <section
      data-node-id={node.id}
      data-node-type={node.type}
      data-node-role={node.role ?? "features"}
      className="w-full"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {title}
          </h2>

          {subtitle ? (
            <p className="mt-3 text-base leading-7 text-slate-600 md:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className={`grid gap-6 ${getGridClass(columns)}`}>
          {items.map((item, index) => {
            const entry = item ?? {};
            const itemTitle =
              typeof entry.title === "string" && entry.title.trim().length > 0
                ? entry.title.trim()
                : `Feature ${index + 1}`;

            const description =
              typeof entry.description === "string"
                ? entry.description.trim()
                : "";

            const icon =
              typeof entry.icon === "string" ? entry.icon.trim() : undefined;

            return (
              <article
                key={`${itemTitle}_${index}`}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg text-slate-700">
                  {renderIcon(icon)}
                </div>

                <h3 className="text-xl font-semibold text-slate-900">
                  {itemTitle}
                </h3>

                {description ? (
                  <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
                    {description}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}