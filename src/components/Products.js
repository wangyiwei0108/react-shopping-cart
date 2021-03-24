import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from "react-reveal/Fade"; 
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import Magnifier from "react-magnifier";
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
 
class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: null,
            selectedSize: "",
            selectedQuantity: "",
        }
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    // a2. 從 a1. 那邊傳進來的參數作為更新 state 的值，預設的 product: null 變成 product: product
    openModal = (product) => {
        this.setState({ product });
    }

    closeModal = () => {
        this.setState({ product: null });
    }

    sizeInput = (e) => {
        this.setState({selectedSize: e.target.value});
    }

    quantityInput = (e) => {
        this.setState({selectedQuantity: e.target.value});
    }

    createCartItem = (e) => {
        e.preventDefault();

        const info = {
            size: this.state.selectedSize,
            quantity: this.state.selectedQuantity
        }

        const cartItems = Object.assign(info, this.state.product)

        this.props.addToCart(cartItems);
    }

    render() {
        return (
            <div>
                <Fade bottom cascade>
                    {
                        !this.props.pProducts
                        ? 
                        (   <div className="loading">
                                <p>Loading...</p>
                            </div>
                        )
                        :
                        <ul className="products">
                            {this.props.pProducts.map((product) => { return (
                                <li className="product" key={product._id}>
                                         {/* a1. 設定當按下照片、產品名時，啟用 openModal 並將 product 傳入作為參數*/}
                                        <a className="product__image" onClick={ () => this.openModal(product)}  href={"#" + product._id}>
                                            <img src={product.image} alt={product.title}></img>
                                        </a>
                                        <a className="product__title" onClick={ () => this.openModal(product)}  href={"#" + product._id}>
                                            <h4>
                                                {product.title}
                                            </h4>
                                        </a>
                                        <div className="product__price">
                                            <div>
                                                {formatCurrency(product.price)}
                                            </div>
                                        </div>
                                </li>
                            )})}
                        </ul>
                    }
                </Fade>

                {   // a3. 若 this.state.product 存在（product 的值不是 null，而是 product），才會顯示 <Modal/>
                    this.state.product && (
                        <Modal className="modal__modal-size" isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <div className="modal__container">
                                <button className="close-btn " onClick={this.closeModal}>
                                    <svg className="close-svg">
                                        <use xlinkHref="images/sprite.svg#icon-circle-with-cross"></use>
                                    </svg> 
                                </button>
                                <div className="modal__info">
                                    
                                    <img className="modal__img" src={this.state.product.image} alt={this.state.product.title}></img>

                                    <div className="modal__detail">
                                        <div className="modal__title">
                                            <h2>{this.state.product.title}</h2>
                                        </div>
                                        <div className="modal__description">
                                            {this.state.product.description}
                                        </div>

                                            <form onSubmit={this.createCartItem}>
                                                <div className="modal__sq-form">
                                                    <div className="modal__sq-size">
                                                        <h4>Size{" "}</h4>
                                                            {this.state.product.availableSizes.map((size) => 
                                                            <div className="modal__radio">
                                                                <input required onClick={this.sizeInput} type="radio" name="selectedSize" id={size} value={size}></input>
                                                                <label> {size} </label>
                                                            </div> )}
                                                    </div>
                                                    <div className="modal__sq-quantity">
                                                        <h4>Quantity{" "}</h4>
                                                            <select required onChange={this.quantityInput}>
                                                                <option value="">0</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                            </select>
                                                    </div>
                                                    <button className="modal__sq-btn btn-1" type="submit">Add to cart</button>
                                                </div>
                                            </form>

                                    </div>
                                </div>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
            </div>
        )
    }
}

// 傳進 state 以及 action。state 為 pProducts(可任意取名）值是 filteredItems，
// 而不是 items，因為要給 filter、sort 這兩個動作所帶來的整體的 state 的連動更新
export default connect(
                        (state) => ({pProducts: state.products.filteredItems}), 
                        {fetchProducts, addToCart}
                        )
                        (Products)

// 此處，使用 connect 將 ProductReducers.js 裡的 state 與 productActions 裡的 action 匯入
// state 的部分：以 pProducts 命名「state.products.filteredItems」，「state.products.filteredItems」
// 中的「state.products」來自於 store.js。「.filteredItems」來自於 ProductReducers.js。


// 關於 addToCart
// addToCart 有兩個，一個是在頁面的 add，一個是在點擊商品後出現的 popup 裡面的 add。
// 