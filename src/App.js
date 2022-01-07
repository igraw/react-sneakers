import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer"
import React from "react";


function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    fetch("https://61d5487e8df81200178a8f9a.mockapi.io/items")
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      setItems(json)
    })
  },[])

  const onAddToCard = (obj)=> {
    setCartItems (prev => [...prev, obj])
  }
  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer items={cartItems} onClose={() => setCartOpened(false)} /> : null}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск"></input>
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((item) => (
            <Card
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log('Добавили в закладки')}
              onPlus={(obj) => onAddToCard(obj)}
            />
          ))}

        </div>
      </div>

    </div>
  );
}
//2:19y 4 ehjr https://mockapi.io/projects/61d5487e8df81200178a8f9b

export default App;
