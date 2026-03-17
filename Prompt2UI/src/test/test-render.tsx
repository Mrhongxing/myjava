import React from "react";
import RenderNode from "../renderer/RenderNode";
import type { UIDSLDocument } from "../types/dsl";

const mockDocument: UIDSLDocument = {
  version: "1.1",
  kind: "ui_document",
  document: {
    id: "doc_test",
    name: "Test Landing Page",
    description: "Renderer smoke test for a full landing page",
  },
  page: {
    id: "page_root",
    type: "page",
    role: "root",
    props: {
      title: "Prompt2UI Test Landing Page",
    },
    children: [
      {
        id: "sec_navbar",
        type: "section",
        role: "navbar",
        props: {
          sectionType: "navbar",
        },
        children: [
          {
            id: "navbar_main",
            type: "navbar",
            props: {
              logoText: "StructWebGen",
              items: [
                { label: "Home", href: "#home" },
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "Contact", href: "#contact" },
              ],
              cta: {
                label: "Get Started",
                href: "#cta",
              },
            },
          },
        ],
      },
      {
        id: "sec_hero",
        type: "section",
        role: "hero",
        props: {
          sectionType: "hero",
        },
        children: [
          {
            id: "hero_main",
            type: "hero",
            props: {
              headline: "Build websites from prompts",
              subheadline:
                "Structured, controllable, and editable UI generation for modern teams.",
              primaryAction: {
                label: "Start Building",
                href: "#cta",
              },
              secondaryAction: {
                label: "Live Demo",
                href: "#demo",
              },
            },
          },
        ],
      },
      {
        id: "sec_features",
        type: "section",
        role: "features",
        props: {
          sectionType: "feature_grid",
        },
        children: [
          {
            id: "features_main",
            type: "feature_grid",
            props: {
              title: "Why structured generation matters",
              columns: 3,
              items: [
                {
                  title: "Structured Output",
                  description:
                    "Generate component trees instead of raw HTML soup.",
                  icon: "layers",
                },
                {
                  title: "Schema Validation",
                  description:
                    "Catch malformed output before rendering and deployment.",
                  icon: "shield",
                },
                {
                  title: "Editable UI",
                  description:
                    "Update one section without regenerating the whole page.",
                  icon: "wand",
                },
              ],
            },
          },
        ],
      },
      {
        id: "sec_pricing",
        type: "section",
        role: "pricing",
        props: {
          sectionType: "pricing",
        },
        children: [
          {
            id: "pricing_main",
            type: "pricing",
            props: {
              title: "Simple pricing",
              plans: [
                {
                  name: "Starter",
                  price: "$0",
                  description: "For trying out structured UI generation.",
                  features: [
                    "1 project",
                    "Basic components",
                    "Community support",
                  ],
                  ctaLabel: "Start Free",
                  ctaHref: "#cta",
                },
                {
                  name: "Pro",
                  price: "$19",
                  description: "For builders who want faster iteration.",
                  features: [
                    "Unlimited projects",
                    "Advanced components",
                    "Priority support",
                  ],
                  ctaLabel: "Upgrade",
                  ctaHref: "#cta",
                  featured: true,
                },
                {
                  name: "Team",
                  price: "$49",
                  description: "For product teams working collaboratively.",
                  features: [
                    "Team workspace",
                    "Shared templates",
                    "Admin controls",
                  ],
                  ctaLabel: "Contact Sales",
                  ctaHref: "#contact",
                },
              ],
            },
          },
        ],
      },
      {
        id: "sec_cta",
        type: "section",
        role: "cta",
        props: {
          sectionType: "cta",
        },
        children: [
          {
            id: "cta_main",
            type: "cta",
            props: {
              headline: "Start building your AI-powered UI workflow",
              subheadline:
                "Turn prompts into structured pages, then edit them like a real system.",
              action: {
                label: "Try Prompt2UI",
                href: "#contact",
              },
            },
          },
        ],
      },
      {
        id: "sec_footer",
        type: "section",
        role: "footer",
        props: {
          sectionType: "footer",
        },
        children: [
          {
            id: "footer_main",
            type: "footer",
            props: {
              brand: "StructWebGen",
              links: [
                { label: "Docs", href: "#docs" },
                { label: "GitHub", href: "#github" },
                { label: "Contact", href: "#contact" },
              ],
              copyright: "© 2026 StructWebGen",
            },
          },
        ],
      },
    ],
  },
  designSystem: {
    tokensRef: "default",
    theme: {
      mode: "light",
      style: "modern",
      primaryColor: "#007BFF",
      radius: "md",
      density: "compact",
    },
  },
  editing: {
    editable: true,
    nodeUpdateMode: "patch",
  },
  validation: {
    schema: "ui_document@1.1",
    strict: true,
  },
};

export default function TestRenderApp() {
  return <RenderNode node={mockDocument.page} />;
}