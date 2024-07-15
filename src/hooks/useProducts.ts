import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchProducts } from '../store/productSlice/productsSlice';
import { RootState } from '../store';

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state: RootState) => state.products.products);
  const status = useAppSelector((state: RootState) => state.products.status);
  const error = useAppSelector((state:RootState ) => state.products.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return { products, status, error };
};
