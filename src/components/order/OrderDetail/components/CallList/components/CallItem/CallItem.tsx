import { Button } from '@/components/common';
import { Call } from '@/types';
import { formatRelativeTime } from '@/utils/functions';
import { CheckRounded } from '@mui/icons-material';

export interface Props {
  item: Call;
}

export const CallItem = ({ item }: Props) => {
  return (
    <li className="flex flex-row px-4 py-3 justify-between items-center bg-white rounded-lg border border-gray-500">
      <div className="flex flex-col gap-1">
        <span className="text-base leading-[1.4]">{item.message}</span>
        <span className="text-sm leading-none text-text-secondary">
          {formatRelativeTime(item.calledAt)}
        </span>
      </div>
      <Button><CheckRounded /></Button>
    </li>
  );
};
