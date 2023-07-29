import { useState } from 'react';
import Homepage from './pages/Homepage';
import IronmanPage from './pages/Ironman';
import SearchPage from './pages/Search';

function App() {
  const [route, setRoute] = useState(0);

  return (
    <div>
      {
        route === 0 ?
          <Homepage setRoute={setRoute} route={route} />
        : route === 1 ?
          <IronmanPage setRoute={setRoute} route={route} />
        : route === 2 ?
          <SearchPage setRoute={setRoute} route={route} />
        : <Homepage setRoute={setRoute} route={route} />
      }
    </div>
  );
}

export default App;
