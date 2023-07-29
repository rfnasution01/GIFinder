import React, { Dispatch, SetStateAction } from 'react';
import IsBreadcrumb from '../component/Breadcrumb';

interface RouteProps {
  setRoute: Dispatch<SetStateAction<number>>;
}

interface RouteProps {
    setRoute: Dispatch<SetStateAction<number>>;
    route: number;
    title: string;
    children: React.ReactNode;
  }

const Layout: React.FC<RouteProps> = ({ setRoute, route, title, children }) => {
    return (
        <div 
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2vh',
            }}
        >
            {/* --- Breadcrumbs --- */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    width: '100%',
                    marginRight: '10vw',
                }}
            >
                <IsBreadcrumb route={route} setRoute={setRoute} />
            </div>
            
            {/* --- Title --- */}
            <h1
                style={{
                    fontFamily: 'serif',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '28px',
                    lineHeight: '130%',
                    color: '#333',
                    margin: '5vh 0 5vh 0',
                    textTransform: 'uppercase',
                    
                }}
            >{title}</h1>
            
            {/* --- Main Content --- */}
            {children}
        </div>
    );
};

export default Layout