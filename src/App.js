import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';

import {Home, Foreign} from './pages'
import {Header} from './components'

function App() {
  return (
    <Router>
      <Header/>
      <div style={{marginTop: '11.733vw'}}>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path={'/foreign'} component={Foreign}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
