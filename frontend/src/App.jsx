import React from 'react';
import Event from './components/Event';
import Footer from './components/Footer';
import LuckGrab from './components/LuckGrab';
import PrizeList from './components/PrizeList';
import Visual from './components/Visual';


function App() {
  return (
    <div id="App">
      <Visual />
      <LuckGrab />
      <PrizeList />
      <Event />
      <Footer />
    </div>
  );
}

export default App;
