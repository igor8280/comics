// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:9999/login',
        body: {
            username: 'admin',
            password: 'password'
        }
    }).then((response) => {
        cy.getCookies().then((response) => {
            expect(response[0]).to.have.property('name', 'payload');
            expect(response[1]).to.have.property('name', 'signature');
        });
    });
});

Cypress.Commands.add('dropDB', () => {
    cy.request({url: 'db-drop', method: 'POST'}).then((response) => {
        expect(response).to.have.property('headers');
        expect(response.status).to.eq(200);
        expect(response.body.message).to.equal('Database dropped!');
    });
});
