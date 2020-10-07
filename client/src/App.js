import React from 'react';
import ProdCard from './components/product_card.jsx';
import './App.css';
import SearchBar from './components/search_bar.jsx';
import FormAdmin from './components/form_admin.jsx';
import IMG from './punisher.jpg';

function App() {
  return (
    <div>
      <SearchBar/>
      <ProdCard
      media= {IMG}
      name= { 'PUNISHER III'}
      price= { 200 }
      developer= {'Huguito el mas grande'}
      />
      <FormAdmin/>
    </div>
  );
}

export default App;
