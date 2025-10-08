const rows = () => cy.get('[data-testid=\"results-row\"]');

describe('Minimālie filtri', () => {
  beforeEach(() => {
    cy.visit('/index.html');
  });

  it('Filtrēšana pēc \"Laboratorija\"', () => {
    cy.get('[data-testid=\"filter-laboratorija\"]').clear().type('gulbja');
    cy.get('[data-testid=\"filter-submit\"]').click();

    rows().should('have.length.at.least', 1);
    rows().each($r => {
      cy.wrap($r).find('[data-testid=\"cell-lab\"]').invoke('text').should('match', /gulbja/i);
    });

    cy.get('[data-testid=\"filter-reset\"]').click();
    rows().its('length').should('be.gte', 3);
  });

  it(' Filtrēšana pēc datumu perioda', () => {
    cy.get('[data-testid=\"filter-date-no\"]').clear().type('01.10.2025');
    cy.get('[data-testid=\"filter-date-lidz\"]').clear().type('03.10.2025');
    cy.get('[data-testid=\"filter-submit\"]').click();

    rows().should('have.length.at.least', 1);

    const inRange = (ddmmyyyy) => {
      const [dd, mm, yyyy] = ddmmyyyy.trim().split('.');
      const iso = `${yyyy}-${mm}-${dd}`;
      return iso >= '2025-10-01' && iso <= '2025-10-03';
    };
    rows().each($r => {
      cy.wrap($r).find('.date > div').invoke('text').then(t => {
        expect(inRange(t)).to.eq(true);
      });
    });

    cy.get('[data-testid=\"filter-reset\"]').click();
    rows().its('length').should('be.gte', 3);
  });
});
