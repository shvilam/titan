
describe('Server API', () => {
  it('should add data and show response', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Add Data').click();
    cy.contains('Data inserted');
  });
});

