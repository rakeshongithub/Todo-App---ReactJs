import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { getCompletedTodos, setAppState, FILTERS_TODO } from './../common/utils';
import AppHeader from './AppHeader';
import Container from './Container';
import {
    handleAddTodo,
    handleToggleTodo,
    handleRemoveTodo,
    handleEditTodo,
    handleSaveTodo,
    handleCancelTodo,
    handleToggleAll,
    removeCompleted
} from './state-actions';
import './App.css';

var filters = {
    'ACTIVE': { nowShowing: FILTERS_TODO.ACTIVE },
    'COMPLETED': { nowShowing: FILTERS_TODO.COMPLETED },
    'ALL': { nowShowing: FILTERS_TODO.ALL }
}

class App extends Component {
    constructor(props) {
        super(props);
        autoBind(this);

        // initial state of app
        this.state = {
            nowShowing: FILTERS_TODO.ALL,
            todos: []
        };
    }

    handleAddTodo(todoText) {
        this.setState(handleAddTodo(this.state, todoText));
    }

    handleToggleTodo(todoId) {
        setAppState.call(this, todoId, todo => {
            return handleToggleTodo(todo)
        });
    }

    handleRemoveTodo(todoId) {
        this.setState(handleRemoveTodo(this.state, todoId));
    }

    handleEditTodo(todoId) {
        setAppState.call(this, todoId, todo => {
            return handleEditTodo(todo)
        });
    }

    handleSaveTodo(updatedText, todoId) {
        if (updatedText === '' || updatedText === null || updatedText === undefined) {
            return this.handleRemoveTodo(todoId);
        }
        setAppState.call(this, todoId, todo => {
            return handleSaveTodo(updatedText, todo);
        });
    }

    handleCancelTodo(todoId) {
        setAppState.call(this, todoId, todo => {
            return handleCancelTodo(todo);
        });
    }

    handleToggleAll() {
        const activeTodos = getCompletedTodos(this.state.todos).activeTodos;
        setAppState.call(this, null, todo => {
            return handleToggleAll(todo, activeTodos);
        });
    }

    filterTodo(filter) {
        this.setState(filters[filter]);
    }

    removeCompleted() {
        this.setState(removeCompleted(this.state))
    }

    render() {
        var propsObject = {};
        propsObject.handleAddTodo = this.handleAddTodo
        propsObject.handleToggleTodo = this.handleToggleTodo
        propsObject.handleToggleAll = this.handleToggleAll
        propsObject.handleRemoveTodo = this.handleRemoveTodo
        propsObject.removeCompleted = this.removeCompleted
        propsObject.handleEditTodo = this.handleEditTodo
        propsObject.handleSaveTodo = this.handleSaveTodo
        propsObject.handleCancelTodo = this.handleCancelTodo
        propsObject.filterTodo = this.filterTodo
        return (
            <div className="App">
                <AppHeader />
                <Container
                    todos={this.state.todos}
                    nowShowing={this.state.nowShowing}
                    {...propsObject}
                />
            </div>
        );
    }
}

export default App;
