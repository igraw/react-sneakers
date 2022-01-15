import React from "react";
import Card from '../components/Card';

function Home({
    items,
    searchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCard,
    isLoading }) {

    
    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()),
        );
        return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
            <Card
                key={index}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCard(obj)}
                loading={isLoading}
                {...item}


            />
        ));
    };

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу "${searchValue}" ` : 'Все кроссовки'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search" />
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск"></input>
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>

        </div>
    )
}
export default Home;