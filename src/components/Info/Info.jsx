import React from 'react';

import styles from './Info.module.scss'
import AppContext from '../../context';

const Info = ({title, image, description}) => {
    const {setCartOpened} = React.useContext(AppContext);

  return (
    <div className={styles.cartEmpty}>
        <img className={styles.box} width={120} src={image} alt="Empty Cart"/>
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={() => setCartOpened(false)} className={styles.greenButton}>
            <img src="/img/arrow.svg" alt="Arrow" />Вернуться назад
        </button>
    </div>
  )
}

export default Info;