import React, { useState, useEffect } from 'react';
import Fish from './Fish';

interface FishContainerProps {
    createNewFish: boolean,
    setCreateNewFish: Function
}


const FishContainer: React.FC<FishContainerProps> = ({createNewFish, setCreateNewFish}) => {
    const [fishes, setFishes] = useState<any>([])

    useEffect(() => {
        if (createNewFish) {
            createFish();
            setCreateNewFish(false);
            console.log('this should trigger every minute')
        }
    }, [createNewFish])

    const createFish = () => {
        // Add a new fish with random positions
        const newFish = {
            id: Date.now(), // Unique ID for the key prop
            top: Math.random() * 100, // Random top position
            left: Math.random() * 100, // Random left position
        };
        setFishes((prevFishes: any) => [...prevFishes, newFish]);
    }

    const catchFish = (id: number) => {
        setFishes((prevFishes: any) => prevFishes.filter((fish: any) => fish.id !== id))
    }

    return (
        <div className='fishContainer'>
            <span>Number of fish: {fishes.length}</span>

            {fishes.map((fish: any) => (
                <Fish key={fish.id} top={fish.top} left={fish.left} />
            ))}

        </div>

    )
}

export default FishContainer