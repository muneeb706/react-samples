import { mount } from '@cypress/react';
import Histogram from './Histogram';

describe('Histogram Component', () => {
  const data = [
    { day: 'One', score: 0.2 },
    { day: 'Two', score: 0.5 },
    { day: 'Three', score: 0.7 },
    { day: 'Four', score: 0.9 },
    { day: 'Five', score: 0.4 },
  ];

  it('renders the histogram with correct data', () => {
    mount(<Histogram data={data} />);
    
    // Check if the bars are rendered
    cy.get('svg').should('exist');
    cy.get('svg').find('g > rect').should('have.length', data.length);

    // Check if the x-axis labels are correct
    data.forEach((item) => {
      cy.get('svg').contains(item.day).should('exist');
    });

    // Check if the y-axis labels are within the expected range
    cy.get('svg').contains('0').should('exist');
    cy.get('svg').contains('1').should('exist');
  });
});