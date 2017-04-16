import {
    handleAddTodo,
    handleToggleTodo,
    handleRemoveTodo,
    handleEditTodo,
    handleSaveTodo,
    handleCancelTodo,
    handleToggleAll,
    removeCompleted
} from '../components/state-actions';

const startState = {
    todos: [{
        id: 1,
        completed: false,
        isEdit: false,
        text: 'Buy Milk'
    },
    {
        id: 2,
        completed: true,
        isEdit: false,
        text: 'Go to Mall'
    }]
};
var todo = startState.todos[0];

describe('State Actions', () => {

    var newTodo = handleAddTodo(startState, "New Todo Item").todos;
    var newTodoText = newTodo[newTodo.length - 1].text;

    it('Add new todo', () => {
        expect(newTodoText).toBe("New Todo Item");
    });

    it('Toggle Todo', () => {
        expect(handleToggleTodo(todo)).toEqual({
            id: 1,
            completed: true,
            isEdit: false,
            text: 'Buy Milk'
        });
    });

    it('Remove Todo', () => {
        var orignalTodosLength = startState.todos.length;
        var updatedLength = handleRemoveTodo(startState, 1).todos.length;
        expect(orignalTodosLength).not.toBe(updatedLength);
    });

    it('Edit Todo', () => {
        expect(handleEditTodo(todo)).toEqual({
            id: 1,
            completed: false,
            isEdit: true,
            text: 'Buy Milk'
        });
    });

    it('Cancel Edit Todo', () => {
        var editEnableTodo = handleEditTodo(todo);
        expect(handleCancelTodo(editEnableTodo)).toEqual({
            id: 1,
            completed: false,
            isEdit: false,
            text: 'Buy Milk'
        });
    });

    it('Save Edit Todo', () => {
        var editEnableTodo = handleEditTodo(todo);
        expect(handleSaveTodo('Updated Text', editEnableTodo)).toEqual({
            id: 1,
            completed: false,
            isEdit: false,
            text: 'Updated Text'
        });
    });

    it('Toggle All Todos', () => {
        expect(handleToggleAll(todo, startState.todos[1])).toEqual({
            id: 1,
            completed: true,
            isEdit: false,
            text: 'Buy Milk'
        });
    });

    it('Remove Completed Todos', () => {
        var filteredTodos = {
            todos: [{
                id: 1,
                completed: false,
                isEdit: false,
                text: 'Buy Milk'
            }]
        }
        expect(removeCompleted(startState)).toEqual(filteredTodos);
    });

});