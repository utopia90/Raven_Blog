import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from './views/HomePage/HomePage';
import PostDetail from './views/PostDetail/PostDetail';


function App() {



  return (
    <Router>
      <Routes>
      <Route path="/posts/:id" element={<PostDetail/>}>
        </Route>
        <Route path="/" element={<HomePage/>}>
        </Route>
      </Routes>
     </Router>
  );
}

export default App;
