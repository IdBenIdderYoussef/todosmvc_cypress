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

Cypress.Commands.add('createTodos', function (todos) {
    todos.map(todo => cy.get('.new-todo').type(`${todo}{enter}`));
});

Cypress.Commands.add('displayTodos', function (category) {
    cy.get('.filters')
        .contains(category)
        .click();
});

Cypress.Commands.add('toggleTodo', function (todo) {
    cy.get('.todo-list li')
        .contains(todo)
        .parent()
        .find('.toggle')
        .check();
});

Cypress.Commands.add('shouldHaveLength', function (size) {
    cy.get('.todo-list li')
        .should('have.length', size);
});


Cypress.Commands.add('shouldExist', function (todo) {
    cy.get('.todo-list li')
        .should('contain', todo);
});


Cypress.Commands.add('shouldFilterSelected', function (filter) {
    cy.get('.filters').within(function () {
        cy.contains(filter).should('have.class', 'selected');
    });
});
