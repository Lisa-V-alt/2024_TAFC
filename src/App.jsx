import Player from './components/Player.jsx';
import RandomTimerChallenge from './components/RandomTimerChallenge.jsx';
import { useState, useEffect } from 'react';

const animals = {
  Easy: [
    { name: '🦟 Mosquito', description: 'mosquito to flap its wings 500 times.' },
    { name: '🦅 Peregrine Falcon', description: 'Peregrine Falcon to dive 100 metres.' },
    { name: '🦛 Hippo', description: 'hippo to open its mouth 1.2 metres wide.' },
    { name: '🐅 Tiger', description: 'tiger to swipe its paw at a force of up to 450 kilograms.' },
    { name: '🦌 Pronghorn Antelope', description: 'pronghorn antelope to travel 4.5 metres.' }  
  ],
  Medium: [
    { name: '🦍 Gorilla', description: 'gorilla to move 3 to 5 metres while climbing.' },
    { name: '🐃 Water Buffalo', description: 'Water Buffalo to walk 4 to 5 metres.' },
    { name: '🦎 Gila Monster', description: 'Gila Monster to run 0.2 metres across the floor.' },
    { name: '🐧 Penguin', description: 'penguin to swim 5 to 7 metres underwater.' },
    { name: '🦉 Owl', description: 'Barn Owl to spot and capture small prey.' }
  ],
  Hard: [
    { name: '🐳 Blue Whale', description: 'Blue Whale to produce a call 500 kilometres away.' },
    { name: '🦐 Brine Shrimp', description: 'Brine Shrimp to filter 0.5 millilitres of water through its appendages.' },
    { name: '🐝 Honeybee', description: 'honeybee to collect nectar from 5 to 10 flowers.'},
    { name: '🐜 Bullet Ant', description: 'Bullet Ant to run 1 to 2 metres to its nest.' },
    { name: '🦎 Basilisk Lizard', description: 'Basilisk Lizard to run 3 to 4 metres on water.' }
  ],
  VeryHard: [
    { name: '🦥 Three-Toed Sloth', description: 'sloth to move 2 metres.' },
    { name: '🐡 Pufferfish', description: 'Pufferfish to create an elaborate mating display on the ocean floor.' },
    { name: '🦋 Butterfly', description: 'Butterfly to flap its wings 150 to 200 times.' },
    { name: '🐘 Elephant', description: 'Elephant to use its trunk to pick up and move 10 kilograms of food.' },
    { name: '🥒 Sea Cucumber', description: 'Sea Cucumber to retract its body to a lenth of 1 centimetre.' }
  ]
};

// Function to get a new animal ensuring it's not the same as the previous one
function getNewAnimal(difficulty, previousAnimals) {
  const animalsArray = animals[difficulty];

  // Filter out the animals in previous history
  const availableAnimals = animalsArray.filter(animal => !previousAnimals.includes(animal.name));

  // If all animals have been shown, reset the history list
  if (availableAnimals.length === 0) {
    return animalsArray[Math.floor(Math.random() * animalsArray.length)];
  }

  const randomIndex = Math.floor(Math.random() * availableAnimals.length);
  return availableAnimals[randomIndex];
}

export default function App() {
  const [selectedAnimals, setSelectedAnimals] = useState({
    Easy: getNewAnimal('Easy', []),
    Medium: getNewAnimal('Medium', []),
    Hard: getNewAnimal('Hard', []),
    VeryHard: getNewAnimal('VeryHard', []),
  });

  // Maintain a history of the last 2 animals shown for each difficulty
  const [previousAnimals, setPreviousAnimals] = useState({
    Easy: [],
    Medium: [],
    Hard: [],
    VeryHard: [],
  });

  function refreshAnimal(difficulty) {
    setSelectedAnimals(prevState => {
      const newAnimal = getNewAnimal(difficulty, previousAnimals[difficulty]);

      return {
        ...prevState,
        [difficulty]: newAnimal,
      };
    });

    setPreviousAnimals(prevState => {
      const updatedHistory = [...prevState[difficulty], selectedAnimals[difficulty].name];
      if (updatedHistory.length > 2) updatedHistory.shift(); // Keep only the last 2 animals

      return {
        ...prevState,
        [difficulty]: updatedHistory,
      };
    });
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
