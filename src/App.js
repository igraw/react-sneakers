import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer"

const arr = [
  { title: "Мужские Кроссовки Nike Blazer Nike Mid Suede", price: 12999 , imageUrl: "/sneakers/1.jpg"},
  { title: "Мужские Кроссовки Nike Air Max 270", price: 12500 , imageUrl: "/sneakers/2.jpg"},
  { title: "Мужские Кроссовки Nike Blazer Mid Suede", price: 8490 , imageUrl: "/sneakers/3.jpg"},
  { title: "Кроссовки Puma X Aka Boku Future Rider", price: 8999 , imageUrl: "/sneakers/4.jpg"},
  { title: "Мужские Кроссовки Under Armour Curry 8", price: 15100 , imageUrl: "/sneakers/5.jpg"}
]
function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск"></input>
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {arr.map((obj) => (
            <Card
            title = {obj.title}
            price = {obj.price}
            imageUrl = {obj.imageUrl}
            />
          ))}

        </div>
      </div>

    </div>
  );
}
//00y 4 ehjr
export default App;
