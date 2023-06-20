import Header from './components/Header';
import Drawer from './components/Drawer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

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
        try {
          const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([
            axios.get('https://64792107a455e257fa62f24b.mockapi.io/items'),
            axios.get('https://64792107a455e257fa62f24b.mockapi.io/cart'),
            axios.get('https://64825d0a29fa1c5c5032dea2.mockapi.io/favorites')
          ]);

          setIsLoading(false);

          setItems(itemsResponse.data);
          setCartItems(cartResponse.data);
          setFavorites(favoritesResponse.data);
        } catch(error) {
          alert('Ошибка при запросе данных ;(');
          console.log(error)
        }
      }

      fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://64792107a455e257fa62f24b.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const {data} = await axios.post('https://64792107a455e257fa62f24b.mockapi.io/cart', obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item;
        }));
      }
    } catch(error) {
      alert('Не удалось добавить в корзину');
      console.log(error);
    }
  }

  const onRemoveItem = async (id) => {
    try {
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
      await axios.delete(`https://64792107a455e257fa62f24b.mockapi.io/cart/${id}`);
    } catch(error) {
      alert('Ошибка при удалении товара');
      console.log(error);
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
        await axios.delete(`https://64825d0a29fa1c5c5032dea2.mockapi.io/favorites/${obj.id}`);
      } else {
        setFavorites((prev) => [...prev, data]);
        const {data} = await axios.post('https://64825d0a29fa1c5c5032dea2.mockapi.io/favorites', obj);
      }
    } catch(error) {
      alert('Не удалось добавить в фавориты');
      console.log(error)
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, setCartItems, onAddToCart, onAddToFavorite, isItemAdded ,setCartOpened}}>
      <div className="wrapper">
      <Drawer items={cartItems} 
      onClose={() => setCartOpened(false)} 
      onRemove={onRemoveItem} 
      opened={cartOpened}/>

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
        }>
        </Route>

        <Route path='/favorites' 
        element={
          <Favorites />
        }>
        </Route>

        <Route path='/orders' 
        element={
          <Orders />
        }>
        </Route>
      </Routes>

    </div>
    </AppContext.Provider>
  );
}

export default App;
