import React from "react";
import axios from "axios";

import Card from "../components/Card";

function Orders() {
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('https://64825d0a29fa1c5c5032dea2.mockapi.io/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch(error) {
                console.log('Ошибка при запросе заказов');
            }
        })()
    }, [])
    
    return (
        <div className="content">
            <div className="header-content">
                <h1>Мои заказы</h1>
            </div>

            <div className="cards">
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                        <Card 
                        key={index}
                        loading={isLoading}
                        {...item}
                        />
                    ))}
            </div>
      </div>
    );
}

export default Orders;