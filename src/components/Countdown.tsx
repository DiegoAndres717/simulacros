import { useState, useEffect } from 'react';

interface CountDownProps {
  formattedTimeRemaining: string
  timeRemaining: number
  isTimeUnlimited: boolean;
}

export default function Countdown({ timeRemaining, formattedTimeRemaining, isTimeUnlimited }: CountDownProps) {
  const [timeLeft, setTimeLeft] = useState(timeRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const progress = (timeLeft / timeRemaining) ;
  const isWarning = timeLeft <= 5 * 60; 

  return (
    <div className="relative w-20 h-20 rounded-full border-4 border-gray-200">
      <div
        className={`absolute top-0 left-0 w-full h-full rounded-full ${
          isWarning ? 'bg-orange-400' : 'bg-blue-300'
        }`}
        style={{ clipPath: `inset(${progress}% 0 0 0)` }}
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        <p className='font-bold text-sm'>Tiempo</p>
        {isTimeUnlimited ? (
        <p className='text-xs font-semibold'>Ilimitado</p>
      ) : (
        <p>{formattedTimeRemaining}</p>
      )}
      </div>
    </div>
  );
}
