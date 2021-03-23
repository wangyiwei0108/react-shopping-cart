import React, { Component } from 'react';
import * as storesData from "../data-stores.json";
import { Link } from "react-router-dom";

export default class Store extends Component {
    render() {
        return (
            <ul className="store__container">
                {storesData.stores.map((store) => (
                    <li className="store__information">
                        <h4 className="store__name">{store.name}</h4>
                        <svg className="store__address--svg"><use xlinkHref="images/sprite.svg#icon-location"></use></svg>
                        <p className="store__address">{store.address}</p>
                        <svg className="store__tel--svg"><use xlinkHref="images/sprite.svg#icon-old-phone"></use></svg>
                        <p className="store__tel">{store.tel}</p>
                    </li>
                ))}
                <li>
                    <Link to="/products"><button className="store__online-btn btn-1"><p className="store__name">Online Store</p></button></Link>
                </li>
            </ul>
        )
    }
}

