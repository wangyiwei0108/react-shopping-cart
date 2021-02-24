import React, { Component } from 'react'
import Cart from '../components/Cart'
import Filter from '../components/Filter'
import Products from '../components/Products'
import Scroll from '../components/Scroll'

export default class HomeScreen extends Component {
    render() {
        return (
            <div>
                <div className="content">
                <div className="main">
                  <Filter 
                  // count={this.state.products.length}
                  // size={this.state.size}
                  // sort={this.state.sort}
                  // filterProducts={this.filterProducts}
                  // sortProducts={this.sortProducts}
                  />
                  <Scroll>
                  <Products 
                  // products={this.state.products}
                  // addToCart={this.addToCart}
                  />
                  </Scroll>
                </div>
                <div className="sidebar">
                  <Cart 
                  // cartItems={this.state.cartItems}
                  // removeFromCart={this.removeFromCart}
                  // createOrder={this.createOrder}
                  />
                </div>
                
              </div>
            </div>
        )
    }
}
