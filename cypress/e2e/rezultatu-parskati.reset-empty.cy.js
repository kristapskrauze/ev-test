// <reference types="cypress" />

const rows = () => cy.get('[data-testid="results-row"]');

describe('Reset un tukšais state', () => {
  beforeEach(() => {
    cy.visit('/index.html');
  });

  it('Notīrīt poga atgriež pilnu sarakstu un noņem aktīvos filtrus', () => {
    // aktivizē vairākus filtrus
    cy.get('[data-testid="filter-laboratorija"]').type('gulbja');
    cy.get('#areaBtn').click();
    cy.contains('#areaMenu .ms-option', 'Asinsanalīzes').click();
    cy.get('body').click(0,0);
    cy.contains("[data-testid='status-chip']", 'Pabeigts').click();
    cy.get('[data-testid="filter-submit"]').click();

    rows().its('length').then(cnt => {
      expect(cnt).to.be.greaterThan(0);
    });

    cy.get('[data-testid="filter-reset"]').click();

    // jomu label reset uz domuzīmi
    cy.get('#areaLabel').should('have.text', '—');

    // statusa čipi neaktīvi (vizuāli pārbaudīt izmantojot aria-pressed)
    cy.contains("[data-testid='status-chip']", 'Pabeigts').should('have.attr', 'aria-pressed', 'false');

    rows().its('length').should('be.gte', 3);
  });

  it('Nederīgs filtrs -> parādās empty stāvoklis', () => {
    cy.get('[data-testid="filter-laboratorija"]').type('ZZZ__NEKAS__');
    cy.get('[data-testid="filter-submit"]').click();
    cy.get('#emptyState').should('not.have.attr', 'hidden');
    rows().should('have.length', 0);
  });
});
