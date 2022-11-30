import { useRef, useState } from "react";

type CountdownOptions = {
  /**
   * a callback which will be fired after the countdown ends
   */
  action?: () => void;
  /**
   * the countdown duration in seconds
   * default is 3 seconds
   */
  duration?: number;
};

type CountdownAPI = {
  /**
   * starts the countdown
   */
  start: () => void;
  /**
   * prematurely cancels the countdown so the action will not run
   */
  cancel: () => void;
  /**
   * seconds left before the countdown ends (from `duration` option value to 0)
   * is `null` if the countdown has not started
   */
  seconds: number | null;
  /**
   * percents left before the countdown ends (from 100 to 0)
   * is null if the countdown has not started
   */
  percents: number | null;
};

type UseCountdown = (options: CountdownOptions) => CountdownAPI;

export const useCountdown: UseCountdown = ({ action, duration = 3 }) => {
  const [percents, setPercents] = useState<number | null>(null);

  const intervalIdRef = useRef<ReturnType<typeof setInterval>>();

  function start() {
    const startTime = Date.now();

    const finalTime = startTime + duration * 1000;

    intervalIdRef.current = setInterval(() => {
      const currentTime = Date.now();
      const percent = Math.round((finalTime - currentTime) / (duration * 10));

      if (percent >= 0) {
        setPercents(percent);
      }

      if (currentTime > finalTime) {
        action?.();
        setPercents(null);
        clearInterval(intervalIdRef.current);
      }
    }, 20);
  }

  function cancel() {
    setPercents(null);
    clearInterval(intervalIdRef.current);
  }

  const seconds =
    percents === null ? null : Math.ceil((duration * percents) / 100);

  return {
    start,
    cancel,
    seconds,
    percents,
  };
};
