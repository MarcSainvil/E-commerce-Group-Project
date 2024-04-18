import { useState, useEffect } from 'react';
import Navbar from "./Navbar";

function App() {
  const [bacon, setBacon] = useState(null);

  useEffect(() => {
    fetch('/bacon')
      .then(res => res.json())
      .then(data => setBacon(data));
  }, []);

  return <div>
  {bacon ? bacon : `...where's my stuff?...`}
  <Navbar/>
  </div>;
}

export default App;
