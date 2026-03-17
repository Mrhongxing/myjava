import React from "react";
import type { RendererComponentProps } from "../../types";

interface PricingPlan {
  name?: string;
  price?: string;
  description?: string;
  features?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  featured?: boolean;
  highlighted?: boolean;
}

interface PricingNodeProps {
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

export default function Pricing({ node }: RendererComponentProps) {
  const rawProps = (node.props ?? {}) as PricingNodeProps;

  const title =
    typeof rawProps.title === "string" && rawProps.title.trim().length > 0
      ? rawProps.title.trim()
      : "Pricing";

  const subtitle =
    typeof rawProps.subtitle === "string" ? rawProps.subtitle.trim() : "";

  const plans = Array.isArray(rawProps.plans) ? rawProps.plans : [];

  return (
    <section
      data-node-id={node.id}
      data-node-type={node.type}
      data-node-role={node.role ?? "pricing"}
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const entry = plan ?? {};

            const name =
              typeof entry.name === "string" && entry.name.trim().length > 0
                ? entry.name.trim()
                : `Plan ${index + 1}`;

            const price =
              typeof entry.price === "string" ? entry.price.trim() : "";

            const description =
              typeof entry.description === "string"
                ? entry.description.trim()
                : "";

            const features = Array.isArray(entry.features)
              ? entry.features.filter(
                  (feature): feature is string =>
                    typeof feature === "string" && feature.trim().length > 0
                )
              : [];

            const ctaLabel =
              typeof entry.ctaLabel === "string" && entry.ctaLabel.trim().length > 0
                ? entry.ctaLabel.trim()
                : "Choose Plan";

            const ctaHref =
              typeof entry.ctaHref === "string" && entry.ctaHref.trim().length > 0
                ? entry.ctaHref.trim()
                : "#";

            const isFeatured = Boolean(entry.featured ?? entry.highlighted);

            return (
              <article
                key={`${name}_${index}`}
                className={[
                  "flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md",
                  isFeatured
                    ? "border-slate-900 ring-1 ring-slate-900"
                    : "border-slate-200",
                ].join(" ")}
              >
                <div className="mb-6">
                  {isFeatured ? (
                    <div className="mb-3 inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                      Recommended
                    </div>
                  ) : null}

                  <h3 className="text-2xl font-semibold text-slate-900">
                    {name}
                  </h3>

                  {price ? (
                    <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                      {price}
                    </p>
                  ) : null}

                  {description ? (
                    <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
                      {description}
                    </p>
                  ) : null}
                </div>

                <ul className="mb-6 flex flex-1 flex-col gap-3 text-sm text-slate-700 md:text-base">
                  {features.map((feature, i) => (
                    <li key={`${feature}_${i}`} className="flex items-start gap-2">
                      <span className="mt-1 text-slate-900">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={ctaHref}
                  className={[
                    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium transition",
                    isFeatured
                      ? "bg-slate-900 text-white hover:opacity-90"
                      : "border border-slate-300 text-slate-700 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {ctaLabel}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}