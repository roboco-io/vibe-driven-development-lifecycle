import DefaultTheme from "vitepress/theme";
import LifecycleDiagram from "./LifecycleDiagram.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("LifecycleDiagram", LifecycleDiagram);
  },
};
