"use client";

import { useGameContext } from "@/hooks";
import { Result } from "@prisma/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Component that displays the 10 highest scores and the 10 fastest reaction times.
 * The amount of results can be changed by providing a query parameter called "amount".
 * The component is a client-side component and fetches the data from the API on mount.
 * @returns {JSX.Element}
 */
export default function Hiscore() {
  const context = useGameContext();
  const [scores, setScores] = useState<Result[]>([]);
  const [reactionTime, setReactionTime] = useState<Result[]>([]);
  const [seconds, setSeconds] = useState(10);
  const [selected, setSelected] = useState<'score' | 'reaction'>('score');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const router = useRouter();
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("id");

  useEffect(() => {
    const fetchScores = async () => {
      const response = await fetch("/api/results/topScores?amount=10");
      const data = await response.json();
      setScores(data);
    };

    const fetchReactionTime = async () => {
      const url = "/api/results/topReactionTimes?amount=10";
      const response = await fetch(window.location.origin + url, {
        method: "GET",
      });
      const data = await response.json();
      setReactionTime(data);
    };

    fetchScores();
    fetchReactionTime();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onResize = addEventListener('resize', () => setWindowWidth(window.innerWidth));

    return removeEventListener('resize', () => onResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full p-10 text-primary font-semibold bg-neutral2 justify-evenly gap-6">
      <h1 className="flex justify-center items-center text-5xl uppercase">
        HiScore
      </h1>
      <div className="w-full flex flex-col justify-center items-center gap-4 flex-grow">
        <div className="w-full flex justify-center items-center">
          <div className='w-80 p-1 bg-neutral2 rounded-md md:hidden'>
            <button onClick={() => {setSelected('score')}} className={`w-[50%] text-accent text-nowrap py-1 px-2 rounded-md transition ${ selected === 'score' && 'bg-primary' }`}>Top Scores</button>
            <button onClick={() => {setSelected('reaction')}} className={`w-[50%] text-accent text-nowrap py-1 px-2 rounded-md transition ${ selected === 'reaction' && 'bg-primary' }`}>Reaction Times</button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-evenly gap-6 w-full">
          {windowWidth >= 768 ? (
            <>
              <div className="w-full bg-zinc-800 shadow-lg rounded-lg p-6">
                <h3 className="h-14 md:h-16 lg:h-[72px] overflow-y-hidden text-xl md:text-2xl lg:text-3xl text-center font-bold text-primary mb-6 uppercase">
                  Top 10 Players
                </h3>
                <div className="w-full max-w-4xl mx-auto">
                  <div className="flex justify-between font-bold text-sm px-4 py-2 bg-primary text-white rounded">
                    <span>Name</span>
                    <span>Score</span>
                  </div>
                  <div className="text-sm">
                    {scores.map((scores) => (
                      <div
                        key={scores.id}
                        className="flex justify-between px-4 py-2 border-b border-gray-200"
                      >
                        <span>{scores.name}</span>
                        <span>{scores.score} points</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full bg-zinc-800 shadow-lg rounded-lg p-6">
                <h3 className="h-14 md:h-16 lg:h-[72px] overflow-y-hidden text-xl md:text-2xl lg:text-3xl text-center font-bold text-primary mb-6 uppercase">
                  Honorable Reward - <br></br>Fastest Reaction Times
                </h3>
                <div className="w-full max-w-4xl mx-auto">
                  <div className="flex justify-between font-bold text-sm px-4 py-2 bg-primary text-white rounded">
                    <span>Name</span>
                    <span>Reaction Time</span>
                  </div>
                  <div className="text-sm">
                    {reactionTime.map((player) => (
                      <div
                        key={player.id}
                        className="flex justify-between px-4 py-2 border-b border-gray-200"
                      >
                        <span>{player.name}</span>
                        <span>{player.reactionTime} ms</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : windowWidth < 768 && selected === 'score' ? (
            <div className="w-full bg-zinc-800 shadow-lg rounded-lg p-6">
              <h3 className="h-14 md:h-16 lg:h-[72px] overflow-y-hidden text-xl md:text-2xl lg:text-3xl text-center font-bold text-primary mb-6 uppercase">
                Top 10 Players
              </h3>
              <div className="w-full max-w-4xl mx-auto">
                <div className="flex justify-between font-bold text-sm px-4 py-2 bg-primary text-white rounded">
                  <span>Name</span>
                  <span>Score</span>
                </div>
                <div className="text-sm">
                  {scores.map((scores) => (
                    <div
                      key={scores.id}
                      className="flex justify-between px-4 py-2 border-b border-gray-200"
                    >
                      <span>{scores.name}</span>
                      <span>{scores.score} points</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : windowWidth < 768 && selected === 'reaction' ? (
            <div className="w-full bg-zinc-800 shadow-lg rounded-lg p-6">
              <h3 className="h-14 md:h-16 lg:h-[72px] overflow-y-hidden text-xl md:text-2xl lg:text-3xl text-center font-bold text-primary mb-6 uppercase">
                Honorable Reward - <br></br>Fastest Reaction Times
              </h3>
              <div className="w-full max-w-4xl mx-auto">
                <div className="flex justify-between font-bold text-sm px-4 py-2 bg-primary text-white rounded">
                  <span>Name</span>
                  <span>Reaction Time</span>
                </div>
                <div className="text-sm">
                  {reactionTime.map((player) => (
                    <div
                      key={player.id}
                      className="flex justify-between px-4 py-2 border-b border-gray-200"
                    >
                      <span>{player.name}</span>
                      <span>{player.reactionTime} ms</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (<></>)}
        </div>
      </div>
      <div className="text-center text-xl text-primary">
        Redirected to homepage in.. {seconds}
      </div>
      <div className="flex justify-center items-center gap-4">
        <button
          disabled={!context.name.trim()}
          onClick={() => {
            router.push("/gamepage");
          }}
          className={`border-2 border-primary bg-primary ${
            !context.name.trim()
              ? "disabled:opacity-25 disabled:cursor-not-allowed"
              : "hover:bg-secondary hover:border-secondary"
          } text-accent text-nowrap rounded py-1 sm:py-3 px-2 sm:px-6 uppercase transition`}
        >
          Play Again
        </button>
        <Link
          href={"/"}
          className="border-2 border-primary hover:border-secondary hover:bg-secondary text-accent text-nowrap rounded py-1 sm:py-3 px-2 sm:px-6 uppercase transition"
        >
          Back to Main Menu
        </Link>
      </div>
    </div>
  );
}
