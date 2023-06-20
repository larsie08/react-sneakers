import React from "react";
import axios from "axios";

import Info from "../Info/Info";

import AppContext from "../../context";

import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({onClose, onRemove, items = [], opened}) {
    const {cartItems ,setCartItems} = React.useContext(AppContext);

    if (opened) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }

    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

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
            alert('Ошибка при создании заказа :(');
            console.log(error);
        }
        setIsLoading(false);
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2>
                    Корзина 
                    <img onClick={onClose} src="/img/btn-remove.svg" alt="Remove"/>
                </h2>

                {
                    items.length > 0 ? 
                (
                <>
                    <div className={styles.cart}>
                        {items.map((obj) => (
                            <div key={obj.id} className={styles.cart__item}>
                                <div style={{backgroundImage: `url(${obj.imageUrl})`}}
                                className={styles.cart__img}></div>

                                <div className={styles.cart__desc}>
                                    <p className={styles.cart__title}>{obj.title}</p>
                                    <b className={styles.cart__price}>{obj.price} руб.</b>
                                </div>
                                <img onClick={() => onRemove(obj.id)} className={styles.cart__remove}src="/img/btn-remove.svg" alt="Remove"/>
                            </div> 
                        ))
                        }
                    </div>

                    <div className={styles.cartTotalBlock}>
                        <ul>
                            <li>
                                <span>Итого:</span>
                                <div></div>
                                <b>{totalPrice} руб. </b>
                            </li>
                            <li>
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>{(totalPrice / 100) * 5} руб.</b>
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

