import * as sinon from "sinon";
import * as chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const { expect } = chai;

describe("Test Inicial", () => {
  it("Sub-teste", () => {
    expect(true).to.be.eq(true);
  });
});
