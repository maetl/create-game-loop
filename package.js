class Package {
  // TODO: add customisable scripts
  constructor(basename, opts, dependencies) {
    const privateOrVersion = opts.public ? "version" : "private";
    const privateOrVersionVal = opts.public ? opts.version : true;

    this.definition = {
      name: basename,
      description: opts.description,
      [privateOrVersion]: privateOrVersionVal,
      main: "src/main.js",
      scripts: {
        start: "snowpack dev",
        build: "snowpack build"
      },
      author: `${opts.author} <${opts.email}> (${opts.url})`,
      license: opts.license,
      dependencies: dependencies,
      devDependencies: {
        snowpack: "^3.0.0"
      }
    }

    // There are much better ways to do this but not much value in spending
    // extra time overdoing it for now
    if (!opts.public) delete this.definition.license;
  }
}

module.exports = {
  Package
}
