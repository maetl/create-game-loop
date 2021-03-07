class Package {
  constructor(basename, isPublic, dependencies) {
    const privateOrVersion = isPublic ? "version" : "private";
    const privateOrVersionVal = isPublic ? "0.0.1" : true;

    this.definition = {
      name: basename,
      [privateOrVersion]: privateOrVersionVal,
      description: `generated at ${new Date()}`,
      main: "src/main.js",
      scripts: {
        start: "snowpack dev",
        build: "snowpack build"
      },
      author: "scrapy mcbullshit",
      license: "MIT",
      dependencies: dependencies,
      devDependencies: {
        snowpack: "^3.0.0"
      }
    }
  }
}

module.exports = {
  Package
}
