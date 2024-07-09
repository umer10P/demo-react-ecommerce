import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts } from '../store/productSlice/productsSlice';

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state: any) => state.products.products);
  const status = useAppSelector((state: any) => state.products.status);
  const error = useAppSelector((state:any ) => state.products.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return { products, status, error };
};
