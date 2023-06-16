import React from "react";
import axios from "axios";

import Info from "../Info/Info";
import styles from "./Drawer.module.scss";
import AppContext from "../../context";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({onClose, onRemove, items = []}) {
    const {cartItems ,setCartItems} = React.useContext(AppContext)
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://64825d0a29fa1c5c5032dea2.mockapi.io/orders', {
                items: cartItems
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i  < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://64792107a455e257fa62f24b.mockapi.io/cart/' + item.id);
                await delay(1000);
            }
        } catch(error) {
            console.log('Ошибка при создании заказа :(')
        }
        setIsLoading(false);
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">Корзина <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Remove"/></h2>

                {
                    items.length > 0 ? 
                (
                <>
                    <div className={styles.cart}>
                        {items.map((obj) => (
                            <div key={obj.id} className={styles.cartItem}>
                                <div style={{backgroundImage: `url(${obj.imageUrl})`}}
                                className={styles.cartItemImg}></div>

                                <div className="mr-20 flex">
                                    <p className="mb-5">{obj.title}</p>
                                    <b>{obj.price} руб.</b>
                                </div>
                                <img onClick={() => onRemove(obj.id)} className={styles.removeBtn}src="/img/btn-remove.svg" alt="Remove"/>
                            </div> 
                        ))
                        }
                    </div>

                    <div className={styles.cartTotalBlock}>
                        <ul>
                            <li className="d-flex">
                                <span>Итого:</span>
                                <div></div>
                                <b>21 498 руб. </b>
                            </li>
                            <li className="d-flex">
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>1074 руб.</b>
                            </li>
                        </ul>
                        <button disabled={isLoading} onClick={onClickOrder} className={styles.greenButton}>Оформить заказ <img src="/img/arrow.svg" alt="arrow" /></button>
                    </div>
                </>
                ) : (
                    <Info 
                    title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая" }
                    description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} 
                    image={isOrderComplete ? "/img/completeOrder.jpg" : "/img/empty-cart.jpg"}
                    />
                )
                }
            </div>
        </div>
    );
}

export default Drawer;

