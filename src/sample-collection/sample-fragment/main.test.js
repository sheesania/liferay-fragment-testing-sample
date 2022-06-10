const { screen } = require("@testing-library/dom");
const fs = require("fs");
const path = require("path");

describe("test fragment", () => {
  beforeAll(() => {
    const fragmentConfig = JSON.parse(
      fs.readFileSync(path.join(__dirname, "fragment.json"))
    );
    const { cssPath, htmlPath, jsPath } = fragmentConfig;

    const css = fs.readFileSync(path.join(__dirname, cssPath));
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);

    const html = fs.readFileSync(path.join(__dirname, htmlPath));
    const div = document.createElement("div");
    div.innerHTML = html;
    document.body.appendChild(div);

    window.fragmentElement = div;
    window.configuration = {};
    require("./" + jsPath);
  });

  it("has a tab panel item", () => {
    expect(document.querySelector(".tab-panel-item")).toBeDefined();
    expect(screen.getByRole("tabpanel")).toBeDefined();
  });
});
