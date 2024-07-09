import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import ProductList from './components/ProductList/ProductList';
import Basket from './components/Basket/Basket';
import NavBar from './components/NavBar/NavBar';
import './App.module.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route  path="/"  element={<ProductList/>} />
            <Route path="/basket" element={<Basket/>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
