function getCompletedTodos(todos) {
    const activeTodos = todos.reduce(function (accum, todo) {
            return todo.completed ? accum : accum + 1;
        }, 0);
    const completedTodos = todos.length - activeTodos;
    return {activeTodos, completedTodos}
}

export {getCompletedTodos}