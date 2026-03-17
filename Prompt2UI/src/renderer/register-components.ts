import { componentRegistry } from "../core/component-registry";

import Page from "./components/Page";
import Section from "./components/Section";
import {Container} from "./components/Container";
import {Text} from "./components/Text";
import {Button} from "./components/Button";

import Hero from "./components/semantic/Hero";
import Navbar from "./components/semantic/Navbar";
import FeatureGrid from "./components/semantic/FeatureGrid";
import Pricing from "./components/semantic/Pricing";
import CTA from "./components/semantic/CTA";
import Footer from "./components/semantic/Footer";

// structural components
componentRegistry.register({
  type: "page",
  component: Page,
});

componentRegistry.register({
  type: "section",
  component: Section,
});

componentRegistry.register({
  type: "container",
  component: Container,
});

componentRegistry.register({
  type: "text",
  component: Text,
});

componentRegistry.register({
  type: "button",
  component: Button,
});

// semantic components
componentRegistry.register({
  type: "hero",
  component: Hero,
  semantic: true,
});

componentRegistry.register({
  type: "navbar",
  component: Navbar,
  semantic: true,
});

componentRegistry.register({
  type: "feature_grid",
  component: FeatureGrid,
  semantic: true,
});

componentRegistry.register({
  type: "pricing",
  component: Pricing,
  semantic: true,
});

componentRegistry.register({
  type: "cta",
  component: CTA,
  semantic: true,
});

componentRegistry.register({
  type: "footer",
  component: Footer,
  semantic: true,
});