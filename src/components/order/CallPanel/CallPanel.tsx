import { Button } from '@/components/common';
import { useCallValues } from '@/contexts/call/CallContext';
import { CheckRounded } from '@mui/icons-material';

export const CallPanel = () => {
  const { calls, handleCompleteCall } = useCallValues();

  return (
    <section className="absolute left-4 bottom-0 w-[26rem] bg-white border border-gray-300 rounded-lg shadow-lg z-50">
      <header className="flex flex-row justify-between items-center p-4 border-b border-gray-500 leading-none text-xl">
        <span className="font-medium">요청사항</span>
        {calls.length > 0 && (
          <div className="flex px-2 text-sm bg-red rounded-xl text-white">
            {calls.length}
          </div>
        )}
      </header>
      <ul className="max-h-60 overflow-y-auto">
        {calls.length > 0 ? (
          calls.map((call) => (
            <li
              key={call.callId}
              className="flex flex-row justify-between items-center p-2 border-b border-gray-500 text-xl"
            >
              <span>
                [{call.tableNumber}번 테이블] {call.callMessage}
              </span>
              <Button onClick={() => handleCompleteCall(call.callId)}>
                <CheckRounded />
              </Button>
            </li>
          ))
        ) : (
          <li className="px-4 py-2 text-text-secondary">요청사항이 없습니다</li>
        )}
      </ul>
    </section>
  );
};
