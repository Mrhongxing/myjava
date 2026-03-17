import React from "react";
import { DSLNode } from "../../types/dsl";

export function Text({ node }: { node: DSLNode }) {
  const props = (node.props ?? {}) as { content?: string };
  const content = props.content ?? "Text";

  return <p style={{ margin: 0 }}>{content}</p>;
}