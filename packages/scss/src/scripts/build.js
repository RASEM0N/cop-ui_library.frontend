const fs = require("fs");
const path = require("path");
const sass = require("node-sass");

const getComponents = () => {
  let allComponents = [];

  const types = ["atoms", "molecules", "organisms"];

  types.forEach((t) => {
    const allFiles = fs.readdirSync(`src/${t}`).map((f) => {
      return {
        input: `src/${t}/${f}`,
        output: `lib/${f.slice(0, -4)}css`,
      };
    });

    allComponents = [...allComponents, ...allFiles];
  });

  return allComponents;
};

const compile = (inputPath, outputPath) => {
  console.log({
    from: inputPath,
    to: outputPath,
  });

  const css_result = sass
    .renderSync({
      data: fs.readFileSync(path.resolve(inputPath)).toString(),
      outputStyle: "expanded",
      includePaths: [path.resolve("src")],
    })
    .css.toString();

  fs.writeFileSync(path.resolve(outputPath), css_result);
};

compile("src/global.scss", "lib/global.css");

getComponents().forEach((c) => {
  compile(c.input, c.output);
});
