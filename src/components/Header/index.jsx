import React from "react";
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img width={40} height={40} alt="logo" src="/img/logo.png" />
                    <div className="">
                        <h3 className="text-uppercase mr-0">React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="rightHeader d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img width={18} height={18} alt="Корзина" src="/img/cart.svg" />
                    <span>1205 руб.</span>
                </li>
                <li className="mr-20 cu-p d-flex align-center">
                    <Link to="/favorites">
                        <img width={18} height={18} alt="Закладки" src="/img/headerHeart.svg" />
                    </Link>
                </li>
                <li className="d-flex align-center">
                    <img width={18} height={18} alt="Пользователь" src="/img/user.svg" />
                </li>
            </ul>
        </header>
    );
}

export default Header;