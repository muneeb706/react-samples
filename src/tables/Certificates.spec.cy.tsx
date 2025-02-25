import { mount } from "@cypress/react";
import Certificates from "../../src/tables/Certificates"; // Adjust the import path as needed
import "../../src/index.css"; // Import any necessary styles

describe("Certificates Component", () => {
  beforeEach(() => {
    // Mount the Certificates component
    mount(<Certificates />);
  });

  it("should render the table with certificate data", () => {
    // Check if the table is rendered
    cy.get('[data-testid="certificate-table-container"] table').should("exist");

    // Check if the table headers are rendered
    cy.get('[data-testid="certificate-table-container"] th')
      .contains("Certificate Code")
      .should("exist");
    cy.get('[data-testid="certificate-table-container"] th')
      .contains("Certificate Label")
      .should("exist");
    cy.get('[data-testid="certificate-table-container"] th')
      .contains("Is Active")
      .should("exist");
    cy.get('[data-testid="certificate-table-container"] th')
      .contains("Expiry")
      .should("exist");
    cy.get('[data-testid="certificate-table-container"] th')
      .contains("Action")
      .should("exist");
  });

  it("should filter certificates by certificate code", () => {
    // Type in the filter input for Certificate Code
    cy.get('input[placeholder="Search..."]').first().type("CERT001");

    // Check if the table is filtered correctly
    cy.get('[data-testid="certificate-table-container"] tbody tr').should(
      "have.length",
      1
    );
    cy.get('[data-testid="certificate-table-container"] tbody tr td')
      .first()
      .should("contain", "CERT001");
  });

  it("should filter certificates by isActive status", () => {
    // Select "Yes" in the Is Active filter
    cy.get("select").eq(0).select("true");

    // Check if the table is filtered correctly
    cy.get('[data-testid="certificate-table-container"] tbody tr').each(
      ($row) => {
        cy.wrap($row).find("td").eq(2).should("contain", "Yes");
      }
    );
  });

  it("should filter certificates by expiry status", () => {
    // Select "Yes" in the Expiry filter
    cy.get("select").eq(1).select("Yes");

    // Check if the table is filtered correctly
    cy.get('[data-testid="certificate-table-container"] tbody tr').each(
      ($row) => {
        cy.wrap($row).find("td").eq(3).should("contain", "Yes");
      }
    );
  });

  //   it("should navigate to the users page when clicking View Users link", () => {
  //     // Click the View Users link
  //     cy.get("a").contains("View Users").first().click();

  //     // Check if the URL is correct
  //     cy.url().should("include", "/users/CERT001");
  //   });
});
