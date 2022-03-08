describe('Login', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Rolebase');
  });

  it('returns a login error', () => {
    cy.get('input[name="email"]')
      .type('test@test.com');
    cy.get('input[name="password"]')
      .type('test');

    cy.intercept('http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signIn*').as('login');
    cy.contains('Connexion').click();
    cy.wait('@login')
      .then(() => {
        cy.contains('Mot de passe incorrect');
      });
  });

  it('login successfully', () => {
    cy.get('input[name="password"]')
      .clear()
      .type('test1234');

    cy.intercept('http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signIn*').as('login');
    cy.contains('Connexion').click();
    cy.wait('@login')
      .then(({ _, response }) => {
        expect(response.statusCode).equal(200);
        expect(response.body).to.have.property('idToken');
      });

    // Bug
    // cy.contains('Organisations')
  });
});