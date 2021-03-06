import React from 'react';
import * as css from 'classnames'

import './todo-list-item.css';

const TodoListItem = ({ isImportant, isCompleted, id,
    name, untilDate, onToggleImportant, onToggleDone, onDelete }) => {

    let dateFormat = new Date(untilDate);
    let date = dateFormat.getDate() + '.' + (dateFormat.getMonth() + 1) + '.' + dateFormat.getFullYear();

    return (
        <span className={css('todo-list-item', { 'important': isImportant, 'done': isCompleted })}>
            <span
                className="todo-list-item-label"
                onClick={() => onToggleDone(id)}>{name}
            </span>
            <span
                className="todo-list-item-date"
                onClick={() => onToggleDone(id)}>{date}
            </span>
            <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={() => onToggleImportant(id)}>
                <i className="fa fa-exclamation"></i>
            </button>

            <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={() => onDelete(id)}>
                <i className="fa fa-trash-o"></i>
            </button>
        </span>
    );
};

export default TodoListItem;