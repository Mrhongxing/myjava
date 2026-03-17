import React from "react";
import type { RendererComponentProps } from "../types";

interface SectionNodeProps {
  sectionType?: string;
  className?: string;
}

export default function Section({
  node,
  children,
}: RendererComponentProps) {
  const rawProps = (node.props ?? {}) as SectionNodeProps;

  const sectionType =
    typeof rawProps.sectionType === "string" && rawProps.sectionType.trim().length > 0
      ? rawProps.sectionType.trim()
      : node.role ?? "content";

  const customClassName =
    typeof rawProps.className === "string" ? rawProps.className.trim() : "";

  return (
    <section
      data-node-id={node.id}
      data-node-type={node.type}
      data-node-role={node.role ?? "section"}
      data-section-type={sectionType}
      className={`w-full px-6 py-8 md:px-10 md:py-12 ${customClassName}`}
    >
      <div className="mx-auto w-full max-w-7xl">
        {children}
      </div>
    </section>
  );
}