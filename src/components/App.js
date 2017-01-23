import React, {Component} from 'react';
import autoBind from 'react-autobind';
import uuidV1 from 'uuid/v1';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import Filter from './Filter';
import {getCompletedTodos, setAppState, FILTERS_TODO} from './../common/utils';
import logo from '../logo.svg';
import './App.css';

function addTodoItem(todoText) {
    const isFound = this.state.todos.find(todo => {
        return todo.text === todoText;
    });
    if (isFound) {
        this.setState({
            isDublicate: true
        });
        return this.state.todos;
    }
    this.setState({
        isDublicate: false
    });
    return [
        ...this.state.todos,
        {
            id: uuidV1(),
            text: todoText,
            completed: false,
            isEdit: false
        }
    ];
}

class App extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            nowShowing: 'ALL',
            allCompleted: false,
            isDublicate: false,
            todos: []
        };
    }

    handleAddTodo(todoText) {
        this.setState({
            todos: addTodoItem.call(this, todoText)
        });
    }

    handleToggleTodo(todoId) {
        setAppState.call(this, todoId, function (todo) {
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
        setAppState.call(this, todoId, function (todo) {
            return Object.assign({}, todo, {
                isEdit: true
            });
        });
    }

    handleSaveTodo(updatedText, todoId) {
        setAppState.call(this, todoId, function (todo) {
            return Object.assign({}, todo, {
                isEdit: false,
                text: updatedText
            });
        });
    }

    handleCancelTodo(todoId) {
        setAppState.call(this, todoId, function (todo) {
            return Object.assign({}, todo, {
                isEdit: false
            });
        });
    }

    handleToggleAll() {
        const activeTodos = getCompletedTodos(this.state.todos).activeTodos;
        setAppState.call(this, null, function (todo) {
            return Object.assign({}, todo, {
                completed: !!activeTodos
            });
        });
    }

    filterTodo(filter) {
        switch (filter) {
            case FILTERS_TODO.COMPLETED:
                return this.setState({nowShowing: FILTERS_TODO.COMPLETED});
            case FILTERS_TODO.ACTIVE:
                return this.setState({nowShowing: FILTERS_TODO.ACTIVE});
            case FILTERS_TODO.ALL:
                return this.setState({nowShowing: FILTERS_TODO.ALL});
            case FILTERS_TODO.REMOVE_COMPLETED:
                return this.setState({
                    todos: this.state.todos.filter(todo => !todo.completed)
                });
            default:
                return true;
        }
    }

    render() {
        const {todos} = this.state;
        const shownTodos = todos.filter(function (todo) {
            switch (this.state.nowShowing) {
                case 'COMPLETED':
                    return todo.completed;
                case 'ACTIVE':
                    return !todo.completed;
                default:
                    return true;
            }
        }, this);
        const renderWarning = (
            <div className="alert alert-warning"><strong>WARNING -</strong> Item already exist!</div>
        );
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-push-2">
                            <div className="filter-todo">
                                <Filter
                                    handleFilter={this.filterTodo}
                                    nowShowing={this.state.nowShowing}
                                    todos={todos}
                                />
                            </div>
                            {this.state.isDublicate ? renderWarning : ''}
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
                                        <AddTodo todos={this.state.todos} handleOnSubmit={this.handleAddTodo}/>
                                    </div>
                                </div>
                                <TodoList
                                    todos={shownTodos}
                                    toggleTodo={this.handleToggleTodo}
                                    removeTodo={this.handleRemoveTodo}
                                    editTodo={this.handleEditTodo}
                                    onSaveTodo={this.handleSaveTodo}
                                    onCancelTodo={this.handleCancelTodo}
                                />
                            </div>
                            <div className="todo-alert">
                                <hr/>
                                <p>Double-click to edit a todo!</p>
                                <p>Created by <strong>Rakesh Kumar</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
