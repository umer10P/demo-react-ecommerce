import React from 'react';
import { Link } from 'react-router-dom';
import { useBasket } from '../../hooks/useBasket';
import styles from './Basket.module.css';
import  CartItem  from '../../components/CartItem/CartItem'

const Basket: React.FC = () => {
  const { items } = useBasket();

  return (
    <div className={styles.basket}>
      <h2>Basket</h2>
      {items.length === 0 ? (
        <p>Your basket is empty</p>
      ) : ( <CartItem/>)}
      <div>
        <Link to="/">Home</Link>
      </div> 
    </div>
  );
};

export default Basket;
