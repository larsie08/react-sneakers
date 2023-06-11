import styles from "./Drawer.module.scss";

function Drawer({onClose, onRemove, items = []}) {
    return (
        <div className={styles.overlay}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">Корзина <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Remove"/></h2>

                {
                    items.length > 0 ? 
                (
                <div>
                    <div className={styles.items}>
                        {items.map((obj) => (
                            <div className={styles.cartItem}>
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
                        <button className={styles.greenButton}>Оформить заказ <img src="/img/arrow.svg" alt="arrow" /></button>
                    </div>
                </div>
                ) : (   
                <div className={styles.cartEmpty}>
                    <img className="mb-20" width={120} height={120} src="/img/empty-cart.jpg" alt="Empty Cart"/>
                    <h2>Корзина пустая</h2>
                    <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                    <button onClick={onClose} className={styles.greenButton}>
                        <img src="/img/arrow.svg" alt="Arrow" />Вернуться назад
                    </button>
                </div>
                )
                }
            </div>
        </div>
    );
}

export default Drawer;

