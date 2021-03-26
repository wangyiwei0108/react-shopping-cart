import React, { Component } from 'react';
import formatCurrency from './Util';
import Fade from "react-reveal/Fade"; 
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
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
                        <ul className="product">
                            {this.props.pProducts.map((product) => { return (
                                <li className="product__item" key={product._id}>
                                        {/* a1. 設定當按下照片、產品名時，啟用 openModal 並將 product 傳入作為參數*/}

                                    <a className="product__image" onClick={ () => this.openModal(product)} href={"#" + product._id}>
                                        <img src={product.image_a} alt={product.title}/>
                                    </a>

                                    <a className="product__title" onClick={ () => this.openModal(product)} href={"#" + product._id}>
                                        <h4>
                                            {product.title}
                                        </h4>
                                    </a>

                                    <div className="product__price">
                                        <p>{formatCurrency(product.price)}</p>
                                    </div>

                                </li>
                            )})}
                        </ul>
                    }
                </Fade>

                {   // a3. 若 this.state.product 存在（product 的值不是 null，而是 product），才會顯示 <Modal/>
                    this.state.product && (
                        <Modal className="product-modal__width-height" isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <div className="product-modal__container">
                                    <button className="close-btn" onClick={this.closeModal}>
                                        <svg className="close-svg">
                                            <use xlinkHref="images/sprite.svg#icon-circle-with-cross"></use>
                                        </svg> 
                                    </button>

                                    <div className="product-modal__info">
                                        <div className="product-modal__images">
                                            <img className="product-modal__image" src={this.state.product.image_b} alt={this.state.product.title}></img>
                                            <img className="product-modal__image" src={this.state.product.image_c} alt={this.state.product.title}></img>
                                            <img className="product-modal__image" src={this.state.product.image_d} alt={this.state.product.title}></img>
                                            <img className="product-modal__image" src={this.state.product.image_a} alt={this.state.product.title}></img>
                                        </div>

                                        <div className="product-modal__details">
                                            <div className="product-modal__title">
                                                <h2>{this.state.product.title}</h2>
                                            </div>

                                            <div className="product-modal__description">
                                                <p>{this.state.product.description}</p>
                                            </div>

                                                <form className="product-modal__form" onSubmit={this.createCartItem}>
                                                    <div className="product-modal__size">
                                                        <h4>Size{" "}</h4>

                                                        {this.state.product.availableSizes.map((size) => 
                                                        <div className="product-modal__size-option">
                                                            <input onClick={this.sizeInput} type="radio" name="selectedSize" id={size} value={size} required></input>
                                                            <label> {size} </label>
                                                        </div> )}
                                                    </div>

                                                    <div className="product-modal__quantity">
                                                        <h4>Quantity{" "}</h4>

                                                        <select required onChange={this.quantityInput}>
                                                            <option value="">0</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>
                                                    </div>

                                                    <button className="btn-1" type="submit">Add to cart</button>
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