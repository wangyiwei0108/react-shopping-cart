import React, { Component } from 'react';
import Cart from '../components/Cart';
import Filter from '../components/Filter';
import Products from '../components/Products';
 
export default class HomeScreen extends Component {
    render() {
        return (
              <div className="products-screen__content">
                <div className="products-screen__filter"><Filter 
                // count={this.state.products.length}
                // size={this.state.size}
                // sort={this.state.sort}
                // filterProducts={this.filterProducts}
                // sortProducts={this.sortProducts}
                />
                </div>
                <div className="products-screen__list">
                  <Products 
                  // products={this.state.products}
                  // addToCart={this.addToCart}
                  />
                </div>
                <div className="products-screen__sidebar">
                  <Cart 
                  // cartItems={this.state.cartItems}
                  // removeFromCart={this.removeFromCart}
                  // createOrder={this.createOrder}
                  />
                </div>
              </div>
        )
    }
}