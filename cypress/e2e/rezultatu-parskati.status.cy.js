// <reference types="cypress" />

const rows = () => cy.get('[data-testid="results-row"]');

describe('Statusa čipi — filtrēšana', () => {
  beforeEach(() => {
    cy.visit('/index.html');
  });

  function clickChip(text){
    cy.contains("[data-testid='status-chip']", text).click();
  }

  it('Var ieslēgt/izslēgt vienu statusu', () => {
    clickChip('Pabeigts');
    rows().should('have.length.at.least', 1);
    rows().each($r => cy.wrap($r).contains('.status-pill', 'Pabeigts'));

    // izslēgt
    clickChip('Pabeigts');
    // pēc izslēgšanas redzamo rindu skaits kļūst >= sākotnējā (neprecīzi, bet pārbauda, ka filtrs noņemts)
    rows().its('length').should('be.gte', 3);
  });

  it('Var atlasīt vairākus statusus (Pabeigts + Anulēts)', () => {
    clickChip('Pabeigts');
    clickChip('Anulēts');

    rows().should('have.length.at.least', 1);
    rows().each($r => {
      cy.wrap($r).find('.status-pill').invoke('text').then(t => {
        expect(/Pabeigts|Anulēts/.test(t)).to.eq(true);
      });
    });
  });
});
