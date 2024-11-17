'use client';

import React, {createContext, useState, ReactNode, useCallback} from 'react';

interface GameContextType {
  isStarted: boolean;
  score: number;
  name: string;
  fastestReactionTime: number | null;
  setName: (name: string) => void;
  addFastestReactionTime: (reactionTime: number) => void;
  startGame: () => void;
  stopGame: () => void;
  addScore: () => void;
  saveResult: (
    name: string,
    score: number,
    reactionTime: number
  ) => Promise<void>;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({children}: GameProviderProps) => {
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [name, setName] = useState('');
  const [fastestReactionTime, setFastestReactionTime] = useState<number | null>(
    null
  );

  const addScore = useCallback(() => {
    setScore((prev) => prev + 1);
  }, []);

  const startGame = useCallback(() => {
    setIsStarted(true);
    setScore(0);
    setFastestReactionTime(null);
  }, []);

  const stopGame = useCallback(() => {
    setIsStarted(false);
  }, []);

  const addFastestReactionTime = useCallback((reactionTime: number) => {
    setFastestReactionTime((prev) => {
      if (prev === null || reactionTime < prev) {
        return reactionTime;
      }
      return prev;
    });
  }, []);

  const saveResult = async (
    name: string,
    score: number,
    reactionTime: number
  ) => {
    const url = '/api/results';
    const response = await fetch(window.location.origin + url, {
      method: 'POST',
      body: JSON.stringify({
        name,
        score,
        reactionTime,
      }),
    });
    const result = await response.json();
    return result.id;
  };

  return (
    <GameContext.Provider
      value={{
        isStarted,
        score,
        name,
        fastestReactionTime,
        addFastestReactionTime,
        setName,
        startGame,
        stopGame,
        addScore,
        saveResult,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
