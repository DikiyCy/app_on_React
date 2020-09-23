import React from 'react';
import './post-list-item.scss';

// создадим класс для компонентов-постов
function PostListItem(props) {
            // переменная, в которую диструкт.данный из "props" из post-list-item
        const {label, onDelete, onToggleImportant, onToggleLiked, important, like} = props;
            // переменная, которая отвечает за класс
        let classNames = 'app-list-item d-flex justify-content-between';
            // проверка наличия атрибута и добавляет класс
        if (important) {
            classNames += ' important';
        }
        if (like) {
            classNames += ' like';
        }

        return (
            <div className={classNames}>
                <span
                    className="app-list-item-label"
                    onClick={onToggleLiked}
                >
                    {label}
                </span>
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        className="btn-star btn-sm"
                        onClick={onToggleImportant}
                    >
                        <i className="fa fa-star"></i>
                    </button>
                    <button className="btn-trash btn-sm"
                        onClick={onDelete}
                    >
                        <i className="fa fa-trash-o"></i>
                    </button>
                    <i className="fa fa-heart"></i>
                </div>
            </div>
        )
}
export default PostListItem;
