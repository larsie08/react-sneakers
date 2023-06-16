import React from "react";
import { Link } from 'react-router-dom';
import styles from "./Header.module.scss"

function Header(props) {
    return (
        <header className={styles.header}>
            <Link to={"/"}>
                <div className={styles.header__left}>
                    <img width={40} height={40} alt="logo" src="/img/logo.png" />
                    <div>
                        <h3 className="text-uppercase mr-0">React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className={styles.header__right}>
                <li onClick={props.onClickCart}>
                    <img alt="Корзина" src="/img/cart.svg" />
                    <span>1205 руб.</span>
                </li>
                <Link to="/favorites">
                    <li className="mr-20 cu-p d-flex align-center">
                            <img width={18} height={18} alt="Закладки" src="/img/headerHeart.svg" />
                    </li>
                </Link>
                <li>
                    <img alt="Пользователь" src="/img/user.svg" />
                </li>
            </ul>
        </header>
    );
}

export default Header;