const { existsSync, readdirSync } = require("fs");

class Preset {
  constructor(label) {
    this.label = label;

    if (existsSync(this.presetPath())) {
      this.definition = require(this.presetPath());
    } else {
      throw new Error(`Unknown preset: ${label}`);
    }
  }

  directoryPath() {
    return `./presets/${this.label}/${this.label}.json`;
  }

  presetPath() {
    return `./presets/${this.label}/${this.label}.json`;
  }

  contentTemplates() {
    if (!this.contentTemplateNames) {
      this.contentTemplateNames = readdirSync(`./presets/${this.label}/`).filter(file => (
        file.endsWith(".tpl")
      )).map(file => file.replace(".tpl", ""));
    }
    return this.contentTemplateNames;
  }

  sourceTemplates() {
    const contentRefs = this.contentTemplates();
    return this.definition.engine.templates.src.filter(ref => {
      return !contentRefs.includes(ref);
    });
  }

  contentBindings() {
    return this.definition.bindings.src;
  }

  dependencies() {
    return this.definition.dependencies;
  }

  engine() {
    return this.definition.engine;
  }

}

module.exports = {
  Preset
}
