import React from 'react';
import './Product.css';
import './Product.scss';


class Product extends React.Component{
  render(){
    return (
      <a href={this.props.product.link} className="Product">
        <div className="media">
          <div className="media-left">
            <div className="item-image" >
              <img src={this.props.product.imgSrc} alt="adidas adidas World Cup SG Football Boots" width="223" height="133" border="0" className="thumb" />
              <div className="chooser-discount-flash discounted">{this.props.product.discount}</div>
                 <div className="item-flashes">
                    <div className="chooser-discount-flash discounted">{this.props.product.discount}</div>
                 </div>
             </div>
           </div>
           <div className="media-body">
              <div className="item-content" >
                <h4>{this.props.product.brand} {this.props.product.name}</h4>
                <p className="item-colour"></p>

                <p className="thumbContentPrice">
                 <strong className="rrp"><span>RRP:&nbsp;</span>{this.props.product.OriginalPrice}</strong><br/><strong className="thumboffer price"><span>Now: </span>{this.props.product.UnitPrice}</strong>
               </p >
          </div>
        </div>
       </div>
     </a>
    )
  }
}

export default Product;
