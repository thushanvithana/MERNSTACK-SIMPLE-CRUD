import React from 'react';
import ItemList from './ItemList';
import NavBar from './components/navBar';
import SliderMenu from './components/slider';

function App() {
  return (
    <div>
       <NavBar/>
       <SliderMenu/>
    <ItemList/>
   
  </div>
  );
}

export default App;
