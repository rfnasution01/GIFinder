import React, { Dispatch, SetStateAction, useState } from 'react';
import { logo } from '../assets';

interface RouteProps {
  setRoute: Dispatch<SetStateAction<number>>;
  route: number;
}

const Homepage: React.FC<RouteProps> = ({ setRoute, route }) => {
  const [isHover, setIsHover] = useState<number | null>(null);

  const menu = ['Iron man giphy', 'Search your giphy'];

  const hoverEnter = (id: number) => {
    setIsHover(id);
  };

  const hoverLeave = () => {
    setIsHover(null);
  };

  return (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}
    >
      <h3
        style={{
          fontFamily: 'serif',
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '130%',
          color: '#333',
          margin: 0,
          textTransform: 'uppercase',
          maxWidth: '70vw', 
          textAlign: 'center'
        }}
      >
        Welcome to your giphy
      </h3>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          margin: '5vh 0 10vh 0',
        }}
      >
        <img src={logo} alt="logo" />
        <h1
          style={{
            fontFamily: 'serif',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '36px',
            lineHeight: '130%',
            color: '#000',
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          Giphy
        </h1>
      </div>

      <nav style={{textAlign: 'center'}}>
        {menu?.map((item, idx) => (
          <h5
            key={idx + 1}
            onMouseEnter={() => hoverEnter(idx + 1)}
            onMouseLeave={hoverLeave}
            onClick={() => setRoute(idx + 1)}
            style={{
              margin: '10px 0 0 0',
              cursor: 'pointer',
              textTransform: 'uppercase',
              color: isHover === idx + 1 ? 'dodgerblue' : 'blue',
            }}
          >
            {item}
          </h5>
        ))}
      </nav>
    </div>
  );
};

export default Homepage;
