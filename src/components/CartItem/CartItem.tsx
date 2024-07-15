import React, { useState } from 'react';

import { useBasket } from '../../hooks/useBasket';
import styles from './CartItem.module.css';
import { NumericFormat } from 'react-number-format';
import { BasketItem } from '../../Interfaces'

const CartItem: React.FC = () => {
  const { items, updateItemQuantity, removeFromBasket } = useBasket();
  const [removingItems, setRemovingItems] = useState<number[]>([]);
  const [updatingItems, setUpdatingItems] = useState<number[]>([]);

  const handleRemoveItem = (id: number) => {
    setRemovingItems(prev => [...prev, id]);

    setTimeout(() => {
      removeFromBasket(id);
      setRemovingItems(prev => prev.filter(itemId => itemId !== id));
    }, 500); // Match the duration of the fadeOut animation
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setUpdatingItems(prev => [...prev, id]);

    setTimeout(() => {
      updateItemQuantity(id, quantity);
      setUpdatingItems(prev => prev.filter(itemId => itemId !== id));
    }, 500); // Match the duration of the highlight animation
  };
  return (
    <div className='Items'>{
        items.map((item: BasketItem) => (
          <div
          key={item.id}
          className={`${styles.basketItem} ${removingItems.includes(item.id) ? styles.fadeOut : ''} ${updatingItems.includes(item.id) ? styles.highlight : ''}`}
          >
          <span>{item.name}</span>
            <span><NumericFormat value={item.price?.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </span>
            <div className={styles.quantityControl}>
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <button className={styles.removeButton} onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </div>
        ))
      }
    </div>
  );
};

export default CartItem;
