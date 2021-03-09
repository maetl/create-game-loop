const test = require("ava");
const { Prelude } = require("../prelude");

const OPTS = {
  yes: true,
  public: false
}

test("assume question defaults", t => {
  const prelude = new Prelude({ yes: true });
  prelude.askForBasename("my-new-project");
  prelude.askForLicense("MIT");

  const defaults = prelude.assumeDefaults();
	t.is(defaults.basename, "my-new-project");
	t.is(defaults.license, "MIT");
  t.true(defaults.version === undefined);
});
