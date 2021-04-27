import React, { Component } from 'react';
import formatCurrency from './Util';
import Fade from "react-reveal/Fade"; 
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';
import { Link } from "react-router-dom"; 

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

        const itemToCart = Object.assign(info, this.state.product);
        this.props.addToCart(itemToCart);
    }

    render() {

        return (
            <div>
                <Fade bottom cascade>
                    {
                        !this.props.allProducts ? 
                        (<div className="loading"><p>Loading...</p></div>)

                        :<ul className="product">
                            {this.props.allProducts.map((product) => { return (
                                <li className="product__item" key={product._id}>

                                <Link className="product__image" to={`#${product._id}`} onClick={ () => this.openModal(product)}> <img src={product.image_a} alt={product.title}/></Link>
                                <Link className="product__title" to={`#${product._id}`} onClick={ () => this.openModal(product)}> {product.title}</Link>

                                    <div className="product__price">
                                        <p>{formatCurrency(product.price)}</p>
                                    </div>

                                </li>
                            )})}
                        </ul>
                    }
                </Fade>

                {
                    this.state.product && (
                        <Modal className="product-modal__width-height" isOpen={true} onRequestClose={this.closeModal} ariaHideApp={false}>
                            <Zoom>
                                <div className="product-modal__container">
                                    <button className="close-btn" onClick={this.closeModal}>
                                        <svg className="close-svg">
                                            <use xlinkHref="images/sprite.svg#icon-circle-with-cross"></use>
                                        </svg> 
                                    </button>

                                    <div className="product-modal__info">
                                        <div className="product-modal__images">
                                            <img className="product-modal__image" 
                                            src={this.state.product.image_b} 
                                            alt={this.state.product.title}/>
                                            <img className="product-modal__image" 
                                            src={this.state.product.image_c} 
                                            alt={this.state.product.title}/>
                                            <img className="product-modal__image" 
                                            src={this.state.product.image_d} 
                                            alt={this.state.product.title}/>
                                            <img className="product-modal__image"
                                            src={this.state.product.image_a} 
                                            alt={this.state.product.title}/>
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
                                                    <h4>Size</h4>

                                                    {this.state.product.availableSizes.map((size) => 
                                                    <div key={size} className="product-modal__size-option">
                                                        <input 
                                                        onClick={this.sizeInput} 
                                                        type="radio" name="selectedSize" 
                                                        id={size} value={size} 
                                                        required></input>
                                                        <label> {size} </label>
                                                    </div> )}
                                                </div>

                                                <div className="product-modal__quantity">
                                                    <h4>Quantity</h4>

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

const stateMaptoProps = (state) => {
    return {
        allProducts: state.products.filteredItems
    }
}

export default connect((stateMaptoProps), {fetchProducts, addToCart})(Products)