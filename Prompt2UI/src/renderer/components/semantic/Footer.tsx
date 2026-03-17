import React from "react";
import type { RendererComponentProps } from "../../types";

export default function Footer({ node }: RendererComponentProps) {
  const brand = String(node.props?.brand ?? "Brand");
  const links = Array.isArray(node.props?.links) ? node.props?.links : [];
  const copyright = String(node.props?.copyright ?? "");

  return (
    <footer>
      <div>{brand}</div>

      <ul>
        {links.map((link, index) => {
          const entry = link as { label?: string; href?: string };
          return (
            <li key={`${entry.label ?? "link"}_${index}`}>
              <a href={entry.href ?? "#"}>{entry.label ?? "Link"}</a>
            </li>
          );
        })}
      </ul>

      {copyright ? <small>{copyright}</small> : null}
    </footer>
  );
}