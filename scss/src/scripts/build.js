const fs = require("fs");
const path = require("path");
const sass = require("node-sass");

// scss to css
const css_result = sass.renderSync({
  data: fs.readFileSync(path.resolve("src/global.scss")).toString(),
  outputStyle: "expanded",
  includePaths: [path.resolve("src")],
});

// console.log(css_result.css)            buffer
// console.log(css_result.css.toString()) css code

// save css code
fs.writeFileSync(path.resolve("src/lib/global.css"), css_result.css.toString());
