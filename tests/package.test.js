const test = require("ava");
const { Package } = require("../package");

const DEPS = {
  "snowpack": "^3.0.0"
}

test("core package fields", t => {
  const project = new Package("my-game", false, DEPS);
	t.is(project.definition.name, "my-game");
  t.is(project.definition.dependencies.snowpack, "^3.0.0");
});

test("private package structure", t => {
  const project = new Package("my-game", false, DEPS);
	t.true(project.definition.private);
  t.true(project.definition.version === undefined);
});

test("public package structure", t => {
  const project = new Package("my-game", true, DEPS);
	t.is(project.definition.version, "0.0.1");
  t.true(project.definition.private === undefined);
});
