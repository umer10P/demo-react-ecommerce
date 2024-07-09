import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useBasket } from '../../hooks/useBasket';
import styles from './ProductList.module.css';

const ProductList: React.FC = () => {
  const { products, status, error } = useProducts();
  const { addToBasket, addItemStatus } = useBasket();

  return (
    <div className={styles.productList}>
      <h2>Products</h2>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {status === 'succeeded' && (
        <div className={styles.products}>
          {products.map((product: any) => (
            <div key={product.id} className={styles.product}>
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <button onClick={() => addToBasket({ ...product, quantity: 1 })} disabled={addItemStatus === 'loading'}>
                {addItemStatus === 'loading' ? 'Adding...' : 'Add to Basket'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
