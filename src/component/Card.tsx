import React, { useState, useEffect } from 'react';

interface BreadcrumbProps {
  image: string;
}

const Card: React.FC<BreadcrumbProps> = ({ image }) => {
  const [isHover, setIsHover] = useState(false);
  const [height, setHeight] = useState('40vh');

  const handleHoverEnter = () => {
    setIsHover(true);
  };

  const handleHoverLeave = () => {
    setIsHover(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 768;
      setHeight(isDesktop ? '40vh' : '20vh');
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <img
      src={image}
      alt='gif'
      style={{
        width: '100%',
        height: height, 
        borderRadius: '8px',
        filter: isHover ? 'brightness(40%)' : 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverLeave}
    />
  );
};

export default Card;
