import React from 'react';
import './ProductList.scss';
import Product from '../Product/Product.js';

class ProductList extends React.Component{
  render(){
    return (
      <div className="resultsWrapper">
        {this.props.products.map( product =>
          <Product key={product.ProductId} product={product} />
        )}
      </ div>
    )
  }
}


export default ProductList;
