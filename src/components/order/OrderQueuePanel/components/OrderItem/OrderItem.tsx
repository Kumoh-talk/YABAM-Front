import { Button } from "@/components/common";
import { formatRelativeTime } from "@/utils/functions";
import clsx from "clsx";
import { Table } from "@/types";
import { OrderInfo, OrderStatus } from "@/types/backend/order";
import { CheckRounded, CloseRounded } from "@mui/icons-material";
import { useOrderActions } from "@/contexts/order/OrderContext";

export interface Props {
  order: OrderInfo;
  table: Table;
  isOpened: boolean;
  onClick?: (id: number) => void;
}

export const OrderItem = ({ order, table, isOpened, onClick }: Props) => {
  const { cancelOrder, confirmOrder } = useOrderActions();
  return (
    <li
      className={clsx(
        "flex flex-col gap-3 p-4 text-sm leading-none border-b border-gray-500 cursor-pointer",
        { "opacity-50": order.orderStatus === "COMPLETED" },
        { "border-l-4 border-l-primary": isOpened }
      )}
      onClick={() => onClick?.(order.orderId)}
    >
      <div className="flex flex-row justify-between items-center font-medium">
        <div className="flex flex-row gap-2 items-center">
          <StatusTag status={order.orderStatus} />
          <span>{table.number}번 테이블</span>
        </div>
        <span>
          {formatRelativeTime(
            order.createdAt ?? order.receipt.receiptInfo.startUsageTime!
          )}
        </span>
      </div>
      <ul className="flex flex-col gap-1">
        {order.orderMenus.map((orderMenu) => (
          <li key={orderMenu.orderMenuId}>
            {orderMenu.menuInfo.menuName} x {orderMenu.quantity}
          </li>
        ))}
      </ul>
      {order.orderStatus === "ORDERED" && (
        <div
          className="flex flex-row self-end gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Button color="tertiary" onClick={() => cancelOrder(order.orderId)}>
            <CloseRounded />
          </Button>
          <Button onClick={() => confirmOrder(order.orderId)}>
            <CheckRounded />
          </Button>
        </div>
      )}
      {order.orderStatus === "COMPLETED" && (
        <div className="flex flex-row self-end gap-2"></div>
      )}
    </li>
  );
};

const StatusTag = ({ status }: { status: OrderStatus }) => {
  const color = {
    ORDERED: "bg-secondary text-text-dark-primary",
    RECEIVED: "bg-primary text-text-dark-primary",
    COMPLETED: "bg-gray-300 text-text-primary",
    CANCELED: "bg-gray-300 text-text-primary",
  }[status];
  const text = {
    ORDERED: "대기",
    RECEIVED: "진행중",
    COMPLETED: "완료됨",
    CANCELED: "취소됨",
  }[status];

  return (
    <span
      className={`text-sm leading-none font-medium p-1 rounded-sm ${color}`}
    >
      {text}
    </span>
  );
};
