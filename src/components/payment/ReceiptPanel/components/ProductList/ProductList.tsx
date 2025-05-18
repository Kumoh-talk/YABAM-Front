import { OrderMenuInfo } from '@/types/backend/order';
import { ProductItem } from '../ProductItem/ProductItem';

export interface Props {
  items: OrderMenuInfo[];
  onChangeAmount?: (id: number, amount: number) => void;
}

export const ProductList = (props: Props) => {
  const list = props.items.map((item, index) => (
    <ProductItem
      key={index}
      item={item}
      onChangeAmount={props.onChangeAmount}
    />
  ));
  return <ul className="flex flex-col flex-1 h-0 overflow-y-auto">{list}</ul>;
};
