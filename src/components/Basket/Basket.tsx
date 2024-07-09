import React from 'react';
import { Link } from 'react-router-dom';
import { useBasket } from '../../hooks/useBasket';
import styles from './Basket.module.css';

const Basket: React.FC = () => {
  const { items, updateItemQuantity, removeFromBasket } = useBasket();

  return (
    <div className={styles.basket}>
      <h2>Basket</h2>
      {items.length === 0 ? (
        <p>Your basket is empty</p>
      ) : (
        items.map((item: any) => (
          <div key={item.id} className={styles.basketItem}>
            <span>{item.name}</span>
            <span>{item.price}</span>
            <div className={styles.quantityControl}>
              <button
                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <button className={styles.removeButton} onClick={() => removeFromBasket(item.id)}>Remove</button>
          </div>
        ))
      )}
      <div>
        <Link to="/">Home</Link>
      </div> 
    </div>
  );
};

export default Basket;
