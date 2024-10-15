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

    // Check if the dropdown filter is rendered
    cy.get("select").should("exist");
  });

  it("updates the histogram when a past assignment is selected", () => {
    mount(<HistogramCard />);

    // Select a past assignment from the dropdown
    cy.get("select").select("2023-10-01");

    // Check if the histogram is updated
    cy.get("h5").contains("2023-10-01").should("exist");
    cy.get("svg").should("exist");
    cy.get("svg").find("g > rect").should("have.length", 5); // 5 bars for the selected date
  });

  it("updates the histogram when 'Last Assignment' is selected", () => {
    mount(<HistogramCard />);

    // Select 'Last Assignment' from the dropdown
    cy.get("select").select("Last Assignment");

    // Check if the histogram is updated
    cy.get("h5").contains(new Date().toISOString().split('T')[0]).should("exist");
    cy.get("svg").should("exist");
    cy.get("svg").find("g > rect").should("have.length", 5); // 5 bars for the current data
  });
});