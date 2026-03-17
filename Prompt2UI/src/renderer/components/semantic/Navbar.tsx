import React from "react";
import type { RendererComponentProps } from "../../types";

export default function Navbar({ node }: RendererComponentProps) {
  const logoText = String(node.props?.logoText ?? "Logo");
  const items = Array.isArray(node.props?.items) ? node.props?.items : [];
  const cta = node.props?.cta as { label?: string; href?: string } | undefined;

  return (
    <nav>
      <div>{logoText}</div>

      <ul>
        {items.map((item, index) => {
          const entry = item as { label?: string; href?: string };
          return (
            <li key={`${entry.label ?? "item"}_${index}`}>
              <a href={entry.href ?? "#"}>{entry.label ?? "Item"}</a>
            </li>
          );
        })}
      </ul>

      {cta?.label ? <a href={cta.href ?? "#"}>{cta.label}</a> : null}
    </nav>
  );
}