const test = require("ava");
const { Generator } = require("../generator");

test("generator requirements", t => {
  const generator = new Generator("coolrl", "/usr/local/coolrl", {
    yes: true,
    repo: true,
    preset: "caves",
    standard: "maetl-xxy",
    style: "maetl-oox",
    install: false
  });
  t.is(generator.project.basename, "coolrl");
  t.is(generator.project.directory, "/usr/local/coolrl");
	t.true(generator.skipInteractive);
	t.true(generator.initializeGitRepo);
	t.false(generator.installNodeModules);
	t.is(generator.preset.label, "caves");
	t.is(generator.standard.label, "maetl-xxy");
	t.is(generator.style.label, "maetl-oox");
});

test("unknown preset", t => {
  t.throws(() => {
    const generator = new Generator("coolrl", "/usr/local/coolrl", {
      yes: true,
      repo: true,
      preset: "maetl-caves",
      standard: "maetl-xxy",
      style: "maetl-oox"
    });
  }, {instanceOf: Error, message: "Unknown preset: maetl-caves"});

});
