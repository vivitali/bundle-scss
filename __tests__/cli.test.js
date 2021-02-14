const path = require("path");
const exec = require("child_process").exec;
const {v4: uuid} = require("uuid");
const rimraf = require('rimraf');

const SANDBOX = "assets"; 

function cli(args, cwd) {
  return new Promise(resolve => {
    console.log(`${path.resolve("./dist/bin/bundle-scss.js")} ${args.join(" ")}`);
    exec(
      `node ${path.resolve("./dist/bin/bundle-scss.js")} ${args.join(" ")}`,
      (error, stdout, stderr) => {
        console.log(error, stdout, stderr, '===============================');
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr
        });
      }
    );
  });
}

function tmp(ext) {
  ext = ext || "";
  return path.join(SANDBOX, uuid(), ext);
}
describe('Build Command', () => {
  test("should create a prototype project by default", async () => {
    const sandbox = tmp();
    let result = await cli(["bundle-scss -m assets/scss/scss.scss -d assets/scss/bundled.scss"]);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain(`mask assets/scss/scss.scss`);
    expect(result.stdout).toContain(`dest assets/scss/bundled.scss`);
    rimraf.sync('./assets');
  });

  test("should create a prototype project by default", async () => {
    const sandbox = tmp();
    let result = await cli(["bundle-scss -m ./src/**/*.theme.scss -d ./bundle/themes.scss"]);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain(`mask ./src/**/*.theme.scss`);
    expect(result.stdout).toContain(`dest ./bundle/themes.scss`);
    rimraf.sync('./bundle');
  });
})
