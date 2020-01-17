import React from 'react';
import './App.css';
// import ProductList from '../ProductList/ProductList.js';
// import FilterList from '../FilterList/FilterList.js';
//import LovellAPI from '../../util/LovellAPI.js';
import Chooser from '../Chooser/Chooser.js';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      chooserInitialState: {test:"test"}
    }
  }

  render(){
    return (
      <div className="App">

      <Chooser defaultFilters={{"Item Type":"boots", "siteCode":"LR"}}/>

      </div>
    )
  }
}

export default App;
