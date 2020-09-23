import React, {Component} from 'react';
    // imports components
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStautsFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
    // import styles
import './app.css';
    // импорт библиотеки styled-components
import styled from 'styled-components';

    // создан компонент, к которому применены правила
const AppBlock = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label:"Going to learn React", important: true, like: false, id: 1},
                {label:"React - it's cool", important: false, like: false, id: 2},
                {label:"I need a work...", important: false, like: false, id: 3},
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.maxId = 4;
    }

    deleteItem(id) {
        this.setState(({data}) =>{
            const index = data.findIndex(elem => elem.id === id);
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
            return {
                data: newArr
            }
        });
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        };
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }
    updateDate(id, prop) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = {...old, [prop]: !old[prop]};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id) {
        this.updateDate(id, 'important');
    }
    onToggleLiked(id) {
        this.updateDate(id, 'like');
    }
    searchPost(items, term) {
        if (term.length === 0) {
            return items
        }
        return items.filter( item => {
            return item.label.indexOf(term) > -1;
        })
    }
    onUpdateSearch(term) {
        this.setState({ term });
    }
    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like);
        } else {
            return items;
        }
    }
    onFilterSelect(filter) {
        this.setState({ filter });
    }

    render() {
        const {data, term, filter} = this.state;
        const allPosts = data.length;
        const liked = data.filter(item => item.like).length;
        const visiblePost = this.filterPost(this.searchPost(data, term), filter);

        return (
            <AppBlock>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStautsFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                    <PostList
                        posts={visiblePost}
                        onDelete={this.deleteItem}
                        onToggleImportant={this.onToggleImportant}
                        onToggleLiked={this.onToggleLiked}
                    />
                    <PostAddForm
                        onAdd={this.addItem}
                    />
            </AppBlock>
        )
    }
}
