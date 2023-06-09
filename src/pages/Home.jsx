import React from "react";

import Card from "../components/Card";

function Home ({
    items, 
    cartItems, 
    searchValue, 
    setSearchValue, 
    onChangeSearchInput, 
    onAddToFavorite, 
    onAddToCart,
    isLoading
}) {

    const renderItems = () => {    
        const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));

        return (isLoading ? [...Array(12)] : filteredItems).map((item, index) => (
            <Card 
            key={index} 
            onFavorite={(obj) => onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
            {...item}
            />
        ))
    }

    return (
        <div className="content">
            <div className="header-content">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="search">
                    <img src="/img/search.svg" alt="search" />
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
                    {searchValue && <img className="clear" src="img/btn-remove.svg" alt="Clear" onClick={() => setSearchValue('')} />}
                </div>
            </div>

            <div className="cards">
                {renderItems()}
            </div>
      </div>
    );
    
}

export default Home;