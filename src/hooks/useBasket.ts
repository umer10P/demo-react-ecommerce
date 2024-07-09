import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addItemToBasket, removeItemFromBasket, updateItemQuantityInBasket } from '../store/basketSlice/basketSlice';

export const useBasket = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state:any) => state.basket.items);
  const addItemStatus = useAppSelector((state:any) => state.basket.addItemStatus);

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
