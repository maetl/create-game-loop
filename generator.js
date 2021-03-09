const { Liquid } = require("liquidjs");
const path = require("path");
const { readDirSync, readFileSync, writeFileSync, mkdirSync, copyFileSync } = require("fs");
const { exec } = require("child_process");
const { Package } = require("./package");
const { Project } = require("./project");
const { Preset } = require("./preset");
const { Standard } = require("./standard");
const { Style } = require("./style");

class Generator {
  constructor(basename, directory, opts) {
    this.project = new Project(basename, directory);
    this.initializeGitRepo = opts.repo;
    this.installNodeModules = opts.install;
    this.preset = new Preset(opts.preset);
    this.standard = new Standard(opts.standard);
    this.style = new Style(opts.style);
    this.package = new Package(basename, opts, this.preset.dependencies());
  }

  ensureDirectories() {
    mkdirSync(path.resolve(this.project.directory, "src"), { recursive: true });
  }

  processSource() {
    this.ensureDirectories();

    const sourceTemplate = new Liquid({
      root: path.resolve(__dirname, "templates/src"),
      extname: ".tpl"
    });

    for (let templateName of this.preset.sourceTemplates()) {
      writeFileSync(
        path.resolve(this.project.directory, `src/${templateName}`),
        sourceTemplate.renderFileSync(`${templateName}.tpl`, this)
      );
    }

    const contentTemplate = new Liquid({
      root: path.resolve(__dirname, `presets/${this.preset.label}`),
      extname: ".tpl"
    });

    for (let templateName of this.preset.contentTemplates()) {
      writeFileSync(
        path.resolve(this.project.directory, `src/${templateName}`),
        contentTemplate.renderFileSync(`${templateName}.tpl`, this)
      );
    }
  }

  processTests() {
    // No templates for this yet
  }

  processDocs() {
    // No templates for this yet
  }

  processConf() {
    const devDependencies = this.package.definition.devDependencies;

    if (devDependencies.hasOwnProperty("snowpack")) {
      const snowpackConf = require(path.resolve(__dirname, "templates/conf/snowpack.json"));

      // TODO: set output directory to user-defined preference, public, web, www, dist
      // snowpackConf.buildOptions.out = "web"
      writeFileSync(
        path.resolve(this.project.directory, "snowpack.config.json"),
        JSON.stringify(snowpackConf, null, 2)
      );
    }
  }

  processGit() {
    if (this.initializeGitRepo) {
      exec(`git init ${this.project.basename}`, (error, stdout, stderror) => {
        // TODO: handle error and clean up/restore workspace
        console.log(stdout);
        console.log(stderror);

        const defaultIgnore = readFileSync(
          path.resolve(__dirname, "templates/conf/gitignore.txt")
        ).toString().split("\n");

        // TODO: switch on --web output directory
        // TODO: add electron ignores
        defaultIgnore.push("# generated web distribution");
        defaultIgnore.push("dist/");

        writeFileSync(
          path.resolve(this.project.directory, ".gitignore"),
          defaultIgnore.join("\n")
        );
      });
    }
  }

  processNpm() {
    writeFileSync(
      path.resolve(this.project.directory, "package.json"),
      `${JSON.stringify(this.package.definition, null, 2)}\n`
    );

    if (this.installNodeModules) {
      console.log("Installing node modules");
    }
  }
}

module.exports = {
  Generator
}
