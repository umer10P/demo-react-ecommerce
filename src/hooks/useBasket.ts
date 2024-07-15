import { useAppDispatch, useAppSelector } from './hooks';
import { addItemToBasket, removeItemFromBasket, updateItemQuantityInBasket } from '../store/basketSlice/basketSlice';
import { RootState } from '../store';

export const useBasket = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state: RootState) => state.basket.items);
  const addItemStatus = useAppSelector((state: RootState) => state.basket.addItemStatus);

  const addToBasket = (item: { id: number; name: string; price: number; quantity: number }) => {
    dispatch(addItemToBasket(item));
  };

  const removeFromBasket = (id: number) => {
    dispatch(removeItemFromBasket(id));
  };

  const updateItemQuantity = (id: number, quantity: number) => {
    dispatch(updateItemQuantityInBasket({ id, quantity }));
  };

  return { items, addItemStatus, addToBasket, removeFromBasket, updateItemQuantity };
};
