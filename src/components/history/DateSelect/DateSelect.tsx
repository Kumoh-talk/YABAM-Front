import {
  NavigateBeforeRounded,
  NavigateNextRounded,
} from '@mui/icons-material';
import { Button } from '@/components/common';
import { formarDateString } from '@/utils/functions';

export interface Props {
  onChange?: (date: Date) => void;
  value: Date;
}
export const DateSelect = (props: Props) => {
  const dateString = formarDateString(props.value);
  return (
    <div className="flex flex-row gap-1 items-center">
      <Button
        color="black-transparent"
        className="w-10"
        onClick={() =>
          props.onChange?.(
            new Date(props.value.getTime() - 1000 * 60 * 60 * 24),
          )
        }
      >
        <NavigateBeforeRounded />
      </Button>
      <span className="text-2xl leading-none font-medium">{dateString}</span>
      <Button
        color="black-transparent"
        className="w-10"
        onClick={() =>
          props.onChange?.(
            new Date(props.value.getTime() + 1000 * 60 * 60 * 24),
          )
        }
      >
        <NavigateNextRounded />
      </Button>
    </div>
  );
};
