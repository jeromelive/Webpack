import React, {Component} from 'react';
import { BrowserRouter  as Router, Route, Link, Switch } from 'react-router-dom';

import Test from './pages/test';
import Context from './pages/context';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Router>
        <Switch>
          <Route exact path="/test" component={Test}></Route>
          <Route path="/context" component={Context}></Route>
        </Switch>
      </Router>
    )
  }
}

export default App;