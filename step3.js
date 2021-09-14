const { default: axios } = require("axios");

const fs = require("fs");

function handleOutput(text, output) {
  if (output) {
    fs.writeFile(out, text, "utf8", function (err) {
      if (err) {
        console.error(`Couldn't write ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log("Error:", err);
      process.kill(1);
    }
    handleOutput(data, out);
  });
}

async function webCat(url) {
  try {
    let response = await axios.get(url);
    handleOutput(response.data, out);
  } catch {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let path;
let out;

if (process.argv[2] === "--out") {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === "http") {
  webCat(path);
} else {
  cat(path);
}
