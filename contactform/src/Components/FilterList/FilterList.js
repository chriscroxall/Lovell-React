import React from 'react';
import './FilterList.css';
import Filter from '../Filter/Filter.js';

class FilterList extends React.Component{
  constructor(props){
    super(props);

    this.getActiveKey = this.getActiveKey.bind(this);
  }

  getActiveKey(filter){
    return this.props.activeFilters[filter.filterName];
  }


  render(){
    return (
      <div>
      {this.props.filters.map( filterOption =>
        <Filter key={filterOption.filterName} filter={filterOption} onSelect={this.props.onSelect} activeKey={this.getActiveKey(filterOption)} activeFilters={this.props.activeFilters}/>
      )}
      </ div>
    )
  }
}


export default FilterList;
