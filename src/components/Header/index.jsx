import React from "react";
import { Link } from 'react-router-dom';
import AppContext from "../../context";

import styles from "./Header.module.scss";

function Header(props) {
    const { cartItems } = React.useContext(AppContext);

    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    return (
        <header className={styles.header}>
            <Link to={"/"}>
                <div className={styles.header__left}>
                    <img width={40} height={40} alt="logo" src="/img/logo.png" />
                    <div>
                        <h3>React Sneakers</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className={styles.header__right}>
                <li onClick={props.onClickCart}>
                    <img alt="Корзина" src="/img/cart.svg" />
                    <span>{totalPrice} руб.</span>
                </li>
                <Link to="/favorites">
                    <li>
                            <img width={18} height={18} alt="Закладки" src="/img/headerHeart.svg" />
                    </li>
                </Link>
                <Link to="/orders">
                    <li>
                        <img alt="Пользователь" src="/img/user.svg" />
                    </li>
                </Link>
            </ul>
        </header>
    );
}

export default Header;