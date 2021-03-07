const path = require("path");
const { Command } = require("commander");
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
    this.command.option("-s, --standard", "Formatting standard", "maetl-example");
    this.command.option("-d --style", "Software design convention", "oo-entities");
    this.command.option("-p --public", "Open source package", false);
    this.command.option("-i --install", "Install node modules", false);
    this.command.action(argname => {
      this.basename = argname;
      this.directory = path.resolve(process.env.PWD, argname);
      // inquirer.prompt([{
      //   {type: "input", name: "basename", "package name:"},
      //   {type: "input", name: "version", "version:"},
      //   {type: "input", name: "description", "description:"},
      //   {type: "input", name: "keywords", "description:"},
      // ]);
      // this.generator = new Generator(
      //   this.basename,
      //   this.directory,
      //   this.command.opts()
      // );
      // About to write:
      // console.log(this.generator.package.definition);
      // Is this OK? (yes/no)
    });
  }

  run() {
    this.command.parse();
    this.generator = new Generator(
      this.basename,
      this.directory,
      this.command.opts()
    );
    this.generator.processSource();
    this.generator.processConf();
    this.generator.processGit();
    this.generator.processDocs();
    this.generator.processTests();
    this.generator.processNpm();
  }
}

console.log("Hello from JS create-game-loop");

const script = new Script();
script.run();
