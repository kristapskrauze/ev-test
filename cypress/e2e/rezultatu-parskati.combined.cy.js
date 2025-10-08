// <reference types="cypress" />

const rows = () => cy.get('[data-testid="results-row"]');

describe('Kombinētie filtri (lab + datumi + joma + statuss)', () => {
  beforeEach(() => {
    cy.visit('/index.html');
  });

  it('Centrālā + Ķīmija + Pabeigts + 01–07.10.2025 => tieši pirmā rinda (ALAT/ASAT)', () => {
    cy.get('[data-testid="filter-laboratorija"]').type('centr');
    cy.get('#dateFrom').type('01.10.2025');
    cy.get('#dateTo').type('07.10.2025');

    // joma: Ķīmija
    cy.get('#areaBtn').click();
    cy.contains('#areaMenu .ms-option', 'Ķīmija').click();
    cy.get('body').click(0,0);

    // statuss: Pabeigts
    cy.contains("[data-testid='status-chip']", 'Pabeigts').click();

    // atlasīt
    cy.get('[data-testid="filter-submit"]').click();

    rows().should('have.length', 1);
    rows().first().find('.title').should('contain', 'ALAT/ASAT');
    rows().first().find('[data-testid="cell-lab"]').invoke('text').should('match', /CENTRĀLĀ|Centrālā/i);
  });
});
