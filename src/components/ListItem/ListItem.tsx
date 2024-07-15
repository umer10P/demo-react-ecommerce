import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useBasket } from '../../hooks/useBasket';
import styles from './ListItem.module.css';
import { Product } from '../../Interfaces';
import { NumericFormat } from 'react-number-format';

const ListItem: React.FC = () => {
  const { products } = useProducts();
  const { addToBasket, addItemStatus } = useBasket();
  const [bouncingButtons, setBouncingButtons] = useState<number[]>([]);

  const handleAddToBasket = (product: Product) => {
    addToBasket({ ...product, quantity: 1 });
    setBouncingButtons((prev: any) => [...prev, product.id]);
    setTimeout(() => {
      setBouncingButtons((prev: any[]) => prev.filter((id: number) => id !== product.id));
    }, 500); 
  };
  return (
      <div className={styles.products}>
        {products.map((product: Product) => (
          <div key={product.id} className={styles.product}>
            <h3>{product.name}</h3>
            <p><NumericFormat value={product.price?.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
            <button className={bouncingButtons.includes(product.id) ? styles.bounce : ''} onClick={() => handleAddToBasket(product)} disabled={addItemStatus === 'loading'}>
              {addItemStatus === 'loading' ? 'Adding...' : 'Add to Basket'}
            </button>
          </div>
        ))}
      </div>
    );
};

export default ListItem;
