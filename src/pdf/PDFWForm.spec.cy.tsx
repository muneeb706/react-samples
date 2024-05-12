import { mount } from "@cypress/react";
import PDFWForm from "./PDFWForm";

describe("DynamicPDFForms", () => {
  it("renders successfully", () => {
    mount(<PDFWForm />);
    cy.get("h1").contains("PDF with form (not editable on browser)");
  });

  it("loads the PDF document", () => {
    mount(<PDFWForm />);
    cy.get(".react-pdf__Document").should("exist");

    // Check that the download button has the correct attributes
    cy.get('a[download="modified.pdf"]').should('have.attr', 'href').and('match', /^blob:/);
  
  });
});
