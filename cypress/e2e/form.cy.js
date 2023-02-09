//cy.get('[data-cy=submit]').click()

//arrange
describe("My First Test", function () {
  //act
  it("Does not do much", function () {
    //assert
    expect(true).to.equal(true);
  });
});

describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
  });
});

describe("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it(".type() - type into a DOM element", () => {
    cy.get("[data-cy=isimInput]").type("Onur").should("have.value", "Onur");
    cy.get("[data-cy=emailInput]")
      .type("onur@gmail.com")
      .should("have.value", "onur@gmail.com");
    cy.get("[data-cy=passwordInput]")
      .type("123456")
      .should("have.value", "123456");
    cy.get("[data-cy=checkboxInput]").check().should("be.enabled");
  });

  it(".submit() - submit a form", () => {
    cy.get("[data-cy=submitForm]").submit();
  });
  it("form temizle", () => {
    cy.get("[data-cy=clearButton]").click();
  });
  it("form temizlendimi", () => {
    cy.get("[data-cy=isimInput]").should("have.value", "");
  });
});

describe("1 input boşken test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it(".type() - type into a DOM element", () => {
    cy.get("[data-cy=isimInput]").type("Onur").should("have.value", "Onur");
    cy.get("[data-cy=emailInput]")
      .type("onur@gmail.com")
      .should("have.value", "onur@gmail.com");
    cy.get("[data-cy=checkboxInput]").check().should("be.enabled");
    cy.get("[data-cy=submitButton]").click();
  });
});
