import React from 'react';
import './app-header.css';
import styled from 'styled-components';

    // прописали стили для нашего блока
const Header = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    h1 {
        font-size: 26px;
            /* если у компон есть атрибут colored */
        color: ${props => props.colored ? 'red' : 'green'};
        :hover {
            color: white;
        }
    }
    h2 {
        font-size: 1.2rem;
        color: grey;
    }
`;

const AppHeader = ({liked, allPosts}) => {
    return (
            // сюда поместим классы от бутст и наши
            // переиспользуем компонент как ссылку
        <Header as='a'>
            <h1>Michael Dmitrievskii</h1>
    <h2>{allPosts} записей, из них понравилось {liked}</h2>
        </Header>
    )
};

export default AppHeader;
