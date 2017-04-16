import React, { Component } from 'react';
import autoBind from 'react-autobind';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import Filter from './Filter';
import Footer from './Footer';
import Alert from './Alert';
import { getCompletedTodos, FILTERS_TODO, WARNING_MSG } from './../common/utils';
import './App.css';

class Container extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    handleAddTodo(todoText) {
        this.props.handleAddTodo(todoText)
    }

    handleToggleTodo(todoId) {
        this.props.handleToggleTodo(todoId)
    }

    handleRemoveTodo(todoId) {
        this.props.handleRemoveTodo(todoId)
    }

    handleEditTodo(todoId) {
        this.props.handleEditTodo(todoId);
    }

    handleSaveTodo(updatedText, todoId) {
        this.props.handleSaveTodo(updatedText, todoId);
    }

    handleCancelTodo(todoId) {
        this.props.handleCancelTodo(todoId)
    }

    handleToggleAll() {
        this.props.handleToggleAll()
    }

    handleFilterTodo(filter) {
        this.props.filterTodo(filter);
    }

    removeCompleted() {
        this.props.removeCompleted();
    }

    render() {
        const todos = this.props.todos;
        const filteredTodos = todos.filter(todo => {
            switch (this.props.nowShowing) {
                case FILTERS_TODO.COMPLETED:
                    return todo.completed;
                case FILTERS_TODO.ACTIVE:
                    return !todo.completed;
                default:
                    return true;
            }
        }, this);

        // created array of todos text.
        const todoTextArr = todos.map(item => item.text);

        // Checking for duplicate item from todosTextArr and enable the warning alert box.
        let isDuplicate = todoTextArr.some((item, id) => todoTextArr.indexOf(item) !== id);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-push-2">
                        <div className="filter-todo">
                            <Filter
                                handleFilter={this.handleFilterTodo}
                                removeCompleted={this.removeCompleted}
                                nowShowing={this.props.nowShowing}
                                todos={todos}
                            />
                        </div>
                        {isDuplicate ? <Alert message={WARNING_MSG} /> : ''}
                        <div className="panel panel-warning todo-panel">
                            <div className="panel-heading">
                                <div className="toggle-all">
                                    <input type="checkbox" className="todo-checkbox"
                                        disabled={!todos.length}
                                        checked={!getCompletedTodos(todos).activeTodos && todos.length}
                                        onChange={this.handleToggleAll.bind(this)}
                                    />
                                </div>
                                <div className="add-todo-form">
                                    <AddTodo todos={this.props.todos} handleOnSubmit={this.handleAddTodo} />
                                </div>
                            </div>
                            <TodoList
                                todos={filteredTodos}
                                onToggleTodo={this.handleToggleTodo}
                                onRemoveTodo={this.handleRemoveTodo}
                                onEditTodo={this.handleEditTodo}
                                onSaveTodo={this.handleSaveTodo}
                                onCancelTodo={this.handleCancelTodo}
                            />
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}

export default Container;
