// <reference types="cypress" />

const rows = () => cy.get('[data-testid="results-row"]');

describe('Laboratorija: case insesitive un apgriež atstarpes', () => {
  beforeEach(() => {
    cy.visit('/index.html');
  });

  it('Ievade ar dažādu case un atstarpēm rāda tos pašus rezultātus', () => {
    const query1 = '  gulBJA  ';
    const query2 = 'gulbja';

    cy.get('[data-testid="filter-laboratorija"]').clear().type(query1);
    cy.get('[data-testid="filter-submit"]').click();
    cy.wrap(null).then(() => Cypress.$('[data-testid="results-row"]').length).as('count1');

    cy.get('[data-testid="filter-reset"]').click();

    cy.get('[data-testid="filter-laboratorija"]').clear().type(query2);
    cy.get('[data-testid="filter-submit"]').click();
    cy.wrap(null).then(() => Cypress.$('[data-testid="results-row"]').length).as('count2');

    cy.get('@count1').then(c1 => {
      cy.get('@count2').then(c2 => {
        expect(c1).to.eq(c2);
      });
    });
  });
});
