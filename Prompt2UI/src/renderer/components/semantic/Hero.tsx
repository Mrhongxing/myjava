import React from "react";
import type { RendererComponentProps } from "../../types";

interface HeroAction {
  label?: string;
  href?: string;
}

interface HeroNodeProps {
  headline?: string;
  subheadline?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
}

function normalizeAction(action: unknown): HeroAction | undefined {
  if (!action || typeof action !== "object") {
    return undefined;
  }

  const candidate = action as Record<string, unknown>;

  const label =
    typeof candidate.label === "string" && candidate.label.trim().length > 0
      ? candidate.label.trim()
      : undefined;

  const href =
    typeof candidate.href === "string" && candidate.href.trim().length > 0
      ? candidate.href.trim()
      : undefined;

  if (!label && !href) {
    return undefined;
  }

  return { label, href };
}

export default function Hero({ node }: RendererComponentProps) {
  const rawProps = (node.props ?? {}) as HeroNodeProps;

  const headline =
    typeof rawProps.headline === "string" && rawProps.headline.trim().length > 0
      ? rawProps.headline.trim()
      : "Hero headline";

  const subheadline =
    typeof rawProps.subheadline === "string"
      ? rawProps.subheadline.trim()
      : "";

  const primaryAction = normalizeAction(rawProps.primaryAction);
  const secondaryAction = normalizeAction(rawProps.secondaryAction);

  return (
    <section
      data-node-id={node.id}
      data-node-type={node.type}
      data-section-role={node.role ?? "hero"}
      className="w-full px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {headline}
          </h1>

          {subheadline ? (
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
              {subheadline}
            </p>
          ) : null}
        </div>

        {(primaryAction || secondaryAction) ? (
          <div className="flex flex-wrap items-center gap-3">
            {primaryAction?.label ? (
              <a
                href={primaryAction.href ?? "#"}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                data-action="primary"
              >
                {primaryAction.label}
              </a>
            ) : null}

            {secondaryAction?.label ? (
              <a
                href={secondaryAction.href ?? "#"}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                data-action="secondary"
              >
                {secondaryAction.label}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}