import React from 'react';
import Product from './components/product.jsx';
import IMG from './punisher.jpg';


function App() {
  return (
    <div>
      <Product
      media= {IMG}
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
