// <reference types="cypress" />

const rows = () => cy.get('[data-testid="results-row"]');

describe('Pamatpieejamība — tastatūra', () => {
  beforeEach(() => {
    cy.visit('/index.html');
  });

  it('Statusa čips reaģē uz Space', () => {
    cy.contains("[data-testid='status-chip']", 'Pabeigts').focus().type(' ');
    rows().should('have.length.at.least', 1);
    rows().each($r => cy.wrap($r).contains('.status-pill', 'Pabeigts'));
  });

  it('Jomu izvēlne: Enter uz izvēlnes vienības toggle + Esc aizver', () => {
    cy.get('#areaBtn').click();
    cy.contains('#areaMenu .ms-option', 'Endokrinoloģija').focus().type('{enter}');
    cy.get('#areaLabel').should('contain', 'Endokrinoloģija');
    cy.get('body').type('{esc}');
    cy.get('#areaMenu').should('not.be.visible');
  });
});
