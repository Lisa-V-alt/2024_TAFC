import Player from './components/Player.jsx';
import RandomTimerChallenge from './components/RandomTimerChallenge.jsx';
import { useState } from 'react';

const animals = {
  Easy: ['Three-Toed Sloth', 'Garden Snail', 'Ponderous Tortoise', 'Brine Shrimp', 'Sea Cucumber'],
  Medium: ['Elephant', 'Manatee', 'Wombat', 'Gila Monster', 'Lynx'],
  Hard: ['Greyhound', 'Spider Monkey', 'Red Fox', 'Penguin', 'Basilisk Lizard'],
  VeryHard: ['Peregrine Falcon', 'Cheetah', 'Sailfish', 'Bullet Ant', 'Pronghorn Antelope']
};

function getRandomAnimal(difficulty, previousAnimals) {
  const animalsArray = animals[difficulty];
  
  // Filter out previously shown animals
  const availableAnimals = animalsArray.filter(animal => !previousAnimals.includes(animal));

  // If all animals have been shown, reset the previous animals list for that difficulty
  if (availableAnimals.length === 0) {
    previousAnimals.length = 0;  // Clear the previous animals list
    return getRandomAnimal(difficulty, previousAnimals);  // Recursively call to start over
  }

  const randomIndex = Math.floor(Math.random() * availableAnimals.length);
  return availableAnimals[randomIndex];
}

export default function App() {
  const [selectedAnimals, setSelectedAnimals] = useState({
    Easy: getRandomAnimal('Easy', []),
    Medium: getRandomAnimal('Medium', []),
    Hard: getRandomAnimal('Hard', []),
    VeryHard: getRandomAnimal('VeryHard', []),
  });

  const [previousAnimals, setPreviousAnimals] = useState({
    Easy: [],
    Medium: [],
    Hard: [],
    VeryHard: [],
  });

  function refreshAnimal(difficulty) {
    const newAnimal = getRandomAnimal(difficulty, previousAnimals[difficulty]);

    setSelectedAnimals(prevState => ({
      ...prevState,
      [difficulty]: newAnimal,
    }));

    setPreviousAnimals(prevState => ({
      ...prevState,
      [difficulty]: [...prevState[difficulty], newAnimal],
    }));
  }

  return (
    <>
      <Player />
      <div id="challenges">
        <RandomTimerChallenge
          title="Easy"
          targetTime={1}
          animal={selectedAnimals.Easy}
          onChallengeEnd={() => refreshAnimal('Easy')}
        />
        <RandomTimerChallenge
          title="Medium"
          targetTime={5}
          animal={selectedAnimals.Medium}
          onChallengeEnd={() => refreshAnimal('Medium')}
        />
        <RandomTimerChallenge
          title="Hard"
          targetTime={10}
          animal={selectedAnimals.Hard}
          onChallengeEnd={() => refreshAnimal('Hard')}
        />
        <RandomTimerChallenge
          title="VeryHard"
          targetTime={15}
          animal={selectedAnimals.VeryHard}
          onChallengeEnd={() => refreshAnimal('VeryHard')}
        />
      </div>
    </>
  );
}
