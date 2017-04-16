import uuidV1 from 'uuid/v1';

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

export function handleToggleTodo(todo) {
    return Object.assign({}, todo, {
        completed: !todo.completed
    });
}

export function handleRemoveTodo(state, todoId) {
    return {
        todos: state.todos.filter((todo) => {
            return todo.id !== todoId
        })
    }
}

export function handleEditTodo(todo) {
    return Object.assign({}, todo, {
        isEdit: true
    });
}

export function handleSaveTodo(updatedText, todo) {
    return Object.assign({}, todo, {
        isEdit: false,
        text: updatedText
    });
}

export function handleCancelTodo(todo) {
    return Object.assign({}, todo, {
        isEdit: false
    });
}

export function handleToggleAll(todo, activeTodos) {
    return Object.assign({}, todo, {
        completed: !!activeTodos
    });
}

export function removeCompleted(state) {
    return {
        todos: state.todos.filter(todo => !todo.completed)
    }
}