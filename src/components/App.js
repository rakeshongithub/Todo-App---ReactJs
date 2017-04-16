import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { FILTERS_TODO } from './../common/utils';
import AppHeader from './AppHeader';
import Container from './Container';
import {
    handleAddTodo,
    handleToggleTodo,
    handleRemoveTodo,
    handleEditTodo,
    handleSaveTodo,
    handleCancelTodo,
    handleToggleAll
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
        handleToggleTodo.call(this, todoId)
    }

    handleRemoveTodo(todoId) {
        this.setState(handleRemoveTodo(this.state, todoId));
    }

    handleEditTodo(todoId) {
        handleEditTodo.call(this, todoId)
    }

    handleSaveTodo(updatedText, todoId) {
        handleSaveTodo.call(this, updatedText, todoId);
    }

    handleCancelTodo(todoId) {
        handleCancelTodo.call(this, todoId);
    }

    handleToggleAll() {
        handleToggleAll.call(this, this.state);
    }

    filterTodo(filter) {
        this.setState(filters[filter]);
    }

    removeCompleted() {
        this.setState({
            todos: this.state.todos.filter(todo => !todo.completed)
        })
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
