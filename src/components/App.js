import React, {Component} from 'react';
import autoBind from 'react-autobind';
import uuidV1 from 'uuid/v1';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import Filter from './Filter';
import Footer from './Footer';
import Alert from './Alert';
import {getCompletedTodos, setAppState, FILTERS_TODO, WARNING_MSG} from './../common/utils';
import logo from '../logo.svg';
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
                return this.setState({nowShowing: filter});
            case FILTERS_TODO.ACTIVE:
                return this.setState({nowShowing: filter});
            case FILTERS_TODO.ALL:
                return this.setState({nowShowing: filter});
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
        const filteredTodos = todos.filter(todo => {
            switch (this.state.nowShowing) {
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
                            {isDuplicate ? <Alert message={WARNING_MSG}/> : ''}
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
                                    todos={filteredTodos}
                                    onToggleTodo={this.handleToggleTodo}
                                    onRemoveTodo={this.handleRemoveTodo}
                                    onEditTodo={this.handleEditTodo}
                                    onSaveTodo={this.handleSaveTodo}
                                    onCancelTodo={this.handleCancelTodo}
                                />
                            </div>
                            <Footer/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
