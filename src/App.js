import React from 'react';
import {Route} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';

import {Home} from './pages'
import {Header} from './components'

function App() {
  return (
    <Router>
      <Header/>
      <div style={{marginTop: '11.733vw'}}>
        <Route path={'/'} component={Home}/>
      </div>
    </Router>
  );
}

export default App;
