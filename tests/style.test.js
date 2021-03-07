const test = require("ava");
const { Style } = require("../style");

test("style label", t => {
  const style = new Style("example");
	t.is(style.label, "example");
});
