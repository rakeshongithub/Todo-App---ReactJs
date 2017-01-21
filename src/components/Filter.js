import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {getCompletedTodos} from './../common/utils';

class Filter extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    onFilterChange(filter) {
        this.props.handleFilter(filter);
    }

    isActive(classString) {
        return 'btn btn-' + ((this.props.nowShowing === classString) ? 'warning' : 'default');
    }

    render() {
        let {todos} = this.props;
        if (todos.length) {
            var filtersElm = (
                <div>
                    <div className="btn-group btn-group-sm">
                        <button className={this.isActive("ALL")}
                                onClick={this.onFilterChange.bind(this, 'ALL')}><span className="badge">{todos.length}</span> ALL</button>
                        <button className={this.isActive("ACTIVE")}
                                onClick={this.onFilterChange.bind(this, 'ACTIVE')}><span className="badge">{getCompletedTodos(todos).activeTodos}</span> ACTIVE</button>
                        <button className={this.isActive("COMPLETED")}
                                onClick={this.onFilterChange.bind(this, 'COMPLETED')}><span className="badge">{getCompletedTodos(todos).completedTodos}</span> COMPLETED</button>
                    </div>
                    <button className='btn btn-default btn-sm pull-right' onClick={this.onFilterChange.bind(this, 'REMOVE COMPLETED')}>REMOVE COMPLETED <span className="badge">{getCompletedTodos(todos).completedTodos}</span></button>
                </div>
            )
        }
        return (
            <div className="filter-btn-group">
                {filtersElm}
            </div>
        )
    }
}

export default Filter;