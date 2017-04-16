import uuidV1 from 'uuid/v1';
import { getCompletedTodos, setAppState } from './../common/utils';

export function handleAddTodo(state, todoText) {
    return {
        todos: [
            ...state.todos,
            {
                id: uuidV1(),
                text: todoText,
                completed: false,
                isEdit: false
            }
        ]
    }
}

export function handleToggleTodo(todoId) {
    setAppState.call(this, todoId, todo => {
        return Object.assign({}, todo, {
            completed: !todo.completed
        });
    });
}

export function handleRemoveTodo(state, todoId) {
    return {
        todos: [
            ...state.todos.slice(0, todoId),
            ...state.todos.slice(todoId + 1)
        ]
    }
}

export function handleEditTodo(todoId) {
    setAppState.call(this, todoId, todo => {
        return Object.assign({}, todo, {
            isEdit: true
        });
    });
}

export function handleSaveTodo(updatedText, todoId) {
    setAppState.call(this, todoId, todo => {
        return Object.assign({}, todo, {
            isEdit: false,
            text: updatedText
        });
    });
}

export function handleCancelTodo(todoId) {
    setAppState.call(this, todoId, todo => {
        return Object.assign({}, todo, {
            isEdit: false
        });
    });
}

export function handleToggleAll(state) {
    const activeTodos = getCompletedTodos(state.todos).activeTodos;
    setAppState.call(this, null, todo => {
        return Object.assign({}, todo, {
            completed: !!activeTodos
        });
    });
}