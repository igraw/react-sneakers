import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

import AppContext from "./context";


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {

    async function fetcData() {
      try {
        const cartResponse = await axios.get("https://61d5487e8df81200178a8f9a.mockapi.io/card")
        const favoritesResponse = await axios.get("https://61d5487e8df81200178a8f9a.mockapi.io/favorites")
        const itemsResponse = await axios.get("https://61d5487e8df81200178a8f9a.mockapi.io/items")

        setIsLoading(false)

        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)

      } catch {
        alert('Ошибка при запросе данных')
      }
    }
    fetcData()
  }, [])

  const onAddToCard = async (obj) => {

    try {
      const findItem = cartItems.find((item) => Number(item.id) === Number(obj.id))
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://61d5487e8df81200178a8f9a.mockapi.io/card/${findItem.id}`)
      } else {
        setCartItems(prev => [...prev, obj])
        const { data } = await axios.post("https://61d5487e8df81200178a8f9a.mockapi.io/card", obj)
        setCartItems(prev => prev.map((item) => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item
        }))
      }
    } catch {
      alert('Ошибка при добавлении в корзину')
    }

  }
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://61d5487e8df81200178a8f9a.mockapi.io/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post("https://61d5487e8df81200178a8f9a.mockapi.io/favorites", obj)
        setFavorites(prev => [...prev, data])
      }
    } catch {
      alert("Не удалось добавить в фавориты")
    }
  }

  const onRemoveItem = async (id) => {
    try {
      axios.delete(`https://61d5487e8df81200178a8f9a.mockapi.io/card/${id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)))
    } catch {
      alert("Ошибка при удаленни из корзины")
    }
  }
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }
  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favorites,
      onAddToFavorite,
      onAddToCard,
      isItemAdded,
      setCartOpened,
      setCartItems
    }}>
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}

        />
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path="/" element={<Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCard={onAddToCard}
            isLoading={isLoading}
          />} />

          <Route
            path="/favorites"
            element={<Favorites />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
//1:06 les 

export default App;
