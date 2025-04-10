import fs from "fs";
import path from "path";

let page = 1;

while (1) {
  const src = `./dist/page/${page}.html`;
  const destDir = `./dist/page/${page}`;
  const dest = path.join(destDir, "index.html");

  if (fs.existsSync(src)) {
    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(src, dest);
    fs.unlinkSync(src);
  } else {
    break;
  }

  page++;
}
