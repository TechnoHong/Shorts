import React, { Component } from 'react';
import Menubar from "./layout/Menubar"
import Home from './Home'
import Footer from "./layout/Footer"

class App extends Component {
  render() {
    return (
        <div>
            <Menubar/>

            <Home/>

            <Footer/>
        </div>
    );
  }
}

export default App;