import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/home';
import { View } from './components/view';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/view' component={View} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
