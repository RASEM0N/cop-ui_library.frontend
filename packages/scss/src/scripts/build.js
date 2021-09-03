const fs = require("fs");
const path = require("path");
const sass = require("node-sass");
require("colors");

const mainOutputDirectory = "lib";

const logerCreated = (path, type) => {
  switch (type) {
    case "directory": {
      console.log(`** CREATED: ${path} directory`.bgBlack.yellow);
      break
    }
    case "file": {
      console.log(`** CREATED: ${path} file`.bgBlack.blue);
      break
    }
    default: {
      console.log(`** CREATED: ${path}`.bgBlack.white);
      break
    }
  }
}

if (!fs.existsSync(mainOutputDirectory)) {
  fs.mkdirSync(mainOutputDirectory);
  logerCreated(mainOutputDirectory, 'directory')
}

const getComponents = () => {
  let allComponents = [];

  const types = ["atoms", "molecules", "organisms"];

  types.forEach((t) => {
    const allFiles = fs.readdirSync(`src/${t}`).map((f) => {
      return {
        input: `src/${t}/${f}`,
        output: `${mainOutputDirectory}/${f.slice(0, -4)}css`,
      };
    });

    allComponents = [...allComponents, ...allFiles];
  });

  return allComponents;
};

const compile = (inputPath, outputPath) => {
  const filePath = outputPath.split('/')
  const fileName = filePath[filePath.length - 1]
  logerCreated(fileName, 'file')

  const css_result = sass
    .renderSync({
      data: fs.readFileSync(path.resolve(inputPath)).toString(),
      outputStyle: "expanded",
      includePaths: [path.resolve("src")],
    })
    .css.toString();

  fs.writeFileSync(path.resolve(outputPath), css_result);
};

compile("src/global.scss", `${mainOutputDirectory}/global.css`);

getComponents().forEach((c) => {
  compile(c.input, c.output);
});
