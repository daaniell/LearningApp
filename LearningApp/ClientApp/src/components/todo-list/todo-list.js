import React from 'react';

import TodoListItem from '../todo-list-item/todo-list-item';

import './todo-list.css';

const TodoList = ({ items, onToggleImportant, onToggleDone, onDelete }) => {

  const elements = items.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className="list-group-item">
        <TodoListItem
          id={id}
          { ...itemProps }
          onToggleImportant={onToggleImportant}
          onToggleDone={onToggleDone}
          onDelete={onDelete} />
      </li>
    );
  });

  return (<ul className="todo-list list-group">{ elements }</ul>);
};

export default TodoList;