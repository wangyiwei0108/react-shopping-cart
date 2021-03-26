import React from 'react';
import { Provider } from 'react-redux';
// import data from './data.json';
import store from './redux/store';
import { BrowserRouter, Route, Link } from "react-router-dom";
import ProductsScreen from './screens/ProductsScreen';
import AdminScreen from './screens/AdminScreen';
import HomeScreen from './screens/HomeScreen';

class App extends React.Component {
  
  // constructor () {
  //   super ();
  //   this.state = {
  //     // products: data.products,
  //     cartItems: JSON.parse(localStorage.getItem("cartItems"))
  //     // size: "",
  //     // sort: ""
  //   }
  // }

// createOrder = (order) => {
//   alert(`Need to save order for ${order.name}`)
// }

// removeFromCart = (item) => {
//   const cartItems = this.state.cartItems.slice();
//   cartItems.filter(x => x._id !== item._id);
//   // 讓購物車內的 id 不要有我選擇的 id，並篩選出來（移除）
//   this.setState({cartItems: cartItems.filter(x => x._id !== item._id)});
//   localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x => x._id !== item._id)));
// }

// addToCart = (product) => {
//   // 用 slice() 複製，因為沒有要改變原來的值
//   const cartItems = this.state.cartItems.slice();
//   let alreadyInCart = false;
//   cartItems.forEach((item) => {
//   // item._id 是原本的，product._id 是後來按 button 新增的
//     if (item._id === product._id) {
//       item.count ++;
//       alreadyInCart = true;
//     }
//   })
//   // 「沒有 alreadtInCart」是 true 的話，要新增產品到 cart 上)
//   if (!alreadyInCart){
//   //  cartItems是一個array，推進一個 product Object 進去，然後在這個 Object 的最後另新增一個 property: count
//     cartItems.push({...product, count: 1});
//   } 
//   this.setState({cartItems: cartItems});
//   localStorage.setItem("cartItems", JSON.stringify(cartItems));
// }

// sortProducts = (event) => {
//   const sort = event.target.value;
//   this.setState((state) => ({
//   // 基於原來的 state 生成一個新的 state （下面將以 slice () shadow copy ）
//     sort: sort,
//     products: this.state.products.slice().sort((a, b) => (
//       sort === "lowest"?
//       ((a.price > b.price)? 1:-1):
//       sort === "highest"?
//       ((a.price < b.price)? 1:-1):
//       ((a._id > b._id)? 1:-1)
//     ))
//   }))
// }

// filterProducts = (event) => {
//   if (event.target.value === "") {
//     this.setState({
//       size: event.target.value, 
//       products: data.products});
//   } else {
//     this.setState({
//       size: event.target.value, 
//       products: data.products.filter((product)=> product.availableSizes.indexOf(event.target.value) >= 0
//       )
//     });
//   }
// };

    render () {
        return (  
            <Provider store={store}>
                <BrowserRouter>
                    <div className="container">
                        <header className="container__header">
                            <Link to="/">Store</Link>
                            <Link to="/products">Product</Link>
                            <Link to="/admin">Admin</Link>
                        </header>
                        <body>
                            <main className="container__main">
                                <Route path="/" component={HomeScreen} exact/>
                                <Route path="/admin" component={AdminScreen} />
                                <Route path="/products" component={ProductsScreen} />
                            </main>
                        </body>
                        <footer className="container__footer">
                            Sources of text and images are from <a href="https://www.isseymiyake.com/" target="_blank" rel="noreferrer">ISSEY MIYAKE</a>
                        </footer>
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App;
