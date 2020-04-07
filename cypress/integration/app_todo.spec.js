const TODO_ONE = 'to do task 1';
const TODO_TWO = 'to do task 2';
const TODO_THREE = 'to do task 3';
const TODO_FOUR = 'to do task 4';
const TODO_FIVE = 'to do task 5';

describe('TodoMvc Test', function () {

    beforeEach(function () {
        cy.visit('http://todomvc.com/examples/jquery/#/all');
    });

    it('should add one todo', () => {
        cy.initTodosList([TODO_ONE]);
        cy.todosShouldHaveLength(1);
        cy.todosShouldContain(TODO_ONE);
    })

    it('should delete one todo', () => {

        cy.initTodosList([TODO_ONE, TODO_TWO]).as('todoList');

        cy.get('@todoList').contains(TODO_ONE).parent()
        .find('.destroy')
        .invoke('show').click()

        cy.get('.todo-list').contains(TODO_ONE).should('not.exist');
        cy.todosShouldContain(TODO_TWO);
    })


    // Delete All tasks 
    it('should delete all tasks', ()=>{
        
        cy.initTodosList([TODO_ONE, TODO_TWO, TODO_THREE, TODO_FOUR, TODO_FIVE]).as('todoList')
        
        cy.get('@todoList').find('.view>label').each(($el)=>{
            cy.get('@todoList').contains($el.text()).parent().find('.destroy').invoke('show').click()
        })
        cy.todosShouldHaveLength(0)
    })
    

    // Delete all completed tasks
    it('should delete completed tasks', ()=>{
        cy.initTodosList([TODO_ONE, TODO_TWO, TODO_THREE, TODO_FOUR, TODO_FIVE])
        cy.checkTasksAsCompleted([TODO_ONE, TODO_TWO, TODO_FOUR])
        cy.get('.clear-completed').should('be.visible').click()
        cy.get('.clear-completed').should('not.exist')
        cy.todosShouldHaveLength(2)
        cy.todosShouldContain(TODO_THREE)
        cy.todosShouldContain(TODO_FIVE)
        
    })

    it('should display active items', function () {
        cy.initTodosList([TODO_ONE, TODO_TWO, TODO_THREE]);
        cy.toggleTodo(TODO_TWO);
        cy.displayTodos('Active');
        cy.todosShouldContain(TODO_ONE);
        cy.todosShouldContain(TODO_THREE);
        cy.todosShouldHaveLength(2);
    });


    it('should display completed items', function () {
        cy.initTodosList([TODO_ONE, TODO_TWO, TODO_THREE]);
        cy.toggleTodo(TODO_TWO);
        cy.displayTodos('Completed');
        cy.todosShouldContain(TODO_TWO);
        cy.todosShouldHaveLength(1);
    });

    it('should display all items', function () {
        cy.initTodosList([TODO_ONE, TODO_TWO, TODO_THREE]);
        cy.toggleTodo(TODO_TWO);
        cy.displayTodos('All');
        cy.todosShouldHaveLength(3);
    });

    it('should display current filter', function () {
        cy.initTodosList([TODO_ONE, TODO_TWO, TODO_THREE]);
        cy.shouldFilterSelected('All');
        cy.displayTodos('Active');
        cy.shouldFilterSelected('Active');
        cy.displayTodos('Completed');
        cy.shouldFilterSelected('Completed');

    })
});
