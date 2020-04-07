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
        cy.shouldExist(TODO_ONE);
    })

    it('should delete one todo', () => {

        cy.initTodosList([TODO_ONE, TODO_TWO]).as('todoList');

        cy.get('@todoList').contains(TODO_ONE).parent()
        .find('.destroy')
        .invoke('show').click()

        cy.get('.todo-list').contains(TODO_ONE).should('not.exist');
        cy.shouldExist(TODO_TWO);
    })


    // Delete All tasks 
    it('should delete all tasks', ()=>{
        
        cy.initTodosList([TODO_ONE, TODO_TWO, TODO_THREE, TODO_FOUR, TODO_FIVE]).as('todoList')
        
        cy.get('@todoList').find('.view>label').each(($el)=>{
            cy.get('@todoList').contains($el.text()).parent().find('.destroy').invoke('show').click()
        })
        cy.get('@todoList').should('have.length',0)
    })
    

    // Delete all completed tasks
    it('should delete completed tasks', ()=>{
        cy.initTodosList([TODO_ONE, TODO_TWO, TODO_THREE, TODO_FOUR, TODO_FIVE]).as('todoList')
        cy.checkTasksAsCompleted([TODO_ONE, TODO_TWO, TODO_FOUR])
        cy.get('.clear-completed').should('be.visible').click()
        cy.get('.clear-completed').should('not.exist')
        cy.get('@todoList').should('have.length',2)
        cy.get('@todoList').should( 'contain' , TODO_THREE )
        cy.get('@todoList').should( 'contain' , TODO_FIVE )
        
    })

    it('should display active items', function () {
        cy.initTodosList([TODO_ONE, TODO_TWO, TODO_THREE]);
        cy.toggleTodo(TODO_TWO);
        cy.displayTodos('Active');
        cy.shouldExist(TODO_ONE);
        cy.shouldExist(TODO_THREE);
        cy.shouldHaveLength(2);
    });


    it('should display completed items', function () {
        cy.initTodosList([TODO_ONE, TODO_TWO, TODO_THREE]);
        cy.toggleTodo(TODO_TWO);
        cy.displayTodos('Completed');
        cy.shouldExist(TODO_TWO);
        cy.shouldHaveLength(1);
    });

    it('should display all items', function () {
        cy.initTodosList([TODO_ONE, TODO_TWO, TODO_THREE]);
        cy.toggleTodo(TODO_TWO);
        cy.displayTodos('All');
        cy.shouldHaveLength(3);
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
