import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './Components/Layouts/NavBar';
import Dashboard from './Components/Layouts/Dashboard';
import BackgroundImage from './pattern.png';
import Pokemon from './Components/Pokemon/Pokemon';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component{

  

  render(){
    return (
      <Router>
        <div className="App" style={{background: `url(${BackgroundImage})`}}>
          <NavBar/>
          <div className='container'>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/Pokemon/:pokemonIndex" component={Pokemon} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}
export default App;
