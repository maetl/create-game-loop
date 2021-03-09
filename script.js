const path = require("path");
const { Command } = require("commander");
const inquirer = require('inquirer');
const { Prelude } = require("./prelude");
const { Generator } = require("./generator");

class Script {
  constructor() {
    this.basename = path.basename(path.resolve(process.env.PWD));
    this.directory = path.resolve(process.env.PWD);
    this.command = new Command();
    this.command.arguments("[project-name]");
    this.command.allowExcessArguments(false);
    this.command.option("-y, --yes", "Skip interactive prompt?", false);
    this.command.option("-r, --repo", "Initialize Git repository?", false);
    this.command.option("-t, --preset [label]", "Software design convention", "caves");
    this.command.option("-p --public", "Open source package", false);
    this.command.option("-s --semvar [number]", "Semantic version (public only)");
    this.command.option("-l --license [spdx-id]", "OSS license (public only)");
    this.command.option("-i --install", "Install node modules", false);
  }

  run() {
    this.command.action(argname => {
      this.opts = this.command.opts();

      const prelude = new Prelude(this.opts);

      if (argname && argname !== ".") {
        this.basename = argname;
        this.directory = path.resolve(process.env.PWD, argname);
      } else {
        prelude.askForBasename(this.basename);
      }

      prelude.askForDescription(`generated at ${new Date().toISOString()}`);

      prelude.inputConfig(providedConfig => {

        const chosenOpts = { ...this.opts, ...providedConfig }

        this.generator = new Generator(this.basename, this.directory, chosenOpts);

        prelude.confirmConfig(this.generator.package.definition, confirm => {
          if (confirm.willInstall) {
            this.runGenerator();
          } else {
            console.log("Cancelled...");
            process.exit();
          }
        });
      });
    });

    this.command.parse();
  }

  runGenerator(opts) {
    this.generator.processSource();
    this.generator.processConf();
    this.generator.processGit();
    this.generator.processDocs();
    this.generator.processTests();
    this.generator.processNpm();
  }
}

module.exports = {
  Script
}
