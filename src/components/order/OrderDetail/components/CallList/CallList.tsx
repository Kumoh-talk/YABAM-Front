import { CallItem } from './components';
import { dummyCalls } from './constants';

export const CallList = () => {
  const list = dummyCalls.map((call) => <CallItem key={call.id} item={call} />);
  return (
    <ul className="flex flex-col gap-3">
      <span className="text-base font-medium px-4">요청사항</span>
      {list}
    </ul>
  );
};
