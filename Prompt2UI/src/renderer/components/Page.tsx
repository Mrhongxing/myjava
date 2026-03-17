import React from "react";
import type { RendererComponentProps } from "../types";

interface PageNodeProps {
  title?: string;
}

export default function Page({
  node,
  children,
}: RendererComponentProps) {
  const rawProps = (node.props ?? {}) as PageNodeProps;

  const title =
    typeof rawProps.title === "string" && rawProps.title.trim().length > 0
      ? rawProps.title.trim()
      : "Untitled Page";

  return (
    <div
      data-node-id={node.id}
      data-node-type={node.type}
      data-node-role={node.role ?? "root"}
      data-page-title={title}
      className="min-h-screen w-full bg-white text-slate-900"
    >
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col">
        {children}
      </main>
    </div>
  );
}