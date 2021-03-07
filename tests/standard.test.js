const test = require("ava");
const { Standard } = require("../standard");

test("standard label", t => {
  const standard = new Standard("example");
	t.is(standard.label, "example");
});
