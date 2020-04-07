// this command initialize 'todo-list' with a list of todos 
Cypress.Commands.add('initTodosList', function (todos) {
    todos.map(todo => cy.get('.new-todo').type(todo.concat(' {enter}')));
    return cy.get('.todo-list li')
});

// this command check as completed all tasks received in the Array Parameter 'TasksList'
Cypress.Commands.add("checkTasksAsCompleted",(TasksList)=>{
    cy.wrap(TasksList).each((Task, index, ListOfTasksList)=>{
        cy.get('.todo-list li .view>label').contains(Task).parent().find('.toggle').check();
    })
})

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

Cypress.Commands.add('todosShouldHaveLength', function (size) {
    cy.get('.todo-list li')
        .should('have.length', size);
});


Cypress.Commands.add('todosShouldContain', function (todo) {
    cy.get('.todo-list li')
        .should('contain', todo);
});


Cypress.Commands.add('shouldFilterSelected', function (filter) {
    cy.get('.filters').within(function () {
        cy.contains(filter).should('have.class', 'selected');
    });
});
