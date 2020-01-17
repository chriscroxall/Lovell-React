import React from 'react';
import './Filter.css';
import FilterOption from '../FilterOption/FilterOption.js';

class Filter extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      showFilterOptions:false,
    }

    this.toggleShowFilter = this.toggleShowFilter.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }

  toggleShowFilter(){
    this.setState({showFilterOptions: (this.state.showFilterOptions ? false : true)});
  }

  setSelected(activeKey){
    this.setState({activeKey:activeKey});
  }

  render(){
    return (
      <div className="filter-item">
        <div className="filter-header">
          <div onClick={this.toggleShowFilter}>{this.props.filter.filterName}</div>
        </div>
        <div className="filter-options">
          {
            this.state.showFilterOptions?
              this.props.filter.filterKeys.map( filterOption =>
                <FilterOption key={this.props.filter.filterName+filterOption.keyValue} filterCategory={this.props.filter.filterName} filterOption={filterOption} onSelect={this.props.onSelect} setSelected={this.setSelected} selected={this.props.activeKey===filterOption.keyValue?true:false}/>
              ):""
          }
        </div >
      </div>
    )
  }
}


export default Filter;
