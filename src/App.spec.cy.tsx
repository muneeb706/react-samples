import { mount } from "@cypress/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  it("renders the link to the PDF modification page", () => {
    mount(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
    cy.get('a[href="/pdf-w-form"]').should("exist");
  });
});
