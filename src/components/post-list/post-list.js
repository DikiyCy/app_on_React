import React from 'react';

import PostListItem from '../post-list-item';
import { ListGroup } from 'reactstrap';
import './post-list.css';

    // функция динамического отображения данных, полученных с сервера
const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {
        // переменная с результир li
    const elements = posts.map((item) => {
            // проверка на объект + содержится ли в нем информация + не null || Array
        if (typeof(item) === 'object'
            && isEmpty(item)
            && item !== false
            && !(Array.isArray(item))) {
                // деструктур объект и избавились от item.
            const {id, ...itemProps} = item;
            return (
                    // id === props.posts.id
                <li key={id} className="list-group-item">
                    <PostListItem
                        {...itemProps}
                        onDelete={() => onDelete(id)}
                        onToggleImportant={() => onToggleImportant(id)}
                        onToggleLiked={() => onToggleLiked(id)}
                    />
                </li>
            )
        }
        return false;

    });
        // проверка на пустоту
    function isEmpty(obj) {
        for(let key in obj)
        {
            return true;
        }
        return false;
    }
    return (
        <ListGroup className="app-list">
            {elements}
        </ListGroup>
    )
};

export default PostList;
