interface NameInputProps {
  name: string;
  setName: (name: string) => void;
  onCancel: () => void;
  onContinue: () => void;
  showControls: boolean;
}

export default function NameInput({
  name,
  setName,
  onCancel,
  onContinue,
  showControls,
}: NameInputProps) {
  return (
    <div className="flex flex-col items-center max-w-md w-full bg-neutral2 shadow-md rounded-lg p-6">
      <input
        type="text"
        placeholder="Enter your player name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 p-2 rounded text-neutral1 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {showControls && (
        <div className="flex gap-4 mt-4 w-full">
          <button
            onClick={onCancel}
            className="bg-primary hover:bg-secondary text-accent rounded px-4 py-2 uppercase w-full"
          >
            Cancel
          </button>
          <button
            onClick={onContinue}
            className="bg-primary hover:bg-secondary text-accent rounded px-4 py-2 uppercase w-full"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
