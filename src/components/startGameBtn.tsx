'use client';

import {useGameContext} from '@/hooks';

export const StartGameBtn = () => {
  const context = useGameContext();

  return (
    <div className='flex justify-center p-5'>
      <button
        onClick={context.startGame}
        disabled={context.isStarted}
        className='w-64 uppercase font-bold bg-primary hover:bg-secondary rounded text-accent text-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:border-error px-6 py-3'
      >
        {context?.isStarted ? 'Started' : 'Start new game'}
      </button>
    </div>
  );
};

export default StartGameBtn;
