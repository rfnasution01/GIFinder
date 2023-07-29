import React, { useState } from 'react';

interface PaginationProps {
  page: number;
  onPageClick: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, onPageClick }) => {
    const [isHover, setIsHover] = useState(false);
    const [hoverId, setHoverId] = useState(0);

    const hoverEnter = (id: number) => {
        setIsHover(true)
        setHoverId(id)
    }

    const hoverLeave = (id: number) => {
        setIsHover(false)
        setHoverId(id)
    }

    const elements = [];
    for (let i = 0; i < 6; i++) {
        elements.push(
        <div
            key={i}
            onMouseEnter={()=>hoverEnter(i)}
            onMouseLeave={()=>hoverLeave(i)}
            onClick={() => onPageClick(i * 9)}
            style={{
                backgroundColor:
                    i*9 === page ? 
                        'dodgerblue':
                    isHover && hoverId === i ? 
                        'dodgerblue' : 
                        '#f5f5f5',
                color: 
                    i*9 === page ?
                        '#f5f5f5' :
                    isHover && hoverId === i ? 
                        '#f5f5f5' : 
                        '#333',
                borderRadius: '4px',
                padding: '2px',
                marginLeft: '8px',
                cursor: 'pointer',
            }}
        >
            <h4
            style={{
                margin: '4px 10px',
                fontFamily: 'serif',
                fontStyle: 'normal',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '130%',
            }}
            >
            {i+1}
            </h4>
        </div>
        );
    }

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            width: '100%',
            margin: '20px 10vw 0 0',
        }}
        >
        {elements}
        </div>
    );
};

export default Pagination;
