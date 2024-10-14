import { mount } from "@cypress/react";
import HistogramCard from "../../src/graphs/HistogramCard";

describe("HistogramCard Component", () => {
  it("renders the HistogramCard with current data", () => {
    mount(<HistogramCard />);

    // Check if the card title is rendered
    cy.get(".card-title").contains("Histogram").should("exist");

    // Check if the current histogram is rendered
    cy.get("svg").should("exist");
    cy.get("svg").find("g > rect").should("have.length", 5); // 5 bars

    // Check if the button to view past scores is rendered
    cy.get("button").contains("View Past Scores").should("exist");
  });

  it.only('opens the modal and displays past histograms', () => {
    mount(<HistogramCard />);
    
    // Click the button to open the modal
    cy.get('button').contains('View Past Scores').click();

    // Check if the past histograms are rendered in the modal
    cy.get('.modal-body').within(() => {
      cy.get('h5').contains('2023-10-01').should('exist');
      cy.get('h5').contains('2023-10-02').should('exist');

      // Check if the histograms are rendered
      cy.get('svg').should('have.length', 2); // Two past histograms
    });

    // Close the modal
    cy.get('.modal-footer').contains('Close').click();
  });
});
