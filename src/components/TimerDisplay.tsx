import React from "react";
import { cn } from "@/lib/utils";

interface TimerDisplayProps {
  time: number;
  isRunning: boolean;
  className?: string;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  time,
  isRunning,
  className,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={cn("text-center", className)}>
      <div
        className={cn(
          "text-8xl font-bold font-mono tracking-wider transition-all duration-300",
          isRunning ? "text-indigo-600 scale-105" : "text-gray-700",
          time === 0 ? "text-red-500" : "",
        )}
      >
        {formatTime(time)}
      </div>
      <div className="mt-4">
        <div
          className={cn(
            "w-32 h-1 mx-auto rounded-full transition-all duration-300",
            isRunning ? "bg-indigo-600 animate-pulse" : "bg-gray-300",
          )}
        />
      </div>
    </div>
  );
};

export default TimerDisplay;
