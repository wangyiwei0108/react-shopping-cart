import React from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json';

class App extends React.Component {
  
  constructor () {
    super ();
    this.state = {
      products: data.products,
      cartItems: [],
      size: "",
      sort: ""
    }
  }

removeFromCart = (item) => {
  const cartItems = this.state.cartItems.slice();
  cartItems.filter(x => x._id !== item._id);
  // 讓購物車內的 id 不要有我選擇的 id，並篩選出來（移除）
  this.setState({cartItems: cartItems.filter(x => x._id !== item._id)})
}

addToCart = (product) => {
  // 用 slice() 複製，因為沒有要改變原來的值
  const cartItems = this.state.cartItems.slice();
  let alreadyInCart = false;
  cartItems.forEach((item) => {
  // item._id 是原本的，product._id 是後來按 button 新增的
    if (item._id === product._id) {
      item.count ++;
      alreadyInCart = true;
    }
  })
  // 「沒有 alreadtInCart」是 true 的話，要新增產品到 cart 上)
  if (!alreadyInCart){
  //  cartItems是一個array，推進一個 product Object 進去，然後在這個 Object 的最後另新增一個 property: count
    cartItems.push({...product, count: 1});
  } 
  this.setState({cartItems: cartItems});
}

sortProducts = (event) => {
  const sort = event.target.value;
  this.setState((state) => ({
  // 基於原來的 state 生成一個新的 state （下面將以 slice () shadow copy ）
    sort: sort,
    products: this.state.products.slice().sort((a, b) => (
      sort === "lowest"?
      ((a.price > b.price)? 1:-1):
      sort === "highest"?
      ((a.price < b.price)? 1:-1):
      ((a._id > b._id)? 1:-1)
    ))
  }))
}

filterProducts = (event) => {
  if (event.target.value === "") {
    this.setState({
      size: event.target.value, 
      products: data.products});
  } else {
    this.setState({
      size: event.target.value, 
      products: data.products.filter((product)=> product.availableSizes.indexOf(event.target.value) >= 0
      )
    });
  }
};

  render () {
    return (
      <div className="grid-container">    
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter 
              count={this.state.products.length}
              size={this.state.size}
              sort={this.state.sort}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts}
              />
              <Products 
              productsss={this.state.products}
              addToCart={this.addToCart}
              />
            </div>
            <div className="sidebar">
              <Cart 
              cartItems={this.state.cartItems}
              removeFromCart={this.removeFromCart}
              />
            </div>
          </div>
        </main>
        <footer>
          All Right is Reserved.
        </footer>
      </div>
    )
  }
}

export default App;
