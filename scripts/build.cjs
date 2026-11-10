const path = require('node:path');
const { rollup } = require('rollup');
const loadConfigFile = require(path.join(path.dirname(require.resolve('rollup')), 'loadConfigFile.js'));

async function build() {
  const { options, warnings } = await loadConfigFile(path.resolve('rollup.config.js'));
  warnings.flush();
  for (const config of options) {
    const bundle = await rollup(config);
    try {
      for (const output of config.output) {
        await bundle.write(output);
      }
    } finally {
      // Close plugin workers so the build exits after writing the bundles.
      await bundle.close();
    }
  }
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
