const { screen } = require("@testing-library/dom");
const setupLiferayFragmentTest = require("setup-liferay-fragment-test");

describe("test fragment", () => {
  beforeAll((done) => {
    const configuration = {
      numberOfTabs: 4,
    };
    const mockNamespace = "mockNamespace";

    setupLiferayFragmentTest(configuration, mockNamespace, done);
  });

  it("has 4 tab panel items", () => {
    expect(screen.getAllByRole("tabpanel").length).toBe(4);
  });
});
