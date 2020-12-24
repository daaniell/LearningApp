import React, { Component } from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './MainApp.css';
import { data } from 'jquery';


export default class MainApp extends Component {

    id = 0;
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

    PostData = (item) => {
        fetch('api/todos', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: [...this.state.items, result]
                    });
                    this.Refresh()
                }
            )
    };

    createItem = (name, date) => {
        return {
            id: ++this.id,
            name: name,
            done: false,
            untilDate: date
        };
    };

    onItemAdded = (label, date) => {
        const item = this.createItem(label, date);
        fetch('api/todos', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: [...this.state.items, result]
                    });
                    this.Refresh()
                }
                )
    };

    onDelete = (id) => {
        fetch('api/todos/' + id, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: [...this.state.items]
                    });
                this.Refresh()
                },
            )
    }

    onToggleDone = (id) => {
        const items = this.toggleProperty(this.state.items, id, 'done');
        fetch('api/todos/' + id + '/PutComplete', {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: [...this.state.items]
                    });
                    this.Refresh()
                }
                )
        return { items };
    };

    onToggleImportant = (id) => {
        const items = this.toggleProperty(this.state.items, id, 'important');
        fetch('api/todos/' + id + '/PutImportant', {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: [...this.state.items]
                    });
                    this.Refresh()
                }
                )
        return { items };
    };

    toggleProperty(arr, id, propname) {
        return arr.map(el =>
            el.id === id ? { ...el, [propname]: !el[propname] } : el
        );
    };
   
    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    onSearchChange = (search) => {
        this.setState({ search });
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