describe('Registration', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Rolebase');
    cy.contains('Créer un compte').click();
    cy.contains('Inscription');
  });

  it('returns a form password validation errors', () => {
    cy.get('input[name="name"]')
      .type('test');
    cy.get('input[name="email"]')
      .type('test@test.com');
    cy.get('input[name="password"]')
      .type('test');

    cy.intercept('http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signUp*').as('register');
    cy.contains('Créer mon compte').click();
    cy.wait('@register')
      .then(() => {
        cy.contains('Ce mot de passe est trop faible');
      });
  });

  it('registers successfully', () => {
    cy.get('input[name="password"]')
      .clear()
      .type('test1234');

    cy.intercept('http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signUp*').as('register');
    cy.contains('Créer mon compte').click();
    cy.wait('@register')
      .then(({ _, response }) => {
        expect(response.statusCode).equal(200);
        expect(response.body).to.have.property('idToken');
      });

    cy.contains('Organisations');
  });

  it('returns a form email validation errors', () => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
    cy.visit('http://localhost:3000/signup');


    cy.get('input[name="name"]')
      .type('test');
    cy.get('input[name="email"]')
      .type('test@test.com');
    cy.get('input[name="password"]')
      .type('test');

    cy.intercept('http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signUp*').as('register');
    cy.contains('Créer mon compte').click();
    cy.wait('@register')
      .then(() => cy.contains('Cette adresse email est déjà utilisée'));
  });
});