import { useSpring, animated } from 'react-spring';
import { useEffect, useState } from 'react';
import useWindowSize from './WindowSize';

interface FishProps {
    top: number;
    left: number;
}

const Fish: React.FC<FishProps> = ({ top, left }) => {
    const [target, setTarget] = useState({ x: 0, y: 0});

    const getRandomPosition = (width: number, height: number) => {
        useWindowSize();
        console.log("window size" + width + "width" + height)
        return {
            x: Math.random() * (width - 100),
            y: Math.random() * (height - 100),
        };
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            //let size = useWindowSize();
            setTarget(getRandomPosition(2, 2));
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    const props = useSpring({
        to: {
            transform: `translate(${target.x}px, ${target.y}px)`,
         },
        from: { top: `${top}%`, left: `${left}%` },
        config: { mass: 1, tension: 5, friction: 14 },
    })

    return (
      <animated.div 
        className = 'fish' style={{
          ...props
        }}
      >🐟</animated.div>
    );
  };

export default Fish;