import React from 'react';

import './todo-list-item.css';

const TodoListItem = ({ important, done,
    name, untilDate, onToggleImportant, onToggleDone, onDelete }) => {

    let date = new Date(untilDate);
    let dateFormat = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();

    let classNames = 'todo-list-item date';
    if (important) {
        classNames += ' important';
    }

    if (done) {
        classNames += ' done';
    }


    return (
        <span className={classNames}>
            <span
                className="todo-list-item-label"
                onClick={onToggleDone}>{name}
            </span>
            <span
                className="todo-list-item-date"
                onClick={onToggleDone}>{dateFormat}
            </span>
            <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={onToggleImportant}>
                <i className="fa fa-exclamation"></i>
            </button>

            <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={onDelete}>
                <i className="fa fa-trash-o"></i>
            </button>
        </span>
    );
};

export default TodoListItem;