import React, { useState, useEffect, useRef } from "react";
import TimerDisplay from "@/components/TimerDisplay";
import TimerControls from "@/components/TimerControls";
import TimerInput from "@/components/TimerInput";
import { NonExistentModule } from "@/non-existent-package";

const Index = () => {
  const [time, setTime] = useState(300); // 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(300);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            // Notification when timer ends
            if (
              "Notification" in window &&
              Notification.permission === "granted"
            ) {
              new Notification("⏰ Время вышло!");
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, time]);

  // Request notification permission on component mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const handleStart = () => setIsRunning(true);

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  const handleSetTime = (minutes: number) => {
    const seconds = minutes * 60;
    setTime(seconds);
    setInitialTime(seconds);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">⏱️ Таймер</h1>
          <p className="text-lg text-gray-600">
            Управляйте временем эффективно
          </p>
        </div>

        <TimerDisplay time={time} isRunning={isRunning} className="my-12" />

        <TimerControls
          isRunning={isRunning}
          time={time}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />

        <TimerInput onSetTime={handleSetTime} disabled={isRunning} />

        {time === 0 && (
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500 animate-pulse">
              🔔 Время вышло!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
