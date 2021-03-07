const test = require("ava");
const { Project } = require("../project");

test("project structure", t => {
  const project = new Project("my-game", "/Users/xoxo/code/my-game");
	t.is(project.basename, "my-game");
	t.is(project.directory, "/Users/xoxo/code/my-game");
});
