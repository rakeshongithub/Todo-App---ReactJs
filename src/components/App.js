import React, {Component} from 'react';
import autoBind from 'react-autobind';
import uuidV1 from 'uuid/v1';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import Filter from './Filter';
import {getCompletedTodos, getUpdatedTodo} from './../common/utils';
import logo from '../logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            nowShowing: 'ALL',
            allCompleted: false,
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
        this.setState({
            todos: getUpdatedTodo.call(this, todoId, function(todo) {
                return Object.assign({}, todo, {
                    completed: !todo.completed
                });
            })
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
        this.setState({
            todos: getUpdatedTodo.call(this, todoId, function(todo) {
                return Object.assign({}, todo, {
                    isEdit: true
                });
            })
        });
    }

    handleSaveTodo(updatedText, todoId) {
        this.setState({
            todos: getUpdatedTodo.call(this, todoId, function(todo) {
                return Object.assign({}, todo, {
                    isEdit: false,
                    text: updatedText
                });
            })
        });
    }

    handleCancelTodo(todoId) {
        this.setState({
            todos: getUpdatedTodo.call(this, todoId, function(todo) {
                return Object.assign({}, todo, {
                    isEdit: false
                });
            })
        });
    }

    handleToggleAll() {
        const {todos} = this.state;
        const activeTodos = getCompletedTodos(todos).activeTodos;
        this.setState({
            todos: todos.map((todo) => {
                return Object.assign({}, todo, {
                    completed: !!activeTodos
                });
            })
        });
    }

    filterTodo(filter) {
        switch (filter) {
            case 'COMPLETED':
                this.setState({nowShowing: filter});
                return;
            case 'ACTIVE':
                this.setState({nowShowing: filter});
                return;
            case 'ALL':
                this.setState({nowShowing: filter});
                return;
            case 'REMOVE COMPLETED':
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
                                        <AddTodo handleOnSubmit={this.handleAddTodo}/>
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
