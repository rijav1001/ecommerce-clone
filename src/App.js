import React, { useEffect } from 'react';
import './App.css';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import { auth } from './firebase';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51KOz7MSAqsavqiN8olvriRpUdMXaSPQquCNIGeJyhCzPqvobUrSCP6vTW4QwYgctejlczh40P6asnWMhTUGl2GLu005T63a5qH');

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when App component loads, when [] is empty
    auth.onAuthStateChanged(authUser => {
      console.log('User is >>> ', authUser);
      if (authUser) {
        // means that user just logged in / was already logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        //  means the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/checkout' element={<Checkout/>}>
          </Route>
          <Route path='/payment' element={<Elements stripe={promise}><Payment/></Elements>}></Route>
          <Route path='/' element={<Home/>}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
