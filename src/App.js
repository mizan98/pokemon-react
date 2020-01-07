import React, { Component } from 'react';
import NavBar from './Components/Layouts/NavBar';
import Dashboard from './Components/Layouts/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import BackgroundImage from './pattern.png';
import './App.css';


class App extends Component{

  

  render(){
    return (
      <div className="App" style={{background: `url(${BackgroundImage})`}}>
        <NavBar/>
        <div className='container'>
          <Dashboard/>
        </div>
      </div>
    )
  }
}
export default App;
