const { default: axios } = require("axios");

const fs = require("fs");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log("Error:", err);
      process.kill(1);
    }
    console.log("Data:", data);
  });
}

async function webCat(url) {
  try {
    let response = await axios.get(url);
    console.log(response.data);
  } catch {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let path = process.argv[2];

if (path.slice(0, 4) === "http") {
  webCat(path);
} else {
  cat(path);
}
