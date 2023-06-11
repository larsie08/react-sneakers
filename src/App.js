import Header from './components/Header';
import Drawer from './components/Drawer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';

import axios from 'axios';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
      axios.get('https://64792107a455e257fa62f24b.mockapi.io/items').then((res) => {
        setItems(res.data);
      });
      axios.get('https://64792107a455e257fa62f24b.mockapi.io/cart').then((res) => {
        setCartItems(res.data);
      });
      axios.get('https://64825d0a29fa1c5c5032dea2.mockapi.io/favorites').then((res) => {
        setFavorites(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://64792107a455e257fa62f24b.mockapi.io/cart', obj)
    setCartItems((prev) => [...prev, obj]);
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://64792107a455e257fa62f24b.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://64825d0a29fa1c5c5032dea2.mockapi.io/favorites/${obj.id}`)
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

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}

      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route path='/' 
        element={
          <Home 
            items={items}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
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
  );
}

export default App;
