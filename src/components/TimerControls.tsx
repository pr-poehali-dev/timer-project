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
            ? "bg-red-500 hover:bg-red-600"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        <Icon name={isRunning ? "Pause" : "Play"} size={24} />
      </Button>

      <Button
        onClick={onReset}
        variant="outline"
        size="lg"
        className="h-12 w-12 rounded-full border-2 transition-all duration-300 transform hover:scale-110"
        disabled={time === 0}
      >
        <Icon name="RotateCcw" size={20} />
      </Button>
    </div>
  );
};

export default TimerControls;
