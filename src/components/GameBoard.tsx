import {ActiveMole} from '@/models';
import {Mole} from '../components';
import {useEffect, useState} from 'react';
import {getRandomNum} from '@/utils';
import {useGameContext} from '@/hooks';
import { useRouter } from 'next/navigation';

export function GameBoard() {
  const context = useGameContext();
  const router = useRouter();
  const [activeMoles, setActiveMoles] = useState<ActiveMole[]>([]);
  const [clickedMoles, setClickedMoles] = useState<number[]>([]);

  const handleClickMole = (i: number) => {
    const clickedMole = activeMoles.find((a) => a.index === i);

    if (!clickedMole) return;

    const currentTime = new Date().getTime();
    const reactionTime = currentTime - clickedMole?.startTime;

    context.addFastestReactionTime(reactionTime);
    context.addScore();

    setClickedMoles((prev) => [...prev, i]);

    setTimeout(() => {
      setClickedMoles((prev) => prev.filter((moleIndex) => moleIndex !== i));
      setActiveMoles((prev) => prev.filter((a) => a.index !== i));
    }, 500);
  };

  useEffect(() => {
    if (!context.name) router.push('/');
    if (!context.isStarted) return;
    const interval = setInterval(() => {
      setActiveMoles((prev) => {
        if (prev.length >= 3) return prev;

        const randomIndex = getRandomNum(0, 24);
        if (activeMoles.some((a) => a.index === randomIndex)) return prev;

        const newMole = new ActiveMole(randomIndex, new Date().getTime());

        setTimeout(() => {
          setActiveMoles((prev) =>
            prev.filter((mole) => mole.index !== newMole.index)
          );
        }, getRandomNum(1000, 4000));

        return [...prev, new ActiveMole(randomIndex, new Date().getTime())];
      });
    }, getRandomNum(300, 600));

    return () => clearInterval(interval);
  }, [context, activeMoles]);

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='min-w-[672px] grid grid-cols-5 gap-2'>
        {Array.from({length: 25}, (_, i) => (
          <Mole
            key={i}
            isActive={activeMoles.some((a) => a.index === i)}
            isClicked={clickedMoles.includes(i)}
            onClick={(_) => handleClickMole(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default GameBoard;
