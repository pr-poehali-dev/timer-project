import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface TimerControlsProps {
  isRunning: boolean;
  time: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  time,
  onStart,
  onPause,
  onReset,
}) => {
  return (
    <div className="flex justify-center items-center space-x-6">
      <Button
        onClick={isRunning ? onPause : onStart}
        size="lg"
        className={`h-16 w-16 rounded-full text-white font-bold transition-all duration-300 transform hover:scale-110 ${
          isRunning
            ? "bg-black hover:bg-gray-800"
            : "bg-black hover:bg-gray-800"
        }`}
      >
        <Icon name={isRunning ? "Pause" : "Play"} size={24} />
      </Button>

      <Button
        onClick={onReset}
        variant="outline"
        size="lg"
        className="h-12 w-12 rounded-full border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-110"
        disabled={time === 0}
      >
        <Icon name="RotateCcw" size={20} />
      </Button>
    </div>
  );
};

export default TimerControls;
