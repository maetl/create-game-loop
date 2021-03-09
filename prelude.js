const { exec } = require("child_process");
const inquirer = require('inquirer');
const ini = require("ini");

class Prelude {
  constructor(opts) {
    this.opts = opts;
    this.questions = [];
  }

  // TODO: lots of duplication in these questions but this is reserved
  // for adding validation functions and different types of controls.

  askForBasename(basename) {
    this.questions.push({
      name: "basename",
      type: "input",
      message: "package name:",
      default: basename
    });
  }

  askForVersion(version) {
    this.questions.push({
      name: "version",
      type: "input",
      message: "version:",
      default: version
    });
  }

  askForDescription(description) {
    this.questions.push({
      name: "description",
      type: "input",
      message: "description:",
      default: description
    });
  }

  askForLicense(license) {
    this.questions.push({
      name: "license",
      type: "input",
      message: "license:",
      default: license
    });
  }

  askForKeywords(keywords) {
    this.questions.push({
      name: "keywords",
      type: "input",
      message: "keywords:",
      default: keywords
    });
  }

  askForAuthor(author) {
    this.questions.push({
      name: "author",
      type: "input",
      message: "author:",
      default: author
    });
  }

  askForEmail(email) {
    this.questions.push({
      name: "email",
      type: "input",
      message: "email:",
      default: email
    });
  }

  askForUrl(url) {
    this.questions.push({
      name: "url",
      type: "input",
      message: "url:",
      default: url
    });
  }

  assumeDefaults() {
    return this.questions.reduce((defaults, question) => {
      defaults[question.name] = question.default;
      return  defaults;
    }, {});
  }

  inputConfig(callback) {
    exec("npm config ls -l", (error, stdout, stderror) => {
      // If error, display help message about configuring NPM

      const config = ini.parse(stdout);

      if (this.opts.public) {
        this.askForVersion(config["init.version"] || config["init-version"]);
        this.askForLicense(config["init.license"] || config["init-license"]);
        this.askForKeywords("browser games ");
      }

      this.askForAuthor(config["init.author.name"] || config["init-author-name"])
      this.askForEmail(config["init.author.email"] || config["init-author-email"])
      this.askForUrl(config["init.author.url"] || config["init-author-url"])

      if (this.opts.yes) {
        const defaultResult = this.assumeDefaults();
        callback(defaultResult);
      } else {
        inquirer.prompt(this.questions).then(promptResult => {
          // Filter/merge config here when needed
          callback(promptResult);
        });
      }
    });
  }

  confirmConfig(definition, callback) {
    if (this.opts.yes) {
      // TODO: handle dry-run opt
      callback({ willInstall: true });
    } else {
      console.log("About to write:")
      console.log(definition);

      inquirer.prompt({
        name: "willInstall",
        type: "confirm",
        message: "Is this OK?",
        default: true
      }).then(callback);
    }
  }
}

module.exports = {
  Prelude
}
