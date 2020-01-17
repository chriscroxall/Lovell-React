import React from 'react';
import './FilterOption.scss';



class FilterOption extends React.Component{
  constructor(props){
    super(props);
    this.state = {};

    this.toggleFilter = this.toggleFilter.bind(this);
  }

  toggleFilter(){
    this.props.onSelect(this.props.filterCategory, this.props.filterOption.keyValue);

  }

  render(){
    return (
      <div className={this.props.selected ? "filter-option__selected" : "filter-option"} onClick={this.toggleFilter}>
        {this.props.filterOption.keyName}
      </div>
    )
  }
}


export default FilterOption;
