import {TODO_ONE, TODO_TWO, TODO_THREE} from './defaultTodos'

describe('TodoMvc Test', function () {

    beforeEach(function () {
        cy.visit('http://todomvc.com/examples/jquery/#/all');
    });

    it('should add one todo', () => {
        cy.createTodos([TODO_ONE]);
        cy.shouldExist(TODO_ONE);
    });

    it('should delete one todo', () => {

        cy.createTodos([TODO_ONE, TODO_TWO]);

        cy.get(`input[value="${TODO_ONE}"]`)
            .parent()
            .children('.view')
            .children('.destroy')
            .invoke('attr', 'style', 'display: block')
            .click();

        cy.get('.todo-list').contains(TODO_ONE).should('not.exist');
        cy.shouldExist(TODO_TWO);
    });


    it('should delete all items', function () {
        cy.createTodos([TODO_ONE, TODO_TWO, TODO_THREE]);
        cy.get('.todo-list li').each(() => {
            cy.get('.destroy').click({force: true, multiple: true})
        });
        cy.shouldHaveLength(0);
    });

    it('should delete completed items', function () {
        cy.createTodos([TODO_ONE, TODO_TWO, TODO_THREE]);
        cy.toggleTodo(TODO_ONE);
        cy.toggleTodo(TODO_TWO);

        cy.get('.clear-completed')
            .should('be.visible')
            .click();

        cy.get('.clear-completed')
            .should('not.exist');

        cy.shouldHaveLength(1);
        cy.shouldExist(TODO_THREE);


    });

    it('should display active items', function () {
        cy.createTodos([TODO_ONE, TODO_TWO, TODO_THREE]);
        cy.toggleTodo(TODO_TWO);
        cy.displayTodos('Active');
        cy.shouldExist(TODO_ONE);
        cy.shouldExist(TODO_THREE);
        cy.shouldHaveLength(2);
    });


    it('should display completed items', function () {
        cy.createTodos([TODO_ONE, TODO_TWO, TODO_THREE]);
        cy.toggleTodo(TODO_TWO);
        cy.displayTodos('Completed');
        cy.shouldExist(TODO_TWO);
        cy.shouldHaveLength(1);
    });

    it('should display all items', function () {
        cy.createTodos([TODO_ONE, TODO_TWO, TODO_THREE]);
        cy.toggleTodo(TODO_TWO);
        cy.displayTodos('All');
        cy.shouldHaveLength(3);
    });

    it('should display current filter', function () {
        cy.createTodos([TODO_ONE, TODO_TWO, TODO_THREE]);
        cy.shouldFilterSelected('All');
        cy.displayTodos('Active');
        cy.shouldFilterSelected('Active');
        cy.displayTodos('Completed');
        cy.shouldFilterSelected('Completed');

    })
});
