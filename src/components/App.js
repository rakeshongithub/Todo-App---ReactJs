import React, { Component } from 'react';
import autoBind from 'react-autobind';
import uuidV1 from 'uuid/v1';
import AppHeader from './AppHeader';
import Container from './Container';
import { getCompletedTodos, setAppState, FILTERS_TODO } from './../common/utils';
import './App.css';

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
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    id: uuidV1(),
                    text: todoText,
                    completed: false,
                    isEdit: false
                }
            ]
        });
    }

    handleToggleTodo(todoId) {
        setAppState.call(this, todoId, todo => {
            return Object.assign({}, todo, {
                completed: !todo.completed
            });
        });
    }

    handleRemoveTodo(todoId) {
        this.setState({
            todos: [
                ...this.state.todos.slice(0, todoId),
                ...this.state.todos.slice(todoId + 1)
            ]
        });
    }

    handleEditTodo(todoId) {
        setAppState.call(this, todoId, todo => {
            return Object.assign({}, todo, {
                isEdit: true
            });
        });
    }

    handleSaveTodo(updatedText, todoId) {
        setAppState.call(this, todoId, todo => {
            return Object.assign({}, todo, {
                isEdit: false,
                text: updatedText
            });
        });
    }

    handleCancelTodo(todoId) {
        setAppState.call(this, todoId, todo => {
            return Object.assign({}, todo, {
                isEdit: false
            });
        });
    }

    handleToggleAll() {
        const activeTodos = getCompletedTodos(this.state.todos).activeTodos;
        setAppState.call(this, null, todo => {
            return Object.assign({}, todo, {
                completed: !!activeTodos
            });
        });
    }

    filterTodo(filter) {
        switch (filter) {
            case FILTERS_TODO.COMPLETED:
                return this.setState({ nowShowing: filter });
            case FILTERS_TODO.ACTIVE:
                return this.setState({ nowShowing: filter });
            case FILTERS_TODO.ALL:
                return this.setState({ nowShowing: filter });
            case FILTERS_TODO.REMOVE_COMPLETED:
                return this.setState({
                    todos: this.state.todos.filter(todo => !todo.completed)
                });
            default:
                return true;
        }
    }

    render() {
        var propsObject = {};
        propsObject.handleAddTodo = this.handleAddTodo
        propsObject.handleToggleTodo = this.handleToggleTodo
        propsObject.handleToggleAll = this.handleToggleAll
        propsObject.handleRemoveTodo = this.handleRemoveTodo
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
