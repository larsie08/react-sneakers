import Header from './components/Header';
import Drawer from './components/Drawer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';

import axios from 'axios';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppContext from './context';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
      async function fetchData() {
        const itemsResponse = await axios.get('https://64792107a455e257fa62f24b.mockapi.io/items');
        const cartResponse = await axios.get('https://64792107a455e257fa62f24b.mockapi.io/cart');
        const favoritesResponse = await axios.get('https://64825d0a29fa1c5c5032dea2.mockapi.io/favorites');

        setIsLoading(false);

        setItems(itemsResponse.data);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
      }

      fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        axios.post('https://64792107a455e257fa62f24b.mockapi.io/cart', obj)
        setCartItems((prev) => [...prev, obj]);
      }
    } catch(error) {
      console.log('Не удалось добавить в корзину')
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://64792107a455e257fa62f24b.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://64825d0a29fa1c5c5032dea2.mockapi.io/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const {data} = await axios.post('https://64825d0a29fa1c5c5032dea2.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data])
      }
    } catch(error) {
      console.log('Не удалось добавить в фавориты');
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, setCartItems, onAddToCart, onAddToFavorite, isItemAdded ,setCartOpened}}>
      <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}

      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route path='/' 
        element={
          <Home 
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        } exact>
        </Route>

        <Route path='/favorites' 
        element={
          <Favorites 
          items={favorites}
          onAddToFavorite={onAddToFavorite}
          />
        } exact>
        </Route>
      </Routes>

    </div>
    </AppContext.Provider>
  );
}

export default App;
