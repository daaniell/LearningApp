import React, { Component } from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './MainApp.css';
import { data } from 'jquery';


export default class MainApp extends Component {

    maxId = 100;
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            filter: 'all',
            search: ''
        };
    }


    Refresh = () => {
        fetch('api/todos')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result
                    });
                }
                )
    };

    PostData = () => {
        fetch('api/todos/', {
            method: 'POST',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result
                    });
                }
            )
    }

    onItemAdded = (label, date) => {
        this.setState((state) => {
            const item = this.createItem(label, date);
            return { items: [...state.items, item] };
        });
        fetch('api/todos/post', {
            method: 'POST',
            body: JSON.stringify() // - Unhandled Rejection (SyntaxError): Unexpected end of JSON input
        })
            .then(res => res.json()) 
            .then(
                (result) => {
                    this.setState({
                        items: result
                    });
                }
        )
    };

    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((item) => item.id === id);
        const oldItem = arr[idx];
        const value = !oldItem[propName];

        const item = { ...arr[idx], [propName]: value };
        return [
            ...arr.slice(0, idx),
            item,
            ...arr.slice(idx + 1),
        ];
    };
    

    onToggleDone = (id) => {
        this.setState((state) => {
            const items = this.toggleProperty(state.items, id, 'done');
            return { items };
        });
    };

    onToggleImportant = (id) => {
        this.setState((state) => {
            const items = this.toggleProperty(state.items, id, 'important');
            return { items };
        });
    };

    onDelete = (id) => {
        fetch('api/todos/' + id, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(
                 (result) => {
                    this.setState({
                        items: result
                    });
                 }
            )
    }

    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    onSearchChange = (search) => {
        this.setState({ search });
    };

    createItem = (name, date) => {
        return {
            id: ++this.maxId,
            name: name,
            done: false,
            untilDate: date
        };
    };

    filterItems = (items, filter) => {
        if (filter === 'all') {
            return items;
        } else if (filter === 'active') {
            return items.filter((item) => (!item.done));
        } else if (filter === 'done') {
            return items.filter((item) => item.done);
        }
    }

    searchItems(items, search) {
        if (search.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
    }

    render() {
        const { items, filter, search } = this.state;
        const doneCount = items.filter((item) => item.done).length;
        const toDoCount = items.length - doneCount;
        const visibleItems = this.searchItems(this.filterItems(items, filter), search);

        return (
            <div className="todo-app">
                <AppHeader toDo={toDoCount} done={doneCount} />

                <div className="search-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange} />

                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange} />
                </div>

                <TodoList
                    items={visibleItems}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                    onDelete={this.onDelete} />

                <ItemAddForm
                    onItemAdded={this.onItemAdded} />
            </div>
        );
    };

    componentDidMount() {
        this.Refresh();
    };
}