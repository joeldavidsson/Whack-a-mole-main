"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NameInput from "./NameInput";
import { useGameContext } from "@/hooks";
import Link from "next/link";

export default function Welcome() {
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const context = useGameContext();

  const handleShowName = () => {
    setShowNameInput(true);
  };

  const handleContinue = () => {
    if (playerName.trim() === "") {
      setError("Please enter your name");
      return;
    }
    setError("");
    context.setName(playerName);
    router.push("/gamepage");
  };

  const handleCancel = () => {
    setShowNameInput(false);
    setPlayerName("");
    setError("");
  };

  useEffect(() => {
    context.stopGame();
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <h1 className="text-4xl xl:text-6xl font-semibold pb-2 text-center">
        <span className="uppercase text-primary">Pet the cat</span>
      </h1>
      {error && <p className="text-error">{error}</p>}
      {showNameInput ? (
        <NameInput
          name={playerName}
          setName={setPlayerName}
          onCancel={handleCancel}
          onContinue={handleContinue}
          showControls={true}
        />
      ) : (
        <>
          <button
            onClick={handleShowName}
            className="bg-primary hover:bg-secondary text-white text-3xl rounded px-6 py-3 uppercase transition"
          >
            Let’s Play
          </button>
          <Link href={'/hiscorePage'} className="border-2 border-primary hover:border-secondary hover:bg-secondary text-accent rounded px-4 py-2 uppercase transition">Hiscore</Link>
        </>
      )}
    </div>
  );
}
