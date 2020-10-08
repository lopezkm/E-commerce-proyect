import React from 'react';
import ProdCard from './components/product_card.jsx';
import Product from './components/product.jsx';
import './App.css';
import NavBar from './components/nav_bar.jsx';
import FormAdmin from './components/form_admin.jsx';
import IMG from './punisher.jpg';
import IMG2 from './punisher2.jpg';
import IMG3 from './punisher3.jpg';
import { Route } from 'react-router-dom';
import Catalogue from './components/catalogue.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  return (
    <div className= 'container-fluid'> {/* El container fluid esta colocando espacios en los lados de la NavBar. Quitarlo si la quieren a pantalla completa. */}
      <NavBar/>
      <Route 
        path="/products" render={() => <Catalogue/>}
      />
      <Route path ='/product/:id' render={() => <Product 
        name = {'Punisher'}
        description = {'Incredible game'}
        price = {250} 
        stock = {15} 
        media = {[IMG, IMG2, IMG3]} 
        developer = {'Frank Bonomo'} 
        publisher = {'NINTENDO'} 
        publishDate = {'March 12 - 2007'}
      />}/>
    </div>
  );
}




export default App;
