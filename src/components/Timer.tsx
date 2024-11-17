'use client';
import {useState, useEffect} from 'react';
import {useGameContext} from '@/hooks';
import {useRouter} from 'next/navigation';

export function Timer() {
  const initialTime = 60;
  const [time, setTime] = useState<number>(initialTime);
  const context = useGameContext();
  const router = useRouter();

  useEffect(() => {
    if (!context.isStarted || time == 0) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [context.isStarted, time]);

  useEffect(() => {
    if (time === 0) {
      context.stopGame();
      if (context.fastestReactionTime === null) {
        router.push('/');
        return;
      } else
        context.saveResult(
          context.name,
          context.score,
          context.fastestReactionTime
        ).then((id) => {
          router.push(`/hiscorePage?id=${id}`);
        });
      setTime(initialTime);
    }
  }, [time, context, context.stopGame, router]);

  return time;
}

export default Timer;
