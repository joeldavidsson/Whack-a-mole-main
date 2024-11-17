/**
 * Komponent som visar spelstatistik: poäng och tid kvar.
 * @param{number} score - Den aktuella poängen i spelet
 * @param{number} timeLeft - Antal sekunder kvar av spelet
 *
 */
'use client';

import {Timer} from '../components';
import {useGameContext} from '@/hooks';

export function GameStats() {
  const context = useGameContext();
  return (
    <div className='flex justify-between items-center w-full p-4 text-xl font-semibold uppercase cursor-default select-none'>
      <div className='flex justify-center items-center'>
        Time Left: <Timer />
      </div>
      <div>Player: <span className='text-primary'>{context.name}</span></div>
      <div>Score: {context.score}</div>
    </div>
  );
}

export default GameStats;
