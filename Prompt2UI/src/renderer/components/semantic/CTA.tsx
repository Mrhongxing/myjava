import React from "react";
import type { RendererComponentProps } from "../../types";

export default function CTA({ node }: RendererComponentProps) {
  const headline = String(node.props?.headline ?? "Call to action");
  const action = node.props?.action as { label?: string; href?: string } | undefined;

  return (
    <section>
      <h2>{headline}</h2>
      {action?.label ? <a href={action.href ?? "#"}>{action.label}</a> : null}
    </section>
  );
}