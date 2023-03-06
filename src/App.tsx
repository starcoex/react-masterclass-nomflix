import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './Components/Header';
import Home from './Components/Home';
import Movies from './Components/Movies';
import Search from './Components/Search';
import Series from './Components/Series';




function App() {
  return (
    <Router>
      <HelmetProvider>
        <Helmet>
          <title>React Nomfilx</title>
          <link href='https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap' rel='stylesheet'></link>
        </Helmet>
      </HelmetProvider>
      <Header />
      <Routes>
        <Route path="/series" element={<Series />}>
        </Route>
        <Route path="/movies" element={<Movies />}>
        </Route>
        <Route path="/search" element={<Search />}>
        </Route>
        <Route path="/" element={<Home />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
