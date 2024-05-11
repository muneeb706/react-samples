import { mount } from "@cypress/react";
import DynamicPDFForms from "./DynamicPDFForms";

describe("DynamicPDFForms", () => {
  it("renders successfully", () => {
    mount(<DynamicPDFForms />);
    cy.get("h1").contains("Dynamic PDF Form");
  });

  it("loads the PDF document", () => {
    mount(<DynamicPDFForms />);
    cy.get(".react-pdf__Document").should("exist");
  });
});
