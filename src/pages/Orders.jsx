import React from "react";
import axios from "axios";
import Card from '../components/Card';
import AppContext from "../context";

function Orders() {
    // const { onAddToCard } = React.useContext(AppContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const [orders, setOrders] = React.useState([])
    React.useEffect(() => {

        try {
            async function fetcData() {
                const { data } = await axios.get("https://61d5487e8df81200178a8f9a.mockapi.io/orders")
                // console.log(data.map(obj =>obj.items).flat())
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setIsLoading(false)
            }
            fetcData()

        } catch {
            alert('ошибка при запросе заказов');
            console.error('error');
        }
    }, [])

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы </h1>
            </div>
            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(7)] : orders).map((item, index) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        {...item}
                    />)

                )}
            </div>
            <div className="d-flex flex-wrap">




            </div>
        </div>
    )
}
export default Orders;