import React, {Component} from 'react';
import autoBind from 'react-autobind';
import className from 'classnames';

class Todo extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    handleToggleTodo() {
        this.props.toggleTodo(this.props.index);
    }

    handleRemoveTodo(){
        this.props.removeTodo(this.props.index);
    }

    handleEditTodo(){
        this.props.editTodo(this.props.index);
    }

    getClassNames() {
        return className({
            'list-group-item': true,
            'todo-wrapper': true,
            'completed': this.props.todo.completed,
            'uncompleted': !this.props.todo.completed
        });
    }

    render() {
        const {todo} = this.props;
        return (
            <li className={this.getClassNames()} >
                <div className="todo-content">
                <span onClick={this.handleToggleTodo.bind(this)}>
                <input type="checkbox" className="todo-checkbox" checked={!!this.props.todo.completed} />
                        {' '}
                        <em>{todo.text}</em>
                </span>
                </div>
                <div className="action-wrapper">
                    <div className="pull-right action-btns">
                        <ul className="list-inline btn-action">
                            <li>
                                <span onClick={this.handleRemoveTodo.bind(this)} className="delete-todo label label-danger">Remove</span>
                            </li>
                            <li>
                                <span onClick={this.handleEditTodo.bind(this)} id="editTodo" className="edit-todo label label-success">Edit</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        )
    }
}

export default Todo;