import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TimerInputProps {
  onSetTime: (minutes: number) => void;
  disabled: boolean;
}

const TimerInput: React.FC<TimerInputProps> = ({ onSetTime, disabled }) => {
  const [inputMinutes, setInputMinutes] = useState<string>("5");

  const presetTimes = [1, 5, 10, 15, 25, 30];

  const handleSetCustomTime = () => {
    const minutes = parseInt(inputMinutes);
    if (minutes > 0 && minutes <= 99) {
      onSetTime(minutes);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Установить время
        </h3>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {presetTimes.map((minutes) => (
            <Button
              key={minutes}
              variant="outline"
              onClick={() => onSetTime(minutes)}
              disabled={disabled}
              className="h-12 transition-all duration-200 hover:scale-105"
            >
              {minutes}м
            </Button>
          ))}
        </div>

        <div className="flex space-x-2">
          <input
            type="number"
            min="1"
            max="99"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(e.target.value)}
            disabled={disabled}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Минуты"
          />
          <Button
            onClick={handleSetCustomTime}
            disabled={disabled || !inputMinutes}
            className="px-6"
          >
            ОК
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimerInput;
