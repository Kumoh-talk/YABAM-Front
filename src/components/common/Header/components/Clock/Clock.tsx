import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export const Clock = () => {
  const [time, setTime] = useState(dayjs().format('M.DD (dd) A hh:mm:ss'));

  useEffect(() => {
    dayjs.locale('ko');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = dayjs().format('M.DD (dd) A hh:mm:ss');
      if (time !== newTime) {
        setTime(newTime);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [time]);

  return <span className="min-w-max mx-6 text-base">{time}</span>;
};
