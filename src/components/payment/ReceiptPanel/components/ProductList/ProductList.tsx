import { Product } from '@/types';
import { ProductItem } from '../ProductItem/ProductItem';

export interface Props {
  items: Product[];
}

export const ProductList = (props: Props) => {
  const list = props.items.map((item, index) => (
    <ProductItem key={index} item={item} />
  ));
  return <ul className="flex flex-col flex-1 h-0 overflow-y-auto">{list}</ul>;
};
