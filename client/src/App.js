import React from 'react';
import Product from './components/product.jsx';
import IMG from './punisher.jpg';
import IMG2 from './punisher2.jpg'
import IMG3 from './punisher3.jpg'


function App() {
  return (
    <div>
      <Product
      media= {[IMG, IMG2, IMG3]}
      name= { 'PUNISHER III'}
      price= { 200 }
      description = {'Hermoso Producto, no puede estar mas bueno para viciar toda la noche'}
      stock= {7 + 'unidades'}
      developer= {'Huguito el mas grande'}
      publisher= {'Nintendo'}
      publishDate= {'17 de Octubre de 2004'}
      />
    </div>
  );
}

export default App;
