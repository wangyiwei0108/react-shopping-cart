import React, { Component } from 'react'; 
import formatCurrency from './Util';
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';
import { createOrder, clearOrder } from "../actions/orderActions";

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
        // name 指的是 <input> 裡的 name 分別有 name、email、address
        this.setState({[e.target.name]: e.target.value});
    }

    createOrder = (e) => {
        e.preventDefault();
        const oorder = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            // cartItems 從 reducer 叫進來的
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0)
        };

        this.props.createOrder(oorder);

        // 這個 createOrder 跟上面的 createOrder = (e) => ... 是不一樣的哦！
        // 這個 createOrder 是從 action 叫進來的
    }

    closeModal = () => {this.props.clearOrder()}

    render() {
        const {cartItems, order} = this.props;
        // 這裡的 order 是 createOrder 動作完成後，更新之後的 order 狀態
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
                            <li className="cart__item" key={item._size}>
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
                                
                                <button className="cart__item-remove-btn" onClick={ () => this.props.removeFromCart(item)}>
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
                                onClick={ () => {this.setState({showCheckout: true})}}>
                                    Proceed
                                </button>
                            </div>

                            {this.state.showCheckout && (
                                <Fade clear >
                                        <form onSubmit={this.createOrder}>
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

                    { // order 存在的話才以 popup 顯示訂單內容，關掉的同時啟動 closeModal，再連到 orderActions.js 裡面的 clearOrder，將 order 改為 null，在這同時，popup 消失
                        order && 
                        <Modal isOpen={true} onRequestClose={this.closeModal} className="order-modal">
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
                                        <li key={order._id}>
                                            <div>
                                                <p>Name:</p>
                                            </div>
                                            <div>
                                                <p>{order.name}</p>
                                            </div>
                                        </li>

                                        <li key={order._id}>
                                            <div>
                                                <p>Email:</p>
                                            </div>
                                            <div>
                                                <p>{order.email}</p>
                                            </div>
                                        </li>

                                        <li key={order._id}>
                                            <div>
                                                <p>Address:</p>
                                            </div>
                                            <div>
                                                <p>{order.address}</p>
                                            </div>
                                        </li>

                                        <li key={order._id}>
                                            <div>
                                                <p>Date:</p>
                                            </div>
                                            <div>
                                                <p>{order.createdAt}</p>
                                            </div>
                                        </li>

                                        <li key={order._id}>
                                            <div>
                                                <p>Total:</p>
                                            </div>
                                            <div>
                                                <p>{formatCurrency(order.total)}</p>
                                            </div>
                                        </li>

                                        <li key={order._id}>
                                            <div>
                                                <p>Cart Items:</p>
                                            </div>

                                            <div>
                                                {order.cartItems.map((x) =>(
                                                    <div>
                                                        <p>{x.title} {" x "} {x.size} {" x "} {x.count}</p>
                                                    </div>
                                                ))}
                                            </div>
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

export default connect((state) => ({
    cartItems: state.cart.cartItems,
    order: state.order.order
}),
{removeFromCart, createOrder, clearOrder}
)(Cart)
