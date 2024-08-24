import { useEffect } from 'react';
import TimerChallenge from './TimerChallenge.jsx';

export default function RandomTimerChallenge({ title, targetTime, animal, onChallengeEnd }) {

  useEffect(() => {
    // Optional: Add any side effects if needed when animal changes
  }, [animal]);

  return (
    <TimerChallenge 
      title={animal ?? 'Loading...'}  // Pass only the animal name
      targetTime={targetTime} 
      onChallengeEnd={onChallengeEnd}
    />
  );
}