<template>
  <v-card-text>
    <v-flex v-html="renderContent"></v-flex>
  </v-card-text>
</template>
<script>
import { DisableHtml, EnableHtml } from "@/plugins/katex";
export default {
  props: {
    text: {
      type: String,
      default: ""
    },
    html: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    renderContent() {
      return this.html
        ? EnableHtml.render(this.text)
        : DisableHtml.render(this.text);
    }
  }
};
</script>
<style>
code {
  font-family: "Fira Code", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 23px;
  font-size: 15px;
}
code:after,
code:before,
kbd:after,
kbd:before {
  content: none !important;
}
pre {
  width: 65em;
}
</style>
