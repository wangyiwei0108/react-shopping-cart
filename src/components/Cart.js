import React, { Component } from 'react'; 
import formatCurrency from './Util';
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from 'react-redux';
import { removeFromCart } from '../redux/actions/cartActions';
import { createOrder, clearOrder } from "../redux/actions/orderActions";

class Cart extends Component {
     
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    submitOrder = (e) => {
        e.preventDefault();

        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0)
        };

        this.props.createOrder(order);
    }

    closeModal = () => {this.props.clearOrder()}

    render() {
        const {cartItems, order, removeFromCart} = this.props;

        return ( 
            <div className="cart">
                {cartItems.length === 0
                ?  
                <div className="cart__header"><h3>Cart is empty. Add some!</h3></div>
                :
                <div className="cart__header"><h3>You have {cartItems.length} in the cart.</h3></div>}

                <Fade right cascade>
                    <ul className="cart__items">
                        {cartItems.map(item => (
                            <li className="cart__item" key={item._id + item.size}>
                                <img className="cart__item-image" src={item.image_a} alt={item.title}></img>

                                <div className="cart__item-title">
                                    <p>{item.title}</p>
                                </div>

                                <div className="cart__item-size">
                                    <p>{item.size}</p>
                                </div>

                                <div className="cart__item-amount">
                                    <p>{formatCurrency(item.price)} x {item.count}</p>
                                </div>
                                
                                <button className="cart__item-remove-btn" onClick={ () => removeFromCart(item)}>
                                    <svg className="cart__item-remove-svg">
                                        <use xlinkHref="images/sprite.svg#icon-circle-with-minus"></use>
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                </Fade>

                    {cartItems.length !== 0 && (
                        <div className="cart__total-form-box">
                            <div className="cart__total">
                                <div className="cart__amount">
                                    <h5>Total {" "}</h5>
                                    <h2 className="cart__number">{formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}</h2>
                                </div>
                                
                                <button 
                                className="btn-1"
                                onClick={ () => {this.setState({ showCheckout: true })}}>
                                    Proceed
                                </button>
                            </div>

                            {this.state.showCheckout && (
                                <Fade clear >
                                        <form onSubmit={this.submitOrder}>
                                            <ul className="form">
                                                <li>
                                                    <label ><h5>Email</h5></label>
                                                    <input type="email" name="email" placeholder="email" required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <label ><h5>Name</h5></label>
                                                    <input type="text" name="name" placeholder="name" required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <label ><h5>Address</h5></label>
                                                    <input type="text" name="address" placeholder="address" required onChange={this.handleInput}></input>
                                                </li>

                                                <button className="btn-1" type="submit">Checkout</button>
                                            </ul>
                                        </form>
                                </Fade>
                            )}

                        </div>
                    )}

                    {
                        order && 
                        <Modal isOpen={true} onRequestClose={this.closeModal} className="order-modal" ariaHideApp={false}>
                            <Zoom>
                                <button className="close-btn" onClick={this.closeModal}>
                                    <svg className="close-svg">
                                        <use xlinkHref="images/sprite.svg#icon-circle-with-cross"></use>
                                    </svg>
                                </button>

                                <div className="order-modal__info">
                                    <h3 className="order-modal__message">Your order has been placed.</h3>
                                    <h2>Order - {order._id}</h2>

                                    <ul>
                                        <li>
                                            <p>Name:</p><p>{order.name}</p>
                                        </li>
                                        <li>
                                            <p>Email:</p><p>{order.email}</p>
                                        </li>
                                        <li>
                                            <p>Address:</p><p>{order.address}</p>
                                        </li>
                                        <li>
                                            <p>Date:</p><p>{order.createdAt}</p>
                                        </li>
                                        <li>
                                            <p>Total:</p><p>{formatCurrency(order.total)}</p>
                                        </li>
                                        <li>
                                            <p>Cart Items:</p>
                                            {order.cartItems.map((x) =>(
                                                <div key={x._id}>
                                                    <p>{x.title} {" x "} {x.size} {" x "} {x.count}</p>
                                                </div>
                                            ))}
                                        </li>
                                    </ul>
                                </div>
                            </Zoom>
                        </Modal>
                    }
            </div>
        )
    }
}

const stateMaptoProps = (state) => {
    return {
        cartItems: state.cart.cartItems,
        order: state.order.order
    }
}

export default connect(stateMaptoProps, {removeFromCart, createOrder, clearOrder})(Cart)
