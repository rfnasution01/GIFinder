import { Dispatch, SetStateAction } from "react";

interface BreadcrumbProps {
    setRoute: Dispatch<SetStateAction<number>>;
    route: number;
}

const IsBreadcrumb: React.FC<BreadcrumbProps> = ({ setRoute, route }) => {
    return (
        <div 
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                gap: '4px'
            }}
        >
            <h4 style={{color: 'dodgerblue', cursor: 'pointer'}} onClick={()=>setRoute(0)}>Homepage</h4>
            <h4 style={{color: 'dodgerblue', cursor: 'pointer'}} onClick={()=>setRoute(0)}>/</h4>
            <h4 style={{color: '#bfbfbf'}} >
                {route === 1 ? 'Ironman' : 'Search'}
            </h4>
        </div>
    )
}

export default IsBreadcrumb;