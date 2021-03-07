const test = require("ava");
const { Preset } = require("../preset");

test("preset label", t => {
  const preset = new Preset("caves");
	t.is(preset.label, "caves");
});
