export function getCompletedTodos(todos) {
    const activeTodos = todos.reduce(function (accum, todo) {
        return todo.completed ? accum : accum + 1;
    }, 0);
    const completedTodos = todos.length - activeTodos;
    return {activeTodos, completedTodos}
}

export function getTodoItem(todoId, _callBack) {
    return this.state.todos.map((todo) => {
        if (todoId === todo.id) {
            return _callBack(todo);
        }
        return todo;
    });
}