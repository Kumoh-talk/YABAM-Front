import { OrderItem, Props as OrderItemProps } from '../OrderItem/OrderItem';

export interface Props {
  items: OrderItemProps[];
}

export const OrderList = (props: Props) => {
  const list = props.items.map((item, index) => (
    <OrderItem
      key={index}
      menuName={item.menuName}
      quantity={item.quantity}
      price={item.price}
    />
  ));
  return <ul className="flex flex-col flex-1 h-0 overflow-y-auto">{list}</ul>;
};
