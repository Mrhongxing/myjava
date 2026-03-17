// src/compiler/blueprint-to-dsl.ts

import { inferComponentType } from "../inference/component-inference";

import type {
  DSLNode,
  PageNode,
  UIDSLDocument,
} from "../types/dsl";

import type {
  SectionPlan,
  SectionType,
  UIBlueprint,
} from "../types/blueprint";

function mapSectionTypeToRole(sectionType: SectionType) {
  switch (sectionType) {
    case "navbar":
      return "navbar";

    case "hero":
      return "hero";

    case "feature_grid":
    case "feature_list":
      return "features";

    case "pricing":
      return "pricing";

    case "testimonial":
      return "testimonials";

    case "cta":
      return "cta";

    case "contact_form":
      return "form";

    case "footer":
      return "footer";

    default:
      return "content";
  }
}

/*
SECTION NODE
*/

function createBaseSection(
  section: SectionPlan,
  blueprint: UIBlueprint,
  prompt?: string
): DSLNode {

  const inference = inferComponentType({
    section,
    blueprint,
    prompt,
  });

  return {
    id: section.id,

    type: "section",

    name: section.name,

    role: mapSectionTypeToRole(section.type),

    props: {
      sectionType: section.type,
      purpose: section.purpose,

      inferredComponentType: inference.componentType,
      inferenceConfidence: inference.confidence,
      inferenceReason: inference.reason,
    },

    children: buildSectionChildren(section, blueprint, prompt),
  };
}

/*
SECTION CHILDREN
*/

function buildSectionChildren(
  section: SectionPlan,
  blueprint: UIBlueprint,
  prompt?: string
): DSLNode[] {

  const inference = inferComponentType({
    section,
    blueprint,
    prompt,
  });

  switch (inference.componentType) {

    case "navbar":
      return [buildNavbarNode(section.id)];

    case "hero":
      return [buildHeroNode(section.id)];

    case "feature_grid":
      return [buildFeatureGridNode(section.id)];

    case "list":

      if (section.type === "faq") {
        return [buildFAQNode(section.id)];
      }

      return [buildFeatureListNode(section.id)];

    case "pricing":
      return [buildPricingNode(section.id)];

    case "testimonial":
      return [buildTestimonialNode(section.id)];

    case "cta":
      return [buildCTANode(section.id)];

    case "form":
      return [buildContactFormNode(section.id)];

    case "footer":
      return [buildFooterNode(section.id)];

    case "container":
    default:
      return [buildPlaceholderNode(section.id, section.type)];
  }
}

/*
COMPONENT BUILDERS
*/

function buildNavbarNode(sectionId: string): DSLNode {
  return {
    id: `${sectionId}_navbar`,
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
  };
}

function buildHeroNode(sectionId: string): DSLNode {
  return {
    id: `${sectionId}_hero`,
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
  };
}

function buildFeatureGridNode(sectionId: string): DSLNode {
  return {
    id: `${sectionId}_feature_grid`,
    type: "feature_grid",

    props: {
      columns: 3,

      items: [
        {
          title: "Structured Output",
          description: "Generate component trees instead of raw HTML soup.",
          icon: "layers",
        },

        {
          title: "Schema Validation",
          description: "Catch malformed output before rendering.",
          icon: "shield",
        },

        {
          title: "Editable UI",
          description: "Update one section without regenerating the whole page.",
          icon: "wand",
        },
      ],
    },
  };
}

function buildFeatureListNode(sectionId: string): DSLNode {
  return {
    id: `${sectionId}_feature_list`,
    type: "list",

    props: {
      items: [
        "Blueprint-first generation",
        "Semantic UI AST",
        "Renderer-friendly node tree",
      ],
    },
  };
}

function buildPricingNode(sectionId: string): DSLNode {
  return {
    id: `${sectionId}_pricing`,
    type: "pricing",

    props: {
      title: "Simple pricing",

      plans: [
        {
          name: "Starter",
          price: "$9",

          features: [
            "1 project",
            "Basic generation",
            "Community support",
          ],
        },

        {
          name: "Pro",
          price: "$29",

          features: [
            "Unlimited projects",
            "Advanced generation",
            "Priority support",
          ],

          highlighted: true,
        },
      ],
    },
  };
}

function buildTestimonialNode(sectionId: string): DSLNode {
  return {
    id: `${sectionId}_testimonial`,
    type: "testimonial",

    props: {
      items: [
        {
          name: "Ada",
          role: "Product Engineer",

          quote:
            "This feels like using an AI compiler for interfaces.",
        },

        {
          name: "Linus",
          role: "Frontend Lead",

          quote:
            "The structured pipeline made iteration much more reliable.",
        },
      ],
    },
  };
}

function buildCTANode(sectionId: string): DSLNode {
  return {
    id: `${sectionId}_cta`,
    type: "cta",

    props: {
      headline:
        "Start generating structured websites today",

      action: {
        label: "Try It Now",
        href: "#",
      },
    },
  };
}

function buildContactFormNode(sectionId: string): DSLNode {
  return {
    id: `${sectionId}_contact_form`,
    type: "form",

    props: {
      title: "Contact us",
    },

    children: [
      {
        id: `${sectionId}_input_name`,
        type: "input",

        props: {
          name: "name",
          label: "Name",
          placeholder: "Enter your name",
        },
      },

      {
        id: `${sectionId}_input_email`,
        type: "input",

        props: {
          name: "email",
          label: "Email",
          placeholder: "Enter your email",
        },
      },

      {
        id: `${sectionId}_submit`,
        type: "button",

        props: {
          label: "Send Message",
        },

        events: {
          onClick: {
            action: "submit_form",
            target: `${sectionId}_contact_form`,
          },
        },
      },
    ],
  };
}

function buildFooterNode(sectionId: string): DSLNode {
  return {
    id: `${sectionId}_footer`,
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
  };
}

function buildFAQNode(sectionId: string): DSLNode {
  return {
    id: `${sectionId}_faq`,
    type: "list",

    props: {
      title: "Frequently asked questions",

      items: [
        "How does the DSL validation work?",
        "Can I edit only one section?",
        "Can this compile to React automatically?",
      ],
    },
  };
}

function buildPlaceholderNode(
  sectionId: string,
  sectionType: string
): DSLNode {

  return {
    id: `${sectionId}_placeholder`,

    type: "container",

    props: {
      sectionType,
      message: `Placeholder for section type: ${sectionType}`,
    },

    children: [
      {
        id: `${sectionId}_placeholder_text`,
        type: "text",

        props: {
          text: `Placeholder for ${sectionType}`,
        },
      },
    ],
  };
}

/*
PAGE
*/

function buildPageNode(
  blueprint: UIBlueprint,
  prompt?: string
): PageNode {

  return {
    id: "page_root",

    type: "page",

    role: "root",

    props: {
      title: `${blueprint.pageType} page`,
    },

    children: blueprint.sections
      .slice()
      .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999))
      .map((section) =>
        createBaseSection(section, blueprint, prompt)
      ),
  };
}

/*
COMPILER ENTRY
*/

export function compileBlueprintToDSL(
  blueprint: UIBlueprint,
  options?: {
    documentId?: string;
    documentName?: string;
    sourcePrompt?: string;
  }
): UIDSLDocument {

  return {
    version: "1.1",

    kind: "ui_document",

    document: {
      id: options?.documentId ?? "doc_generated_from_blueprint",

      name: options?.documentName ?? "Generated UI Document",

      description:
        `Generated from blueprint (${blueprint.pageType}/${blueprint.intent})`,
    },

    sourcePrompt: options?.sourcePrompt,

    blueprint,

    designSystem: {
      tokensRef: "default",

      theme: {
        mode: blueprint.theme?.mode ?? "light",
        preset: blueprint.theme?.style ?? "modern",
      },
    },

    page: buildPageNode(
      blueprint,
      options?.sourcePrompt
    ),

    editing: {
      editable: true,
      nodeUpdateMode: "patch",
    },

    validation: {
      schema: "ui_document@1.1",
      strict: true,
    },
  };
}