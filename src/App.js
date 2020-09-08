import React from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
// import { useState } from 'react';

function App() {
  
  return (
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout>
      <Checkout />
    </div>
  );
}

export default App;
