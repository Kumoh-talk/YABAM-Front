import {
  NavigateBeforeRounded,
  NavigateNextRounded,
} from '@mui/icons-material';
import { Button } from '@/components/common';
import { SaleDto } from '@/types/backend/sale';

export interface Props {
  onChange?: (sale: SaleDto) => void;
  value: SaleDto | null;
  values: SaleDto[];
}
export const SaleSelect = (props: Props) => {
  if (!props.value) return null;

  const startedTimeStr = new Date(props.value.openDateTime).toLocaleString(
    'ko-KR',
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    },
  );

  const closedTimeStr = props.value.closeDateTime
    ? new Date(props.value.closeDateTime).toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
    : '영업중';

  const currentIndex = props.values.findIndex(
    (sale) => sale.saleId === props.value!.saleId,
  );

  return (
    <div className="flex flex-row gap-1 items-center">
      {currentIndex < props.values.length - 1 && (
        <Button
          color="black-transparent"
          className="w-10"
          onClick={() => props.onChange?.(props.values[currentIndex + 1])}
        >
          <NavigateBeforeRounded />
        </Button>
      )}
      <span className="flex flex-col text-lg leading-none font-medium">
        <span>{startedTimeStr}</span>
        <span className="w-full text-center text-base leading-none">~</span>
        <span>{closedTimeStr}</span>
      </span>
      {currentIndex > 0 && (
        <Button
          color="black-transparent"
          className="w-10"
          onClick={() => props.onChange?.(props.values[currentIndex - 1])}
        >
          <NavigateNextRounded />
        </Button>
      )}
    </div>
  );
};
