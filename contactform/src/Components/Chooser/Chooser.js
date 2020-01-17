import React from 'react';
import './Chooser.scss';
import ProductList from '../ProductList/ProductList.js';
import FilterList from '../FilterList/FilterList.js';
import LovellAPI from '../../util/LovellAPI.js';


class Chooser extends React.Component {
  constructor(props){
    super(props);


    // this.state = {
    //   filters: [],
    //   products: [],
    //   activeFilters: {},
    // }

    this.state = {
      activeFilters: {},
      defaultFilters:this.props.defaultFilters,
      filters:[{
        filterName: "Gender",
        filterKeys: [
          {
            keyName:"kids'",
            keyValue:"kids"
          },
          {
            keyName:"men's",
            keyValue:"mens"
          },
        ]
      },
      {
      filterName: "Colour",
      filterKeys: [
        {
          keyName:"Black",
          keyValue:"black"
        },
        {
          keyName:"White",
          keyValue:"white"
        },
        {
          keyName:"Blue",
          keyValue:"blue"
        },
      ]
      },
      {
        filterName: "Adult Sizes",
        filterKeys: [
          {
            keyName:"6'",
            keyValue:"6"
          },
          {
            keyName:"6.5",
            keyValue:"6H"
          },
          {
            keyName:"7",
            keyValue:"7"
          },
          {
            keyName:"7.5",
            keyValue:"7H"
          },
          {
            keyName:"8",
            keyValue:"8"
          },
          {
            keyName:"8.5",
            keyValue:"8H"
          },
        ]
      },
      {
        filterName: "Kids' Sizes",
        filterKeys: [
          {
            keyName:"10K'",
            keyValue:"10K"
          },
          {
            keyName:"11K",
            keyValue:"11K"
          },
          {
            keyName:"12K",
            keyValue:"12K"
          },
          {
            keyName:"13K",
            keyValue:"13K"
          },
          {
            keyName:"13.5K",
            keyValue:"13HK"
          },
          {
            keyName:"1",
            keyValue:"1"
          },
          {
            keyName:"2",
            keyValue:"2"
          },
        ]
      },
    ],
    products:[{
      productId:1747,
      name: "Copa Mundial FG Football Boots",
      brand: "adidas",
      price: "£100",
      demographic: "mens",
      colours:["black", "blue"],
      imgSrc: "https://localhost/lovellrugby/products/1747.jpg",
      discount:"£20 off",
      link:"",

    },
    {
      productId:1746,
      name: "World Cup SG Football Boots",
      brand: "adidas",
      price: "£90",
      demographic: "mens",
      colours:["black", "white"],
      imgSrc: "https://localhost/lovellrugby/products/1746.jpg",
      discount:"£38 off",
      link:"",
    },
    {
      productId:24640,
      name: "F10 TRX FG Kids Football Boots Core White/Rich Blue/Solar Green",
      brand: "adidas",
      price: "£35.99",
      demographic: "kids",
      colours:["white", "blue"],
      imgSrc: "https://localhost/lovellrugby/products/24640.jpg",
      discount:"£15 off",
      link:"",
    }
  ]
    }

    // this.setState({products: });
    //
    // this.setState({validFilters: });

    this.resetFilter = this.resetFilter.bind(this);
    this.setActiveFilters = this.setActiveFilters.bind(this);
    this.updateChooser = this.updateChooser.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.updateChooser();
  }

  updateChooser(){
    console.log("updateChooser");
    //const chooserFilters =  
    LovellAPI.chooser({...this.state.activeFilters, ...this.state.defaultFilters}).then( chooserInfo => {

      this.setState({products: chooserInfo.products});
      this.setState({filters: chooserInfo.filters});

      //removes invalid filters and filter types using the api returned invalid filters.
      let newActiveFilters = this.state.activeFilters;
      chooserInfo.invalidFilters.forEach( (invalidFilter) => {

        delete newActiveFilters[invalidFilter];
        let newFilters = this.state.filters.filter( (filter) =>{
          if(filter.filterName===invalidFilter){
            return false;
          } else {
            return true;
          }
        }
        )
        this.setState({filters: newFilters})
      });

      this.setState({activeFilters: newActiveFilters});
    });
  }

  componentDidUpdate(prevProps, prevState){


    if(prevState.activeFilters !== this.state.activeFilters){
      this.updateChooser();
    }

  }



  setActiveFilters(filterName, filterKeyValue){
    console.log(this.state);
    let filter = this.state.activeFilters;
    filter[filterName] = filterKeyValue;

    this.setState(filter)

    //
    this.updateChooser();
    return this.state.activeFilters[filterName];
  }

  resetFilter(){
    this.setState({activeFilters:{}});
  }

  render(){
    if(this.state.products){
      return (
        <div className="chooser">

        <div onClick={this.resetFilter}>Reset filters</div>

        <FilterList filters={this.state.filters} onSelect={this.setActiveFilters} activeFilters={this.state.activeFilters}/>

        <ProductList products={this.state.products}/>

        </div>
      )
    } else{
      return (
        <div>
           no products.
        </div>
      )
    }
  }
}

export default Chooser;
