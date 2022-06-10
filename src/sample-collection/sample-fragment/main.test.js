const { screen } = require("@testing-library/dom");
const fs = require("fs");
const path = require("path");
const Freemarker = require("freemarker");

describe("test fragment", () => {
  beforeAll((done) => {
    const configuration = {
      numberOfTabs: 4,
    };
    const mockNamespace = "mockNamespace";

    const fragmentConfig = JSON.parse(
      fs.readFileSync(path.join(__dirname, "fragment.json"))
    );
    const { cssPath, htmlPath, jsPath } = fragmentConfig;

    const css = fs.readFileSync(path.join(__dirname, cssPath));
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);

    const html = fs.readFileSync(path.join(__dirname, htmlPath));
    const freemarker = new Freemarker({ tagSyntax: "squareBracket" });
    freemarker.render(
      html,
      {
        fragmentEntryLinkNamespace: mockNamespace,
        configuration: configuration,
      },
      (err, freemarkerResult) => {
        if (err) {
          throw new Error(err);
        }

        const div = document.createElement("div");
        div.innerHTML = freemarkerResult;
        document.body.appendChild(div);

        window.fragmentElement = div;
        window.fragmentNamespace = mockNamespace;
        window.configuration = configuration;
        require("./" + jsPath);
        done();
      }
    );
  });

  it("has 4 tab panel items", () => {
    expect(screen.getAllByRole("tabpanel").length).toBe(4);
  });
});
