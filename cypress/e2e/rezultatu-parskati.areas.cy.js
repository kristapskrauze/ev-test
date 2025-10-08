// <reference types="cypress" />

const rows = () => cy.get('[data-testid="results-row"]');

describe('Jomu multi-select (custom dropdown)', () => {
  beforeEach(() => {
    cy.visit('/index.html');
  });

  it('Atver/ aizver izvēlni un atjauno pogas labeli', () => {
    cy.get('#areaBtn').click();
    cy.get('#areaMenu').should('be.visible');

    cy.contains('#areaMenu .ms-option', 'Asinsanalīzes').click();
    cy.contains('#areaMenu .ms-option', 'Ķīmija').click();

    cy.get('#areaLabel').invoke('text').should('match', /Asinsanalīzes.*Ķīmija|Ķīmija.*Asinsanalīzes/);

    // klikšķis ārpus - aizver
    cy.get('body').click(0,0);
    cy.get('#areaMenu').should('not.be.visible');
  });

  it('Filtrē pēc vairākām jomām (Asinsanalīzes + Ķīmija)', () => {
    cy.get('#areaBtn').click();
    cy.contains('#areaMenu .ms-option', 'Asinsanalīzes').click();
    cy.contains('#areaMenu .ms-option', 'Ķīmija').click();
    cy.get('body').click(0,0); // aizver

    rows().should('have.length.at.least', 1);
    // netiešā verifikācija - aktivizējot arī statusu, skatāmies uz rezultātu daudzumu izmaiņām, var arī matchot ierakstus 1 pret 1
    cy.contains("[data-testid='status-chip']", 'Pabeigts').click();
    rows().should('have.length.at.least', 1);
  });
});
