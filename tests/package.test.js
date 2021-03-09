const test = require("ava");
const { Package } = require("../package");

const OPTS_PRIVATE = {
  public: false,
  description: "::::mygame::::",
  author: "Mark Rickerby",
  email: "me@maetl.net",
  url: "https://maetl.net"
}

const OPTS_PUBLIC = { ...OPTS_PRIVATE, public: true, version: "1.2.3", license: "MIT"}

const DEPS = {
  "snowpack": "^3.0.0"
}

test("core package fields", t => {
  const project = new Package("my-game", OPTS_PRIVATE, DEPS);
	t.is(project.definition.name, "my-game");
	t.is(project.definition.description, "::::mygame::::");
	t.is(project.definition.author, "Mark Rickerby <me@maetl.net> (https://maetl.net)");
  t.is(project.definition.dependencies.snowpack, "^3.0.0");
});

test("private package structure", t => {
  const project = new Package("my-game", OPTS_PRIVATE, DEPS);
	t.true(project.definition.private);
  t.true(project.definition.version === undefined);
});

test("public package structure", t => {
  const project = new Package("my-game", OPTS_PUBLIC, DEPS);
	t.is(project.definition.version, "1.2.3");
  t.true(project.definition.private === undefined);
});
