import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import styles from './ProductList.module.css';
import ListItem from "../../components/ListItem/ListItem"

const ProductList: React.FC = () => {
  const { status, error } = useProducts();

  return (
    <div className={styles.productList}>
      <h2>Products</h2>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {status === 'succeeded' && <ListItem/> }
    </div>
  );
};

export default ProductList;
