/// <reference types="cypress" />

import { mount } from "cypress/react";
import Congratulations from "./Congratulations";

describe("Congratulations Component", () => {
  beforeEach(() => {
    mount(<Congratulations />);
  });

  it("should display the congratulations message", () => {
    cy.contains("Congratulations!").should("be.visible");
  });

  it("should display the correct test completion message", () => {
    cy.contains("You have completed Day Two Test").should("be.visible");
  });

  it("should display the party popper image", () => {
    cy.get('img[alt="Party Popper"]').should("be.visible");
  });

  it("should display the progress items", () => {
    cy.contains("Day One").should("be.visible");
    cy.contains("Day Two").should("be.visible");
    cy.contains("Day Three").should("be.visible");
  });

  it("should display the confetti on page load", () => {
    cy.get("canvas").should("be.visible"); // Confetti is rendered on a canvas element
  });
});
