import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type UseCountdownProps = {
  onTick?: (time: number) => void;
  onTimeOut?: () => void;
};

export const useCountdown = (
  initialTime: number,
  options?: UseCountdownProps,
): [number, Dispatch<SetStateAction<number>>] => {
  const { onTick, onTimeOut } = options ?? {};

  const [timer, setTimer] = useState<number>(initialTime);

  useEffect(() => {
    if (timer === 0) {
      onTimeOut?.();
      return;
    }

    const interval = setInterval(() => {
      setTimer(time => time - 1);
      onTick?.(timer);
    }, 1000);

    return () => clearInterval(interval);
  }, [onTick, onTimeOut, timer]);

  return [timer, setTimer];
};
